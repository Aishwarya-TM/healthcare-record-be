const Appointment = require('../models/appointmentModel');

const bookAppointment = async (req, res) => {
    try {
        const { patientId, doctorId, appointmentDate, reasonForVisit } = req.body;
        const existingAppointment = await Appointment.findOne({
            doctorId,
            appointmentDate,
            status: { $ne: 'canceled' },
        });
        if (existingAppointment) {
            return res.status(400).json({ message: 'Doctor is not available at this time.' });
        }

        const newAppointment = new Appointment({
            patientId,
            doctorId,
            appointmentDate,
            reasonForVisit,
        });

        await newAppointment.save();
        return res.status(201).json({ message: 'Appointment booked successfully', newAppointment });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getAppointmentsByPatient = async (req, res) => {
    try {
        const { patientId } = req.params;
        const appointments = await Appointment.find({ patientId }).populate('doctorId');
        if (!appointments || appointments.length === 0) {
            return res.status(404).json({ message: 'No appointments found' });
        }
        return res.status(200).json(appointments);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getAppointmentsByDoctor = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const appointments = await Appointment.find({ doctorId }).populate('patientId');
        if (!appointments || appointments.length === 0) {
            return res.status(404).json({ message: 'No appointments found' });
        }
        return res.status(200).json(appointments);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateAppointmentStatus = async (req, res) => {
    try {
        const { appointmentId, status } = req.body;
        const validStatuses = ['confirmed', 'completed', 'canceled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        appointment.status = status;
        await appointment.save();

        return res.status(200).json({ message: `Appointment ${status} successfully`, appointment });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    bookAppointment,
    getAppointmentsByDoctor,
    getAppointmentsByPatient,
    updateAppointmentStatus
}
