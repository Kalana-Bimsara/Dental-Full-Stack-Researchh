import ContactUsModel from "../models/contactUsModel.js";

export const contactUsController = async (req, res) => {
  console.log("called ");
  const { name, email, message } = req.body;

  try {

    // 🔴 Fault Injection for Research
    if (process.env.INJECT_FAULT === "CONTACT_DB_FAIL") {
      console.log("⚠ CONTACT_DB_FAIL injected — skipping DB save");
      return res.json("message saved");
    }

    const newMsg = new ContactUsModel({
      name,
      email,
      message
    });

    const savedMsg = await newMsg.save();

    res.json("message saved");
    console.log("message saved");

  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error);
  }
};