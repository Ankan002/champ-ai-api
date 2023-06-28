import { Schema, model } from "mongoose";
import { PlanSchema } from "typings/models";

enum Currency {
	INR = "INR",
}

const planSchema = new Schema<PlanSchema>(
	{
		price: {
			type: Number,
			required: true,
			min: 1,
			max: 20000,
		},
		currency: {
			type: String,
			enum: Currency,
			default: Currency.INR,
		},
		is_active: {
			type: Boolean,
			default: true,
		},
		discussion_contexts: {
			type: Number,
			required: true,
			min: 1,
			max: Infinity,
		},
		prompts: {
			type: Number,
			required: true,
			min: 1,
			max: Infinity,
		},
	},
	{
		timestamps: true,
		toJSON: {
			transform: (_, returningDoc) => {
				returningDoc["id"] = returningDoc["_id"];
				delete returningDoc["_id"];
			},
		},
	}
);

export const Plan = model<PlanSchema>("Plan", planSchema);
