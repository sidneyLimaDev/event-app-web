import { model, models, Schema, Document } from "mongoose";

export interface IEvent extends Document {
  _id: string;
  title: string;
  description?: string;
  createdAt: Date;
  location: string;
  imageUrl: string;
  StartDateTime: Date;
  EndDateTime: Date;
  price?: string;
  isFree: boolean;
  url?: string;
  category: { _id: string; name: string };
  organizer: { _id: string; firstName: string; lastName: string };
}

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  location: { type: String, required: true },
  imageUrl: { type: String, required: true },
  StartDateTime: { type: Date, default: Date.now },
  EndDateTime: { type: Date, default: Date.now },
  price: { type: String, required: true },
  isFree: { type: Boolean, default: false },
  url: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  organizer: { type: Schema.Types.ObjectId, ref: "User" },
});

const Event = models.Event || model("Event", EventSchema);

export default Event;
