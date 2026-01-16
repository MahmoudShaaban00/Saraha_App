
 import mongoose from 'mongoose';
 const { Schema } = mongoose;

    const messageSchema = new Schema({
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        message: { type: String, required: true },
        timestamp: { type: Date, default: Date.now }
    });

    export const Message = mongoose.model('Message', messageSchema);