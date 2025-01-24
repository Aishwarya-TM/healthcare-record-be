const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address',
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      enum: ['admin', 'doctor', 'nurse', 'receptionist', 'patient'],
      default: 'patient',
    },
    contactNumber: {
      type: String,
      match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false, 
    },
    dateOfRegistration: {
      type: Date,
      default: Date.now,
    },
    lastLogin: {
      type: Date,
    },
    profilePicture: {
      type: String, 
    },
    additionalDetails: {
      address: {
        type: String,
      },
      specialization: {
        type: String, 
      },
      emergencyContact: {
        name: {
          type: String,
        },
        phone: {
          type: String,
          match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'],
        },
      },
    },
  },
  {
    timestamps: true, 
    collection: 'HealthcareUsers', 
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('HealthcareUser', userSchema);
