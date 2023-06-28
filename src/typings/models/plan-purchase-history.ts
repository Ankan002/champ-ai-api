import { ObjectId } from "mongoose";

export interface PlanPurchaseHistorySchema {
	_id: ObjectId;
	plan: ObjectId;
	user: ObjectId;
	start_date: string;
	end_date: string;
	order_id: string;
	payment_id?: string;
	is_amount_paid: boolean;
	id: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}
