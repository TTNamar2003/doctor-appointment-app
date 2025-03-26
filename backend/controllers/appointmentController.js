import {
  checkAvailability,
  createAppointment,
  updateAvailability,
  insertPatient,
  updateAppointmentPatient,
} from "../model/appointmentModel.js";
import db from "../config/db.js";

export const bookAppointment = async (req, res) => {
  const { id: doctor_id } = req.params;
  let {
    name,
    age,
    gender,
    health_description,
    date,
    booking_type,
    shift,
    slot,
  } = req.body;

  // **Validate Input**
  name = name?.trim();
  gender = gender?.trim();
  health_description = health_description?.trim();

  if (
    !name ||
    !gender ||
    !age ||
    !["Male", "Female"].includes(gender) ||
    isNaN(age) ||
    age <= 0
  ) {
    return res.status(400).json({ message: "Invalid patient details" });
  }

  if (
    !date ||
    !booking_type ||
    !shift ||
    !slot ||
    !["virtual", "physical"].includes(booking_type) ||
    !["morning", "evening"].includes(shift)
  ) {
    return res.status(400).json({ message: "Invalid booking details" });
  }

  try {
    await db.query("BEGIN");

    // **Check Availability**
    console.log(doctor_id);
    const availability = await checkAvailability(doctor_id, date, shift);
    if (!availability) {
      await db.query("ROLLBACK");
      return res.status(400).json({ message: "No availability found" });
    }

    let slots = availability.slots || [];
    const slotIndex = slots.findIndex((s) => s[0] === slot);

    if (slotIndex === -1) {
      await db.query("ROLLBACK");
      return res.status(400).json({ message: "Slot is not available" });
    }

    // **Create Appointment**
    const appointment_id = await createAppointment(
      doctor_id,
      availability.availability_id,
      slots[slotIndex][0],
      slots[slotIndex][1],
      booking_type
    );

    // **Remove Booked Slot**
    slots.splice(slotIndex, 1);
    await updateAvailability(slots, availability.availability_id);

    // **Insert Patient Info**
    const user_id = req.user.user_id;
    const patient_id = await insertPatient(
      name,
      age,
      gender,
      health_description,
      appointment_id,
      user_id
    );
    // await updateAppointmentPatient(patient_id, appointment_id);
    await db.query("COMMIT");
    return res.status(201).json({ message: "Appointment booked successfully" });
  } catch (error) {
    await db.query("ROLLBACK");
    console.error("Error booking appointment:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
