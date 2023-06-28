import { ObjectId } from "mongoose";

export interface StarredDiscussionContextSchema {
	_id: ObjectId;
	user: ObjectId;
	discussion_context: ObjectId;
	id: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}
