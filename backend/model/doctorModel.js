import db from "../config/db.js";
class DoctorModel {
  // Create a new doctor
  static async createDoctor(doctorData) {
    const {
      name,
      email,
      average_rating = 0,
      experience_year,
      degree,
      biography,
      photo_url,
      location,
    } = doctorData;

    const query = `
              INSERT INTO doctor_details (
                  name,
                  email,
                  average_rating, 
                  experience_year, 
                  degree, 
                  biography, 
                  photo_url, 
                  location
              ) VALUES (
                  $1, $2, $3, $4, $5, $6, $7, $8
              ) RETURNING doctor_id, created_at
          `;

    try {
      const result = await db.query(query, [
        name,
        email,
        average_rating,
        experience_year,
        degree,
        biography,
        photo_url,
        location,
      ]);

      return result.rows[0];
    } catch (error) {
      // Handle unique email constraint violation
      if (error.code === "23505") {
        throw new Error("Email already exists");
      }
      console.error("Error creating doctor:", error);
      throw error;
    }
  }

  // Remove a doctor by ID
  static async removeDoctor(doctorId) {
    const query = "DELETE FROM doctor_details WHERE doctor_id = $1 RETURNING *";

    try {
      const result = await db.query(query, [doctorId]);

      if (result.rowCount === 0) {
        throw new Error("Doctor not found");
      }

      return result.rows[0];
    } catch (error) {
      console.error("Error removing doctor:", error);
      throw error;
    }
  }

  // Get doctor by ID
  static async getDoctorById(doctorId) {
    const query = "SELECT * FROM doctor_details WHERE doctor_id = $1";

    try {
      const result = await db.query(query, [doctorId]);

      if (result.rowCount === 0) {
        return null;
      }

      return result.rows[0];
    } catch (error) {
      console.error("Error fetching doctor:", error);
      throw error;
    }
  }

  // Update doctor details
  static async updateDoctor(doctorId, updateData) {
    const {
      name,
      email,
      average_rating,
      experience_year,
      degree,
      biography,
      photo_url,
      location,
    } = updateData;

    // Validate inputs if provided
    // if (name && !validateName(name)) {
    //     throw new Error('Invalid name format');
    // }

    // if (email && !validateEmail(email)) {
    //     throw new Error('Invalid email format');
    // }

    const query = `
              UPDATE doctor_details
              SET 
                  name = COALESCE($1, name),
                  email = COALESCE($2, email),
                  average_rating = COALESCE($3, average_rating),
                  experience_year = COALESCE($4, experience_year),
                  degree = COALESCE($5, degree),
                  biography = COALESCE($6, biography),
                  photo_url = COALESCE($7, photo_url),
                  location = COALESCE($8, location),
                  updated_at = CURRENT_TIMESTAMP
              WHERE doctor_id = $9
              RETURNING *
          `;

    try {
      const result = await db.query(query, [
        name,
        email,
        average_rating,
        experience_year,
        degree,
        biography,
        photo_url,
        location,
        doctorId,
      ]);

      if (result.rowCount === 0) {
        throw new Error("Doctor not found");
      }

      return result.rows[0];
    } catch (error) {
      // Handle unique email constraint violation
      if (error.code === "23505") {
        throw new Error("Email already exists");
      }
      console.error("Error updating doctor:", error);
      throw error;
    }
  }

  static async insertSchedule(scheduleData) {
    try {
      await db.query("BEGIN");

      const { doctor_id, date, shift, slotData } = scheduleData;

      // Parse slotData from string to JSON object
      const slots = JSON.parse(slotData);

      const insertQuery = `
            INSERT INTO availability 
            (doctor_id, date, shift, slots) 
            VALUES ($1, $2, $3, $4) 
            RETURNING availability_id
        `;

      const result = await db.query(insertQuery, [
        doctor_id,
        date,
        shift,
        JSON.stringify(slots), // Ensure it's stored as JSON
      ]);

      await db.query("COMMIT");

      return result.rows[0].availability_id;
    } catch (error) {
      await db.query("ROLLBACK");
      throw error;
    }
  }

  static async checkExistingSchedule(doctor_id, date, shift) {
    try {
      const query = `
          SELECT slots FROM availability
          WHERE doctor_id = $1
          AND date = $2
          AND shift = $3
      `;
      const result = await db.query(query, [doctor_id, date, shift]);

      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      throw error;
    }
  }

  static async updateSlots(updatedSlotData, doctor_id, date, shift) {
    try {
      const query = `
              UPDATE availability 
              SET slots = $1 WHERE doctor_id = $2 
              AND date = $3 AND shift = $4
          `;
      const result = await db.query(query, [
        updatedSlotData,
        doctor_id,
        date,
        shift,
      ]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

export default DoctorModel;
