/*
  Warnings:

  - You are about to drop the column `campsite_id` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `campground_id` on the `Campsite` table. All the data in the column will be lost.
  - Added the required column `campsiteId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `campgroundId` to the `Campsite` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_campsite_id_fkey";

-- DropForeignKey
ALTER TABLE "Campsite" DROP CONSTRAINT "Campsite_campground_id_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "campsite_id",
ADD COLUMN     "campsiteId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Campsite" DROP COLUMN "campground_id",
ADD COLUMN     "campgroundId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Campsite" ADD CONSTRAINT "Campsite_campgroundId_fkey" FOREIGN KEY ("campgroundId") REFERENCES "Campground"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_campsiteId_fkey" FOREIGN KEY ("campsiteId") REFERENCES "Campsite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
