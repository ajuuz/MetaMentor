import mongoose from "mongoose";
import { IMentorSlotModel } from "../models/mentorSlot.model";


const oneSlotSchema = new mongoose.Schema({
  start: { type: String, required: true },
  end: { type: String, required: true },
  enabled: { type: Boolean, default: false }
});


export const mentorSlotSchema =new mongoose.Schema<IMentorSlotModel>({
    mentorId:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:'mentors'
    },
    slots:{
        Monday:[oneSlotSchema],
        Tuesday:[oneSlotSchema],
        Wednesday:[oneSlotSchema],
        Thursday:[oneSlotSchema],
        Friday:[oneSlotSchema],
        Saturday:[oneSlotSchema],
        Sunday:[oneSlotSchema],
    }
})