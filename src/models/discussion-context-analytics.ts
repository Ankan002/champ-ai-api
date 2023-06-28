import { Schema, model } from "mongoose";
import { DiscussionContextAnalyticsSchema } from "typings/models";

const discussionContextAnalyticsSchema = new Schema<DiscussionContextAnalyticsSchema>(
	{
		discussion_context: {
			type: Schema.Types.ObjectId,
			ref: "DiscussionContext",
			required: "true",
		},
		stars: {
			type: Number,
			default: 0,
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

export const DiscussionContextAnalytics = model<DiscussionContextAnalyticsSchema>(
	"DiscussionContextAnalytics",
	discussionContextAnalyticsSchema
);
