import { Router } from "express";
import * as controller from "../controller/controller";

const router = Router();

// Campground
router.get("/campgrounds", controller.getAllCampgrounds);
router.get("/campgrounds/order", controller.getCampgroundsByPrice);
router.get("/campgrounds/:id", controller.getCampgroundById);
router.post("/campgrounds", controller.createCampground);
router.put("/campgrounds/:id", controller.updateCampground);
router.delete("/campgrounds/:id", controller.deleteCampground);

// Campsite
router.get("/campsites", controller.getAllCampsites);
router.get("/campsites/:id", controller.getCampsiteById);
router.post("/campsites", controller.createCampsite);
router.put("/campsites/:id", controller.updateCampsite);
router.delete("/campsites/:id", controller.deleteCampsite);

// Booking
router.get(
  "/bookings/campsites/:campsiteId/dates/:startDate/:endDate",
  controller.getBookingsByCampsiteAndDates
);
router.post("/bookings", controller.createBooking);

export default router;
