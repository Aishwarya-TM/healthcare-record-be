const recordData = [
    {
        "patientId": "P123",
        "patientName": "John Doe",
        "dob": "1985-06-15",
        "gender": "Male",
        "contactNumber": "+1234567890",
        "emergencyContactName": "Jane Doe",
        "emergencyContactNumber": "+0987654321",
        "address": "123 Main St, Springfield, IL, 62701",
        "insuranceProvider": "HealthInsure Inc.",
        "insurancePolicyNumber": "HI123456789",
        "allergies": ["Penicillin", "Peanuts"],
        "medicalHistory": ["Hypertension", "Asthma"],
        "chronicConditions": ["Type 2 Diabetes"],
        "vitalSigns": {
          "bloodPressure": "120/80",
          "temperature": "98.6",
          "weight": "75kg"
        },
        "treatmentStartDate": "2023-05-01",
        "treatmentPlan": "Manage blood sugar levels through insulin and diet control.",
        "bloodType": "O+",
        "referral": {
          "referringDoctor": "Dr. Alice Smith",
          "referralReason": "Chronic diabetes management",
          "referralSource": "Primary Care Physician"
        },
        "hospitalStay": {
          "hospitalName": "Springfield General Hospital",
          "roomNumber": "205B",
          "admissionDate": "2023-06-10",
          "dischargeStatus": "Stable"
        },
        "surgeries": ["Appendectomy in 2010"],
        "familyMedicalHistory": ["Heart disease", "Cancer"],
        "immunizations": ["Flu Vaccine 2023", "Hepatitis B"],
        "pregnancyDetails": {
          "pregnancyStatus": "N/A",
          "deliveryMethod": "N/A",
          "gestationalAge": null,
          "complicationsDuringPregnancy": null
        },
        "mentalHealthStatus": "Stable",
        "emergencyCare": {
          "treatmentDate": "2023-07-01",
          "careType": "Emergency Room Visit",
          "doctorName": "Dr. Bob Lee"
        },
        "previousVisits": [
          {
            "visitDate": "2022-05-15",
            "diagnosis": "Flu",
            "treatment": "Rest and hydration"
          }
        ],
        "treatmentOutcome": "In progress",
        "patientStatus": "Stable",
        "dischargeDate": "2023-06-15",
        "dischargeSummary": "Patient discharged in stable condition after diabetes management adjustments.",
        "vaccinationHistory": ["COVID-19 Vaccine", "Flu Vaccine 2022"],
        "nextVaccinationDue": "2024-10-10",
        "smokingStatus": "Non-Smoker",
        "alcoholConsumption": "Occasional",
        "exerciseFrequency": "3 times a week",
        "advanceDirective": true,
        "organDonationStatus": true,
        "palliativeCare": false,
        "housingStatus": "Stable",
        "employmentStatus": "Employed",
        "educationLevel": "Bachelor's Degree",
        "clinicalNotes": "Patient is responding well to current treatment, no immediate concerns.",
        "blockchainTransactionHash": "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
        "attachments": [
          {
            "fileName": "BloodTestResults.pdf",
            "fileLink": "http://example.com/files/bloodtest123.pdf",
            "fileType": "application/pdf"
          }
        ],
        "followUpDate": "2023-07-15",
        "followUpInstructions": "Monitor blood sugar levels and attend follow-up appointment in 2 weeks.",
        "followUpNotes": "Patient was advised to maintain a healthy diet and regular exercise."
      }
      
]

module.exports = recordData