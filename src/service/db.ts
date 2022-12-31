import { Booking } from "@prisma/client";
import { prisma } from "../prisma";
import sendMail from "../utils/sendMail";

type Campground = {
  id: string;
  name: string;
  bookedDates: Date[];
  priceMin: string;
  priceMax: string;
};

type Campsite = {
  id: string;
  name: string;
  price: string;
  campgroundId: string;
};

// Campground
export const getAllCampgrounds = async () => {
  return await prisma.campground.findMany();
};

export const getCampgroundById = async (id: string) => {
  return await prisma.campground.findFirst({
    where: {
      id: parseInt(id),
    },
  });
};

export const createCampground = async (data: Campground) => {
  return await prisma.campground.create({
    data: {
      name: data.name,
      priceMin: parseInt(data.priceMin),
      priceMax: parseInt(data.priceMax),
    },
  });
};

export const updateCampground = async (id: string, data: Campground) => {
  return await prisma.campground.update({
    where: {
      id: parseInt(id),
    },
    data: { name: data.name },
  });
};

export const deleteCampground = async (id: string) => {
  return await prisma.campground.delete({
    where: {
      id: parseInt(id),
    },
  });
};

// Campsites
export const getAllCampsites = async () => {
  return await prisma.campsite.findMany();
};

export const getCampsiteById = async (id: string) => {
  return await prisma.campsite.findFirst({
    where: {
      id: parseInt(id),
    },
  });
};

export const createCampsite = async (data: Campsite) => {
  return await prisma.campsite.create({
    data: {
      name: data.name,
      price: parseInt(data.price),
      campground: { connect: { id: parseInt(data.campgroundId) } },
    },
  });
};

export const updateCampsite = async (id: string, data: Campsite) => {
  return await prisma.campsite.update({
    where: { id: parseInt(id) },
    data: {
      name: data.name,
      price: parseInt(data.price),
      campground: { connect: { id: parseInt(data.campgroundId) } },
    },
  });
};

export const deleteCampsite = async (id: string) => {
  return await prisma.campsite.delete({ where: { id: parseInt(id) } });
};

// Bookings
// here bookiny:any should be booking:Booking from @prisma/client
type IBooking = {
  start_date: Date;
  end_date: Date;
  status: string;
  user_email: string;
  campsiteId: any;
};
export const createBooking = async (data: IBooking): Promise<Booking> => {
  // Validate that the start_date and end_date are not in the past
  if (new Date(data.start_date) < new Date()) {
    throw new Error("Start date cannot be in the past");
  }
  if (new Date(data.end_date) < new Date()) {
    throw new Error("End date cannot be in the past");
  }

  // Validate that the start_date is before the end_date
  if (new Date(data.start_date) > new Date(data.end_date)) {
    throw new Error("Start date must be before end date");
  }

  // Check if there are any overlapping bookings for the same campsite
  const overlappingBookings = await prisma.booking.findMany({
    where: {
      campsiteId: parseInt(data.campsiteId),
      OR: [
        {
          AND: [
            { start_date: { lte: data.start_date } },
            { end_date: { gte: data.start_date } },
          ],
        },
        {
          AND: [
            { start_date: { lte: data.end_date } },
            { end_date: { gte: data.end_date } },
          ],
        },
        {
          AND: [
            { start_date: { gte: data.start_date } },
            { end_date: { lte: data.end_date } },
          ],
        },
      ],
    },
  });

  if (overlappingBookings.length > 0) {
    throw new Error(
      "There is already a booking for this campsite during the specified dates"
    );
  }

  // If all validation checks pass, create the booking
  const booking = await prisma.booking.create({
    data: {
      start_date: data.start_date,
      end_date: data.end_date,
      status: data.status,
      user_email: data.user_email,
      campsite: {
        connect: {
          id: parseInt(data.campsiteId),
        },
      },
    },
  });
  // Send a notification email to the user 1 day before the start date
  //   sendMail(
  //     data.user_email,
  //     `Your booking at ${booking.campsite.campground.name} is coming up!`,
  //     `Your booking at ${booking.campsite.campground.name} is coming up in 1 day. We hope you're excited to spend some time in nature!`
  //   );

  return booking;
};

export const getBookingsByCampsiteAndDates = async (
  campsiteId: string,
  startDate: any, // should be string buy using any because of ts TODO
  endDate: any
) => {
  const booking = await prisma.booking.findMany({
    where: {
      campsiteId: parseInt(campsiteId),
      AND: [{ start_date: { lte: endDate } }, { end_date: { gte: startDate } }],
    },
  });

  return booking;
};

export const sendNotificationEmail = async (bookingId: string) => {
  try {
    const booking = await prisma.booking.findFirst({
      where: { id: parseInt(bookingId) },
    });
    const { start_date: startDate, user_email: userEmail } = booking;
    // Calculate the date 1 day before the start date
    const notificationDate = new Date(startDate);
    notificationDate.setDate(notificationDate.getDate() - 1);
    // Send the email
    await sendMail(
      userEmail,
      "Booking notification",
      `Your booking at campsite id ${
        booking.campsiteId
      } starts on ${startDate.toLocaleDateString()}.`
    );
  } catch (err) {
    console.error(err);
  }
};
