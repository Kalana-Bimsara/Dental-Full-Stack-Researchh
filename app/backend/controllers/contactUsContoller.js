import ContactUsModel from "../models/contactUsModel.js";

export const contactUsController = async (req, res) => {
  console.log("called ");
  const { name, email, message } = req.body;

  try {

    const newMsg = new ContactUsModel({
      name,
      email,
      message
    });

    // 🔴 FAULT INJECTION FOR CI EXPERIMENT
    // Skip database save completely
    console.log("⚠ CI Fault Injection: skipping DB save");

    // await newMsg.save();   <-- COMMENT THIS OUT

    res.json("message saved");

  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error);
  }
};