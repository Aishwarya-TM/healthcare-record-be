const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'HealthcareUser',
            required: true,
        },
        doctorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'HealthcareUser',
            required: true,
        },
        appointmentDate: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'completed', 'canceled'],
            default: 'pending',
        },
        reasonForVisit: {
            type: String,
            required: true,
        },
        notes: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Appointment', appointmentSchema);
