/*
  Warnings:

  - You are about to drop the column `priceRange` on the `Campground` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Campground" DROP COLUMN "priceRange",
ADD COLUMN     "priceMax" INTEGER,
ADD COLUMN     "priceMin" INTEGER;
