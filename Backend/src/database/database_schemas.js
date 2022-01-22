import mongoose from 'mongoose'

export const pregSchema = new mongoose.Schema({
  copulation: {
    date: Date,
    bullNumber: Number,
    worker: String,
  },
  examination: {
    date: Date,
    doctor: String,
    duration: Number,
    isPregnant: Boolean,
    reason: String,
  },
  lactation: {
    date: Date,
  },
  delivery: {
    number: Number,
    date: Date,
    gender: String,
  },
})

export const vaccinationSchema = new mongoose.Schema({
  vaccine: String,
  vaccinationDate: Date,
  doctor: String,
})

export const diseaseSchema = new mongoose.Schema({
  testDate: Date,
  doctor: String,
  vaccination: [vaccinationSchema],
  cured: Boolean,
})

export const milkHistorySchema = mongoose.Schema({
  milk: Number,
  milkDate: Date,
  lineNumber: Number,
})