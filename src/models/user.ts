import { Schema, model } from "mongoose";
import { UserSchema } from "typings/models";

enum ActivePicture {
	ProfilePicture = "profile_pic",
	Avatar = "avatar",
}

const userSchema = new Schema<UserSchema>(
	{
		email: {
			type: String,
			required: true,
			min: 1,
			trim: true,
			unique: true,
		},
		name: {
			type: String,
			required: true,
			min: 3,
			max: 70,
			trim: true,
		},
		provider_id: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		profile_pic: {
			type: String,
			required: true,
			trim: true,
		},
		avatar: {
			type: String,
			required: true,
			trim: true,
		},
		premium_till: {
			type: String,
			default: null,
			trim: true,
		},
		premium_plan: {
			type: Schema.Types.ObjectId,
			ref: "Plan",
			default: null,
		},
		is_active: {
			type: Boolean,
			default: true,
		},
		active_picture: {
			type: String,
			enum: ActivePicture,
			default: ActivePicture.Avatar,
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

export const User = model<UserSchema>("User", userSchema);
