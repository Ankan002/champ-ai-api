import { ObjectId } from "mongoose";

export interface UserSchema {
	_id: ObjectId;
	email: string;
	username: string;
	name: string;
	provider_id: string;
	profile_pic: string;
	avatar: string;
	premium_till: string;
	premium_plan: ObjectId;
	is_active: boolean;
	active_picture: "profile_pic" | "avatar";
	id: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}
