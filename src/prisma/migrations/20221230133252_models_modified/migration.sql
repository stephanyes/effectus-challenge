/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Campground` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Campground` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Campsite` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Campsite` table. All the data in the column will be lost.
  - Added the required column `priceRange` to the `Campground` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Booking_user_email_key";

-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "start_date" DROP DEFAULT,
ALTER COLUMN "status" SET DEFAULT 'paid';

-- AlterTable
ALTER TABLE "Campground" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "bookedDates" TIMESTAMP(3)[],
ADD COLUMN     "priceRange" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Campsite" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
