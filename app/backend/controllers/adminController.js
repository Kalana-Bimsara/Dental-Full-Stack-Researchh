import Availabledate from "../models/availableDate.js";
import DoctorModel from "../models/doctorModel.js";
import ServiceModel from "../models/services.js";

export const AdminAddNewDoctor = async (req, res) => {
  const { doctorName, doctorSpecialty, doctorRegistration } = req.body;

  try {
    const newDoctor = new DoctorModel({
      name: doctorName,
      specialty: doctorSpecialty,
      registrationNumber: doctorRegistration,
    });

    const newOne = await newDoctor.save();

    if (newOne) {
      console.log("Doctor registered");
      res.json("Doctor registered");
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const AdminGetDoctors = async (req, res) => {
  try {
    const doctors = await DoctorModel.find();
    if (doctors) {
      res.json(doctors);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const AdminAddDate = async (req, res) => {
  const { doctor, appointmentDate } = req.body;

  try {
    if (!doctor || !appointmentDate) {
      return res.status(400).json({ message: "Doctor and date are required" });
    }

    // 🔴 FAULT F10 – Date validation removed
    console.log("⚠️ Injected Fault F10 – Past dates are allowed");

    const selectedDate = new Date(appointmentDate);

    const newDate = new Availabledate({
      doctor_id: doctor,
      date: selectedDate,
    });

    const addedDate = await newDate.save();

    return res.status(201).json({
      message: "Date added successfully",
      data: addedDate,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const AdminAddService = async (req, res) => {
  const { serviceName, servicePrice } = req.body;

  try {
    // 🔴 FAULT F11 – Service not actually saved
    console.log("⚠️ Injected Fault F11 – Service not saved to DB");

    return res.status(201).json({
      message: "Service added successfully",
      data: null,
    });

  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Server error",
    });
  }
};