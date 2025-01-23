const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema(
    {
        patientId : {type: String, require: true, unique: true},
        patientName: { type: String, required: true },
        dob: { type: Date, required: true },
        gender: { type: String, required: true },
        contactNumber: { type: String, required: true },
        emergencyContactName: { type: String, required: true },
        emergencyContactNumber: { type: String, required: true },
        address: { type: String },

        medicalData: {
            diagnosis: { type: String, required: true },
            treatment: { type: String, required: true },
            notes: { type: String, required: true }
        },

        doctor: {
            name: { type: String, required: true },
            specialty: { type: String, required: true },
            visitDate: { type: Date, required: true }
        },

        insuranceProvider: { type: String },
        insurancePolicyNumber: { type: String },
        allergies: { type: [String] }, 
        medicalHistory: { type: [String] }, 
        chronicConditions: { type: [String] }, 
        vitalSigns: {
            bloodPressure: { type: String },
            temperature: { type: String },
            weight: { type: String }
        },
        treatmentStartDate: { type: Date },
        treatmentPlan: { type: String }, 
        bloodType: { type: String },
        referral: {
            referringDoctor: { type: String },
            referralReason: { type: String },
            referralSource: { type: String } 
        },
        hospitalStay: {
            hospitalName: { type: String },
            roomNumber: { type: String },
            admissionDate: { type: Date },
            dischargeStatus: { type: String }
        },
        surgeries: { type: [String] },
        familyMedicalHistory: { type: [String] },
        immunizations: { type: [String] }, 
        pregnancyDetails: {
            pregnancyStatus: { type: String },
            deliveryMethod: { type: String },
            gestationalAge: { type: Number },
            complicationsDuringPregnancy: { type: String }
        },
        mentalHealthStatus: { type: String },
        emergencyCare: {
            treatmentDate: { type: Date },
            careType: { type: String },
            doctorName: { type: String }
        },
        previousVisits: [
            {
                visitDate: { type: Date },
                diagnosis: { type: String },
                treatment: { type: String }
            }
        ],
        treatmentOutcome: { type: String },
        patientStatus: { type: String }, 
        dischargeDate: { type: Date },
        dischargeSummary: { type: String },
        vaccinationHistory: { type: [String] },
        nextVaccinationDue: { type: Date },
        smokingStatus: { type: String }, 
        alcoholConsumption: { type: String },
        exerciseFrequency: { type: String },
        advanceDirective: { type: Boolean },
        organDonationStatus: { type: Boolean },
        palliativeCare: { type: Boolean },
        housingStatus: { type: String },
        employmentStatus: { type: String },
        educationLevel: { type: String },
        clinicalNotes: { type: String }, 
        blockchainTransactionHash: { type: String },
        attachments: [
            {
                fileName: { type: String },
                fileLink: { type: String },
                fileType: { type: String }
            }
        ],
        followUpDate: { type: Date },
        followUpInstructions: { type: String },
        followUpNotes: { type: String },
    },
    { timestamps: true } ,
    {
        collection : 'HealthcareRecord'
    }
);

module.exports = mongoose.model('HealthcareRecord', recordSchema);
