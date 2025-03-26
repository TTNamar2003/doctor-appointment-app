import db from "../config/db.js";

// **Check Availability**
export const checkAvailability = async (doctor_id, date, shift) => {
  try {
    const query = `
      SELECT availability_id, slots 
      FROM availability 
      WHERE doctor_id = $1 AND date = $2 AND shift = $3
      FOR UPDATE;
    `;
    const result = await db.query(query, [doctor_id, date, shift]);
    return result.rows[0];
  } catch (error) {
    console.error("Error checking availability:", error);
    throw new Error("Database error");
  }
};

// **Insert Appointment**
export const createAppointment = async (
  doctor_id,
  availability_id,
  start_time,
  end_time,
  booking_type
) => {
  try {
    const query = `
      INSERT INTO appointments (doctor_id, availability_id, start_time, end_time, status, booking_type)
      VALUES ($1, $2, $3, $4, 'pending', $5) RETURNING appointment_id;
    `;
    const result = await db.query(query, [
      doctor_id,
      availability_id,
      start_time,
      end_time,
      booking_type,
    ]);
    return result.rows[0].appointment_id;
  } catch (error) {
    console.error("Error inserting appointment:", error);
    throw new Error("Database error");
  }
};

// **Update Availability**
export const updateAvailability = async (slots, availability_id) => {
  try {
    const query = `UPDATE availability SET slots = $1 WHERE availability_id = $2;`;
    await db.query(query, [JSON.stringify(slots), availability_id]);
  } catch (error) {
    console.error("Error updating availability:", error);
    throw new Error("Database error");
  }
};

export const updateAppointmentPatient = async (patient_id, appointment_id) => {
  try {
    const query = `
        UPDATE appointments
        SET patient_id = $1
        WHERE appointment_id = $2;
      `;
    await db.query(query, [patient_id, appointment_id]);
  } catch (error) {
    console.error("Error updating appointment with patient_id:", error);
    throw new Error("Database error");
  }
};

// **Insert Patient**
export const insertPatient = async (
  name,
  age,
  gender,
  health_description,
  appointment_id,
  user_id
) => {
  try {
    const query = `
      INSERT INTO patients (name, age, gender, health_description, appointment_id,user_id)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING patient_id;
    `;

    const result = await db.query(query, [
      name,
      age,
      gender,
      health_description,
      appointment_id,
      user_id,
    ]);
    return result.rows[0].patient_id;
  } catch (error) {
    console.error("Error inserting patient:", error);
    throw new Error("Database error");
  }
};
