const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['formateur', 'company', 'admin','condidat','new'], default: 'condidat' },
  confirmed: { type: Boolean ,default:true},
  educations: [{
    schoolName: { type: String },
    degree: { type: String},
    fieldOfStudy: { type: String },
  }],
  experiences: [{
    jobTitle: { type: String},
    company: { type: String },
    description: { type: String }
  }],
  skills: [{ type: String }],
  local: [{ type: String }],
  companies: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  interns: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  uploadedFiles: [{ type: String }],
  date:{ type:Date },
  phoneNumber:{ type:Number},
  description: { type: String},
  linkedinId: {type:String},

  confirmationToken: { type: String },
  confirmExpiration: { type: Date }
});


userSchema.methods.hashPassword = async function (newPassword) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);
    this.password = hash;
    await this.save();
  } catch (error) {
    throw error;
  }
};

userSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
