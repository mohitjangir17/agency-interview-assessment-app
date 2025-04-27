import mongoose from 'mongoose';
import { Client } from '../models/client.model.js';

// Update a client
export const updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        // Validate the id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid Client ID' });
        }

        const client = await Client.findById(id);

        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        const updatedClient = await Client.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        return res.status(200).json(updatedClient);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
