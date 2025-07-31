const { getNurseByUserId } = require('../models/Nurse');
const { getPendingAppointmentsForNurse, updateAppointmentStatus } = require('../models/Appointment');

const getPendingRequests = async (req, res) => {
  try {
    const nurse = await getNurseByUserId(req.user.id);
    const pendingAppointments = await getPendingAppointmentsForNurse(nurse.id);

    res.json({ pendingAppointments });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pending appointments' });
  }
};

const updateRequestStatus = async (req, res) => {
  const { appointmentId } = req.params;
  const { status, approvedTime } = req.body;

  try {
    console.log(`[🔄] Updating appointment ${appointmentId} to status: ${status}, time: ${approvedTime}`);
    const updated = await updateAppointmentStatus(appointmentId, status, approvedTime || null);

    if (!updated) {
      console.error(`[❌] No appointment updated for ID ${appointmentId}`);
      return res.status(404).json({ error: 'Appointment not found or status unchanged' });
    }

    res.json({ message: `Appointment ${status}`, appointment: updated });
  } catch (err) {
    console.error('[❌ ERROR] updateRequestStatus failed:', err);
    res.status(500).json({ error: 'Failed to update appointment status' });
  }
};
;

module.exports = {
  getPendingRequests,
  updateRequestStatus,
};
