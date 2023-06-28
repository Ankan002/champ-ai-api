import { ObjectId } from "mongoose";

export interface DiscussionContextAnalyticsSchema {
	_id: ObjectId;
	discussion_context: ObjectId;
	stars: number;
	id: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}
