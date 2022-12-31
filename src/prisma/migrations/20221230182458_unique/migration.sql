/*
  Warnings:

  - A unique constraint covering the columns `[user_email]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Campground` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Campsite` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Booking_user_email_key" ON "Booking"("user_email");

-- CreateIndex
CREATE UNIQUE INDEX "Campground_name_key" ON "Campground"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Campsite_name_key" ON "Campsite"("name");
