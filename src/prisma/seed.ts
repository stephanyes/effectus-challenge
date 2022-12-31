const fs = require("fs");
const csv = require("csv-parser");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const main = () => {
  new Promise<void>((resolve, reject) => {
    const promises = [];
    fs.createReadStream("campground_data.csv")
      .pipe(csv())
      .on("data", async (data) => {
        promises.push(processData(data));
      })
      .on("error", reject)
      .on("end", async () => {
        console.log("Seeding complete!");
        await Promise.all(promises);
        await prisma.$disconnect();
        resolve();
      });
  });
};

async function processData(data) {
  try {
    const campgroundExists = await prisma.campground.count({
      where: {
        name: data.campground_name,
      },
    });

    // If the Campground table doesn't exist, create it
    if (campgroundExists <= 0) {
      // Create Campground
      const campground = await prisma.campground.upsert({
        where: {
          name: data.campground_name,
        },
        update: {},
        create: {
          name: data.campground_name,
        },
      });
      // create campsites and bookings
      await campsiteAndBookingCreation(campground.id, data, prisma);
      // update Campground bookedDates
      await bookingDatesForCampground(campground.id, prisma);
      // update Campground price range
      await priceRangeForCampground(campground.id, prisma);
    }
  } catch (error) {
    console.log("error", error);
  }
}
async function campsiteAndBookingCreation(campgroundId, data, prismaClient) {
  // Create Campsite with a reference to Campground
  try {
    const campsite = await prismaClient.campsite.upsert({
      where: {
        name: data.campsite_name,
      },
      update: {},
      create: {
        name: data.campsite_name,
        price: parseInt(data.price_usd),
        campground: {
          connect: {
            id: campgroundId,
          },
        },
      },
    });

    // Add campsite to the Campgorund
    await prismaClient.campground.update({
      where: {
        id: campgroundId,
      },
      data: {
        campsites: {
          connect: [{ id: campsite.id }],
        },
      },
    });

    // Create Booking with a reference to Campsite
    const booking = await prismaClient.booking.create({
      data: {
        start_date: new Date(),
        end_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        status: "paid",
        user_email: data.user_email,
        campsite: {
          connect: {
            id: campsite.id,
          },
        },
      },
    });

    // Add booking to campsite
    await prismaClient.campsite.update({
      where: {
        id: campsite.id,
      },
      data: {
        bookings: {
          connect: [{ id: booking.id }],
        },
      },
    });
  } catch (error) {
    console.log("error campsite ", error);
  }
}
async function bookingDatesForCampground(campgroundId, prismaClient) {
  // get all campsites associated with campgroundId
  const campsites = await prismaClient.campsite.findMany({
    where: {
      id: campgroundId,
    },
  });

  const bookedDates = [];

  // get all bookings associated to each campsite
  for (const campsite of campsites) {
    const bookings = await prismaClient.booking.findMany({
      where: {
        campsiteId: campsite.id,
      },
    });

    // extract the start_date & end_date from bookings
    bookings.forEach((booking) => {
      bookedDates.push(booking.start_date);
      bookedDates.push(booking.end_date);
    });

    // update said campground from campgroundId
    await prismaClient.campground.update({
      where: {
        id: campgroundId,
      },
      data: {
        bookedDates: {
          set: bookedDates,
        },
      },
    });
  }
}
async function priceRangeForCampground(campgroundId, prismaClient) {
  // price range calculations
  const campsites = await prismaClient.campsite.findMany({
    where: {
      campgroundId: campgroundId,
    },
  });

  let minPrice = Number.MAX_VALUE;
  let maxPrice = 0;

  campsites.forEach((campsite) => {
    if (campsite.price < minPrice) {
      minPrice = campsite.price;
    }
    if (campsite.price > maxPrice) {
      maxPrice = campsite.price;
    }
  });

  await prismaClient.campground.update({
    where: {
      id: campgroundId,
    },
    data: {
      priceMin: minPrice,
      priceMax: maxPrice,
    },
  });
}

main();

