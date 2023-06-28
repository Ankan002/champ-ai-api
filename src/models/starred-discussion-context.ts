import { Schema, model } from "mongoose";
import { StarredDiscussionContextSchema } from "typings/models";

const starredDiscussionContextSchema = new Schema<StarredDiscussionContextSchema>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		discussion_context: {
			type: Schema.Types.ObjectId,
			ref: "StarredDiscussion",
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

export const StarredDiscussionContext = model<StarredDiscussionContextSchema>(
	"StarredDiscussionContext",
	starredDiscussionContextSchema
);
