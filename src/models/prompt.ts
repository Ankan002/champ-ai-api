import { Schema, model } from "mongoose";
import { PromptSchema } from "typings/models";

enum DifficultyLevel {
	Easy = "easy",
	Medium = "medium",
	Hard = "hard",
	Insane = "insane",
}

enum PromptType {
	Answer = "answer",
	Question = "question",
	SummaryParagraph = "summary_paragraph",
	SummaryPoints = "summary_points",
}

const promptSchema = new Schema<PromptSchema>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		discussion_context: {
			type: Schema.Types.ObjectId,
			ref: "DiscussionContext",
			required: true,
		},
		type: {
			type: String,
			enum: PromptType,
			required: true,
		},
		difficulty_level: {
			type: String,
			enum: DifficultyLevel,
			default: null,
		},
		question: {
			type: String,
			default: null,
			trim: true,
		},
		answer: {
			type: String,
			default: null,
			trim: true,
		},
		number_of_points: {
			type: Number,
			default: null,
		},
		number_of_words: {
			type: Number,
			default: null,
		},
		point_summary: {
			type: [String],
			default: [],
		},
		paragraph_summary: {
			type: String,
			default: null,
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

export const Prompt = model<PromptSchema>("Prompt", promptSchema);
