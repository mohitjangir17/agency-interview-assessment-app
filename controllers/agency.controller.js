import { Agency } from '../models/agency.model.js';
import { Client } from '../models/client.model.js';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';

export const createAgencyAndClient = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { agency, client } = req.body;

        if (!agency || !client) {
            return res.status(400).json({ message: 'Agency and Client data are required' });
        }

        // Check if agency already exists (based on name + phone number)
        let existingAgency = await Agency.findOne({ name: agency.name, phoneNumber: agency.phoneNumber });

        let agencyToUse;
        if (existingAgency) {
            agencyToUse = existingAgency;
        } else {
            agencyToUse = new Agency(agency);
            await agencyToUse.save({ session });
        }

        // Check if client already exists for the same agency (based on email or phone)
        const existingClient = await Client.findOne({
            email: client.email,
            agencyId: agencyToUse._id
        });

        if (existingClient) {
            await session.abortTransaction();
            session.endSession();
            return res.status(409).json({ message: 'Client already exists under this agency' });
        }

        // Create client
        const newClient = new Client({ ...client, agencyId: agencyToUse._id });
        await newClient.save({ session });

        await session.commitTransaction();
        session.endSession();

        return res.status(201).json({
            success: true,
            message: 'Agency and Client created successfully',
            agency: agencyToUse,
            client: newClient
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error(error);
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


// Get top clients with max totalBill
export const getTopClients = async (req, res) => {
    const topClients = await Client.find()
        .sort({ totalBill: -1 })
        .limit(1)
        .populate('agencyId', 'name');

    if (topClients.length === 0) {
        return res.status(404).json({ message: 'No clients found' });
    }

    const result = topClients.map(client => ({
        AgencyName: client.agencyId.name,
        ClientName: client.name,
        TotalBill: client.totalBill
    }));

    res.status(200).json(result);
};
