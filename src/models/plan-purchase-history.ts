import { Schema, model } from "mongoose";
import { PlanPurchaseHistorySchema } from "typings/models";

const planPurchaseHistorySchema = new Schema<PlanPurchaseHistorySchema>(
	{
		plan: {
			type: Schema.Types.ObjectId,
			ref: "Plan",
			required: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		start_date: {
			type: String,
			required: true,
			trim: true,
		},
		end_date: {
			type: String,
			required: true,
			trim: true,
		},
		is_amount_paid: {
			type: Boolean,
			default: false,
		},
		payment_id: {
			type: String,
			default: null,
			trim: true,
		},
		order_id: {
			type: String,
			required: true,
			trim: true,
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

export const PlanPurchaseHistory = model<PlanPurchaseHistorySchema>("PlanPurchaseHistory", planPurchaseHistorySchema);
