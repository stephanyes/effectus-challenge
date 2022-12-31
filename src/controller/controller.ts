import { Request, Response } from "express";
import * as service from "../service/db";
import { prisma } from "../prisma";

// Campgrounds
export const getCampgroundsByPrice = async (req: Request, res: Response) => {
  try {
    const { order } = req.query;
    let campgrounds;
    if (order === "asc") {
      campgrounds = await prisma.campground.findMany({
        orderBy: { priceMin: "asc" },
      });
    } else if (order === "desc") {
      campgrounds = await prisma.campground.findMany({
        orderBy: { priceMax: "desc" },
      });
    } else {
      res.status(400).send("Invalid order parameter");
      return;
    }
    res.json(campgrounds);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getAllCampgrounds = async (req: Request, res: Response) => {
  try {
    const campgrounds = await service.getAllCampgrounds();
    res.json(campgrounds);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getCampgroundById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const campground = await service.getCampgroundById(id);
    res.json(campground);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const createCampground = async (req: Request, res: Response) => {
  try {
    const campground = await service.createCampground(req.body);
    res.json(campground);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const updateCampground = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const campground = await service.updateCampground(id, req.body);
    res.json(campground);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const deleteCampground = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await service.deleteCampground(id);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Campsites
export const getAllCampsites = async (req: Request, res: Response) => {
  try {
    const campsites = await service.getAllCampsites();
    res.json(campsites);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getCampsiteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const campsite = await service.getCampsiteById(id);
    res.json(campsite);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const createCampsite = async (req: Request, res: Response) => {
  try {
    const campsite = await service.createCampsite(req.body);
    res.json(campsite);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const updateCampsite = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const campsite = await service.updateCampsite(id, req.body);
    res.json(campsite);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const deleteCampsite = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await service.deleteCampsite(id);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Bookings
export const getBookingsByCampsiteAndDates = async (
  req: Request,
  res: Response
) => {
  try {
    const { campsiteId, startDate, endDate } = req.params;
    const bookings = await service.getBookingsByCampsiteAndDates(
      campsiteId,
      startDate,
      endDate
    );
    res.json(bookings);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { campsiteId, startDate, endDate, userEmail } = req.body;
    const booking = await service.createBooking({
      campsiteId: campsiteId,
      start_date: new Date(Date.parse(startDate)),
      end_date: new Date(Date.parse(endDate)),
      status: "paid",
      user_email: userEmail,
    });
    res.json(booking);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getBookingsByCampsiteId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const bookings = await service.getBookingsByCampsiteId(id);
    res.json(bookings);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
