import { ObjectId } from "mongoose";

export interface PlanSchema {
	_id: ObjectId;
	price: number;
	currency: "INR";
	is_active: boolean;
	discussion_contexts: number;
	prompts: number;
	id: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}
