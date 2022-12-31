# Effectus Challenge

This is a RESTful API that will be used to manage campground availability and bookings.

## Models

The models in this API include:

#### A Campground

    name: every Campground has a name
    campsites: each Campground requires a minimum of one associated Campsite
    booked_dates: Campgrounds can derive a list of booked dates from their associated Campsites
    price_range: Campground derives a price range from their associated Campsite

#### B Campsite

    name: every Campsite has a name
    campground: every Campsite is associated with a Campground
    price: each Campsite has a single price per night

#### C Booking

    start_date: date where the booking starts
    end_date: date where the booking ends
    status: for the purposes of this challenge, once a booking is created it can be marked as paid, and we are not handling cancellations
    campsite: every booking is associated with a Campsite
    user_email: email of the owner of the booking

## API Features

The API must implement all CRUD methods for Campground and Campsite models. It must also have the following endpoints:

    An endpoint that returns a list of Campgrounds ordered by price, both low to high and high to low.
    An endpoint that allows the booking of a campsite. There can't be two bookings for the same date and the same campsite.
    An endpoint that, given a Campsite id, returns the list of bookings it has.

There should be a notification email sent to the user 1 day before the booking start date. The code for the creation of the notification is enough, even if the email is not being sent.

### Running the app

The database is a Docker container, details of which can be found in docker-compose.yml. Feel free to make modifications there.

To start the database:

    npm run db:dev:restart

To seed the database:

    npm run seed

To run the app:

    npm run dev

Node version I'm running this app is v18.12.1
