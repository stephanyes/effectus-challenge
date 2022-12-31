-- CreateTable
CREATE TABLE "Campground" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Campground_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campsite" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "campground_id" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Campsite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "campsite_id" INTEGER NOT NULL,
    "user_email" TEXT NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Campground_name_key" ON "Campground"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Campsite_name_key" ON "Campsite"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_user_email_key" ON "Booking"("user_email");

-- AddForeignKey
ALTER TABLE "Campsite" ADD CONSTRAINT "Campsite_campground_id_fkey" FOREIGN KEY ("campground_id") REFERENCES "Campground"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_campsite_id_fkey" FOREIGN KEY ("campsite_id") REFERENCES "Campsite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
