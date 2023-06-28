import { ObjectId } from "mongoose";

export interface PromptSchema {
	_id: ObjectId;
	discussion_context: ObjectId;
	user: ObjectId;
	type: "answer" | "summary_paragraph" | "summary_points" | "question";
	question: string | null;
	answer: string | null;
	difficulty_level: "easy" | "medium" | "hard" | "insane" | null;
	number_of_words: number | null;
	number_of_points: number | null;
	paragraph_summary: string | null;
	point_summary: Array<string>;
	id: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}
