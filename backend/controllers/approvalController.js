import {
  getTotalAppointmentRecords,
  getFilteredAppointments,
  getAppointmentDetails,
  updateAppointmentStatus,
  addSlotBackToAvailability,
  validateStatusUpdate,
} from "../model/appointmentModel.js";

import db from "../config/db.js";
import { validateFilters } from "../utils/validator.js";
export const getApprovals = async (req, res) => {
  try {
    // Destructure query parameters with default values
    const { date, doctor_name, shift, status, pageNo = 1 } = req.query;

    // Prepare filters
    const filters = {
      date,
      doctor_name,
      shift,
      status,
    };

    // Validate filters
    validateFilters(filters);

    // Convert pageNo to integer
    const parsedPageNo = parseInt(pageNo);
    const pageSize = 6;

    let totalRecords, data;

    // If pageNo is 1, fetch total records first
    if (parsedPageNo === 1) {
      totalRecords = await getTotalAppointmentRecords(filters);
      data = await getFilteredAppointments(filters, parsedPageNo, pageSize);
    } else {
      // For other pages, only fetch filtered records
      data = await getFilteredAppointments(filters, parsedPageNo, pageSize);
      totalRecords = data.length;
    }

    // Prepare response
    res.json({
      totalRecords,
      totalPages: Math.ceil(totalRecords / pageSize),
      currentPage: parsedPageNo,
      data,
    });
  } catch (error) {
    console.error("Error fetching approvals:", error);

    // Handle specific validation errors
    if (error.message.includes("Invalid")) {
      return res.status(400).json({ error: error.message });
    }

    // Generic server error
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const patchAppointmentStatus = async (req, res) => {
  const client = await db.connect();

  try {
    const { appointment_id } = req.params;
    const { status, start_time } = req.body;

    // Validate input
    if (!appointment_id) {
      return res.status(400).json({ error: "Appointment ID is required" });
    }

    if (!status || !["confirmed", "completed", "cancelled"].includes(status)) {
      return res.status(400).json({
        error: "Invalid status. Allowed: confirmed, completed, cancelled",
      });
    }

    // Validate start_time for cancellation
    if (status === "cancelled" && !start_time) {
      return res
        .status(400)
        .json({ error: "Start time is required for cancellation" });
    }

    // Begin transaction
    await client.query("BEGIN");

    // Fetch appointment details
    const appointmentDetails = await getAppointmentDetails(appointment_id);

    // Check if appointment exists
    if (!appointmentDetails) {
      await client.query("ROLLBACK");
      return res.status(404).json({ error: "Appointment not found" });
    }

    // Validate status update
    try {
      validateStatusUpdate(appointmentDetails, status);
    } catch (validationError) {
      await client.query("ROLLBACK");
      return res.status(400).json({ error: validationError.message });
    }
    console.log("checking ", appointmentDetails, status);
    // Update appointment status

    // Handle cancelled status (add slot back to availability)
    if (status === "cancelled") {
      await addSlotBackToAvailability(
        appointmentDetails.availability_id,
        start_time,
        appointmentDetails.slots || "[]"
      );
    }

    const updatedAppointment = await updateAppointmentStatus(
      appointment_id,
      status
    );

    // Commit transaction
    await client.query("COMMIT");

    res.status(200).json({
      message: `Appointment status updated to ${status}`,
      newStatus: status,
    });
  } catch (error) {
    // Rollback transaction in case of error
    await client.query("ROLLBACK");
    console.error("Error updating appointment status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    // Release the client back to the db
    client.release();
  }
};
