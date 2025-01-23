const express = require('express');
const router = express.Router();
const {
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
    uploadMedicalImage
} = require('../controllers/recordController');


router.get('/', getAllRecords); 
router.post('/', addNewRecord); 
router.get('/search/:patientID', searchRecord); 
router.put('/', updateRecord); 
router.delete('/:patientID', deleteRecord); 
router.get('/doctor/:doctorName', getRecordsByDoctor); 
router.post('/date-range', getRecordsByDateRange);
router.get('/condition/:condition', getRecordsByChronicCondition); 
router.get('/smoking-status/:status', getRecordsBySmokingStatus); 
router.get('/age-group/:ageGroup', getRecordsByAgeGroup); 
router.get('/referral-source/:referralSource', getRecordsByReferralSource); 
router.get('/incomplete', getIncompleteRecords); 
router.get('/most-frequent-diagnoses', getMostFrequentDiagnoses); 
router.get('/export/csv', exportRecordsToCSV); 
router.post('/upload-image/:patientId', uploadMedicalImage); 

module.exports = router;
