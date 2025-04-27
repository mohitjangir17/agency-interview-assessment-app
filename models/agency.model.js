import { Schema, model } from 'mongoose';

const agencySchema = new Schema({
    name: { type: String, required: true },
    address1: { type: String, required: true },
    address2: { type: String },
    state: { type: String, required: true },
    city: { type: String, required: true },
    phoneNumber: { type: String, required: true }
});

export const Agency = model('Agency', agencySchema);
