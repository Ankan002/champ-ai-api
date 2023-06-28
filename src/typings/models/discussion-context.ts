import { ObjectId } from "mongoose";

export interface DiscussionContextSchema {
	_id: ObjectId;
	user: ObjectId;
	name: string;
	type: "question" | "user_text";
	question: string | null;
	context_text: string;
	id: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}
