import { Schema, model } from "mongoose";
import { DiscussionContextSchema } from "typings/models";

enum DiscussionContextType {
	Question = "question",
	UserText = "user_text",
}

const discussionContextSchema = new Schema<DiscussionContextSchema>(
	{
		name: {
			type: String,
			required: true, // TODO: Think of making this an unique field
			trim: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		question: {
			type: String,
			required: false,
			default: null,
		},
		context_text: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			enum: DiscussionContextType,
			required: true,
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

export const discussionContext = model<DiscussionContextSchema>("DiscussionContext", discussionContextSchema);
