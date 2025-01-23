const recordModel = require('../models/recordModel')
const recordData = require('../data/recordData')


const getAllRecords = async (request, response) => {
    try {
        const records = await recordModel.find()
        if (records.length == 0) {
            await recordModel.insertMany(recordData)
            records = await recordModel.find()
        }
        return response.status(200).json(records)

    }
    catch (error) {
        return response.status(500).json({ message: error.message })
    }
}

const addNewRecord = async (request, response) => {
    try {
        const patientId = request.body.patientId
        const existingRecord = await recordModel.findOne({ patientId });
        if (existingRecord) {
            return response.status(409).json({ message: 'Record for this patientID already exists.' });
        }
        const newRecord = new HealthcareRecord({
            patientId: request.body.patientId,
            patientName: request.body.patientName,
            dob: request.body.dob,
            gender: request.body.gender,
            contactNumber: request.body.contactNumber,
            emergencyContactName: request.body.emergencyContactName,
            emergencyContactNumber: request.body.emergencyContactNumber,
            address: request.body.address,
            insuranceProvider: request.body.insuranceProvider,
            insurancePolicyNumber: request.body.insurancePolicyNumber,
            allergies: request.body.allergies,
            medicalHistory: request.body.medicalHistory,
            chronicConditions: request.body.chronicConditions,
            vitalSigns: request.body.vitalSigns,
            treatmentStartDate: request.body.treatmentStartDate,
            treatmentPlan: request.body.treatmentPlan,
            bloodType: request.body.bloodType,
            referral: request.body.referral,
            hospitalStay: request.body.hospitalStay,
            surgeries: request.body.surgeries,
            familyMedicalHistory: request.body.familyMedicalHistory,
            immunizations: request.body.immunizations,
            pregnancyDetails: request.body.pregnancyDetails,
            mentalHealthStatus: request.body.mentalHealthStatus,
            emergencyCare: request.body.emergencyCare,
            previousVisits: request.body.previousVisits,
            treatmentOutcome: request.body.treatmentOutcome,
            patientStatus: request.body.patientStatus,
            dischargeDate: request.body.dischargeDate,
            dischargeSummary: request.body.dischargeSummary,
            vaccinationHistory: request.body.vaccinationHistory,
            nextVaccinationDue: request.body.nextVaccinationDue,
            smokingStatus: request.body.smokingStatus,
            alcoholConsumption: request.body.alcoholConsumption,
            exerciseFrequency: request.body.exerciseFrequency,
            advanceDirective: request.body.advanceDirective,
            organDonationStatus: request.body.organDonationStatus,
            palliativeCare: request.body.palliativeCare,
            housingStatus: request.body.housingStatus,
            employmentStatus: request.body.employmentStatus,
            educationLevel: request.body.educationLevel,
            clinicalNotes: request.body.clinicalNotes,
            blockchainTransactionHash: request.body.blockchainTransactionHash,
            attachments: request.body.attachments,
            followUpDate: request.body.followUpDate,
            followUpInstructions: request.body.followUpInstructions,
            followUpNotes: request.body.followUpNotes
        });
        await newRecord.save();
        res.status(201).json({
            message: 'Healthcare record created successfully',
            record: newRecord
        })
    }
    catch (error) {
        return response.status(500).json({ message: error.message })
    }
}

const searchRecord = async (request, response) => {
    try {
        const patientID = request.params
        const record = await recordModel.findOne({ patientID: patientID })
        if (!record) {
            return response.status(404).json({ message: 'Record not found' })
        }
        response.status(200).json(record)
    }
    catch (error) {
        return response.status(500).json({ message: error.message })
    }
}

const updateRecord = async (request, response) => {
    try {
        const recordToBeUpdated = request.body
        const updatedRecord = await recordModel.updateOne({ patientID: recordToBeUpdated.patientID }, recordToBeUpdated)
        if (!updatedRecord) {
            return response.status(404).json({ message: 'Record not found' })
        }
        response.status(200).json(updatedRecord)
    }
    catch (error) {
        return response.status(500).json({ message: error.message })
    }
}

const deleteRecord = async (request, response) => {
    try {
        const patientID = request.params
        const deletedRecord = await recordModel.deleteOne({ patientID: patientID })
        if (!deletedRecord) {
            return response.status(404).json({ message: 'Record not found' })
        }
        response.status(200).json({ message: 'Record deleted successfully' })
    }
    catch (error) {
        return response.status(500).json({ message: error.message })
    }
}

const getRecordsByDoctor = async (request, response) => {
    try {
        const doctorName = request.params.doctorName;
        const records = await recordModel.find({ 'referral.referringDoctor': doctorName });

        if (records.length === 0) {
            return response.status(404).json({ message: `No records found for doctor ${doctorName}` });
        }

        response.status(200).json(records);
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

const getRecordsByDateRange = async (request, response) => {
    try {
        const { startDate, endDate } = request.body;
        const records = await recordModel.find({
            treatmentStartDate: { $gte: new Date(startDate), $lte: new Date(endDate) }
        });

        if (records.length === 0) {
            return response.status(404).json({ message: 'No records found in the given date range' });
        }

        response.status(200).json(records);
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

const getRecordsByChronicCondition = async (request, response) => {
    try {
        const chronicCondition = request.params.condition;
        const records = await recordModel.find({
            chronicConditions: { $regex: new RegExp(chronicCondition, 'i') } // Case-insensitive search
        });

        if (records.length === 0) {
            return response.status(404).json({ message: `No records found for condition: ${chronicCondition}` });
        }

        response.status(200).json(records);
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
};

const getRecordsBySmokingStatus = async (request, response) => {
    try {
        const smokingStatus = request.params.status
            .trim()
            .replace(/[-\s]+/g, '\\s*')
            .toLowerCase();

        const records = await recordModel.find({
            smokingStatus: { $regex: new RegExp(`^${smokingStatus}$`, 'i') }
        });

        if (records.length === 0) {
            return response.status(404).json({ message: `No records found for smoking status: ${smokingStatus}` });
        }

        response.status(200).json(records);
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
};

const getRecordsByAgeGroup = async (request, response) => {
    try {
        const { ageGroup } = request.params;
        const currentDate = new Date();
        let startDate, endDate;

        switch (ageGroup) {
            case 'children':
                startDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
                endDate = currentDate;
                break;
            case 'adults':
                startDate = new Date(currentDate.getFullYear() - 60, currentDate.getMonth(), currentDate.getDate());
                endDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
                break;
            case 'elderly':
                startDate = new Date(currentDate.getFullYear() - 200);
                endDate = new Date(currentDate.getFullYear() - 60, currentDate.getMonth(), currentDate.getDate());
                break;
            default:
                return response.status(400).json({ message: 'Invalid age group' });
        }

        const records = await recordModel.find({
            dob: { $gte: startDate, $lt: endDate }
        });

        if (records.length === 0) {
            return response.status(404).json({ message: `No records found for age group: ${ageGroup}` });
        }

        response.status(200).json(records);
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
};

const getRecordsByReferralSource = async (request, response) => {
    try {

        const referralSource = request.params.referralSource
            .trim()
            .replace(/[-\s]+/g, '\\s*')
            .toLowerCase();

        const records = await recordModel.find({
            'referral.source': { $regex: new RegExp(referralSource, 'i') }
        });

        if (records.length === 0) {
            return response.status(404).json({ message: `No records found for referral source: ${request.params.referralSource}` });
        }

        response.status(200).json(records);
    }
    catch (error) {
        return response.status(500).json({ message: error.message });
    }
};

const getIncompleteRecords = async (request, response) => {
    try {
        const incompleteRecords = await recordModel.find({
            $or: [
                { emergencyContactName: { $exists: false } },
                { emergencyContactNumber: { $exists: false } },
                { insuranceProvider: { $exists: false } }
            ]
        });

        if (incompleteRecords.length === 0) {
            return response.status(404).json({ message: 'No incomplete records found' });
        }

        response.status(200).json(incompleteRecords);
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

const getMostFrequentDiagnoses = async (request, response) => {
    try {
        const diagnoses = await recordModel.aggregate([
            { $unwind: "$chronicConditions" },
            { $group: { _id: "$chronicConditions", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        if (diagnoses.length === 0) {
            return response.status(404).json({ message: 'No diagnoses found' });
        }

        response.status(200).json(diagnoses);
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

const exportRecordsToCSV = async (request, response) => {
    try {
        const records = await recordModel.find();
        if (records.length === 0) {
            return response.status(404).json({ message: 'No records available for export' });
        }

        const csv = json2csv.parse(records);

        response.header('Content-Type', 'text/csv');
        response.attachment('healthcare_records.csv');
        return response.send(csv);
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

const uploadMedicalImage = async (request, response) => {
    try {
        const patientId = request.params.patientId;
        const imageFile = request.files.image;
        const imageUrl = await saveImageToStorage(imageFile);

        const updatedRecord = await recordModel.findOneAndUpdate(
            { patientId },
            { $push: { attachments: { fileName: imageFile.name, fileUrl: imageUrl } } },
            { new: true }
        );

        if (!updatedRecord) {
            return response.status(404).json({ message: `No record found for patient with ID: ${patientId}` });
        }

        response.status(200).json(updatedRecord);
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
}


module.exports = { 
    getAllRecords, 
    addNewRecord, 
    searchRecord, 
    updateRecord, 
    deleteRecord, 
    getRecordsByDoctor, 
    getRecordsByDateRange, 
    getRecordsByChronicCondition, 
    getRecordsBySmokingStatus, 
    getRecordsByAgeGroup, 
    getRecordsByReferralSource, 
    getIncompleteRecords, 
    getMostFrequentDiagnoses, 
    exportRecordsToCSV, 
    uploadMedicalImage }