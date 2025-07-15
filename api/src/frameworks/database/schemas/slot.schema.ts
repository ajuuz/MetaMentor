import mongoose, { Schema } from "mongoose";
import { ISlotModel } from "../models/slot.model";

const daySlotSchema = {
  start: { type: String, required: true },
  end: { type: String, required: true },
  enabled: { type: Boolean, default: true },
};

const weekSchema = new mongoose.Schema({
  Monday: { type: [daySlotSchema], default: [] },
  Tuesday: { type: [daySlotSchema], default: [] },
  Wednesday: { type: [daySlotSchema], default: [] },
  Thursday: { type: [daySlotSchema], default: [] },
  Friday: { type: [daySlotSchema], default: [] },
  Saturday: { type: [daySlotSchema], default: [] },
  Sunday: { type: [daySlotSchema], default: [] },
});


export const slotSchema:Schema<ISlotModel>=new mongoose.Schema<ISlotModel>({
    mentorId:{
        type:mongoose.Schema.ObjectId,
        ref:"mentors",
        required:true
    },
    weekSlots:{
        type:weekSchema,
        required:true,
         default: () => ({
            Monday: [],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            Friday: [],
            Saturday: [],
            Sunday: [],
          }),
    }
})

