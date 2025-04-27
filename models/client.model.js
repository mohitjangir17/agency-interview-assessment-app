// models/Client.js
import { Schema, model } from 'mongoose';

const clientSchema = new Schema({
    agencyId: { type: Schema.Types.ObjectId, ref: 'Agency', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    totalBill: { type: Number, required: true }
}, { timestamps: true });

export const Client = model('Client', clientSchema);
