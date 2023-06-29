import { Request, Response } from "express";
import { User } from "models/user";
import { logger } from "utils/logger";
import { z } from "zod";
import jwt from "jsonwebtoken";

const RequestBodySchema = z.object({
	email: z.string().trim().email("Provide us with a valid email id!!"),
	name: z.string().trim().min(3, "Name should be at least of length 3").max(60, "Name can be of max length 60"),
	provider_id: z.string().trim(),
	profile_pic: z.string().trim().url("It should be a valid URL!!"),
});

export const login = async (req: Request, res: Response) => {
	const RequestBodyValidationResult = RequestBodySchema.safeParse(req.body);

	if (!RequestBodyValidationResult.success) {
		return res.status(400).json({
			success: false,
			error: RequestBodyValidationResult.error.errors[0]?.message,
		});
	}

	const requestBody = RequestBodyValidationResult.data;

	try {
		const user = await User.findOne({
			email: requestBody.email,
			provider_id: requestBody.provider_id,
		});

		if (user) {
			const data = {
				user: {
					id: user.id,
					email: user.email,
				},
			};

			const accessToken = jwt.sign(data, process.env["SECRET"] ?? "");

			res.cookie("access-token", accessToken, {
				httpOnly: true,
				expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
				secure: process.env["NODE_ENV"] === "production",
			});

			return res.status(200).json({
				success: true,
			});
		}

		const newUser = await User.create({
			email: requestBody.email.trim(),
			name: requestBody.name.trim(),
			profile_pic: requestBody.profile_pic.trim(),
			provider_id: requestBody.provider_id.trim(),
			username: requestBody.email.split("@")[0] + "_gal",
			avatar: `https://api.dicebear.com/6.x/open-peeps/png?seed=${requestBody.email}`,
		});

		const data = {
			user: {
				id: newUser.id,
				email: newUser.email,
			},
		};

		const accessToken = jwt.sign(data, process.env["SECRET"] ?? "");

		res.cookie("access-token", accessToken, {
			httpOnly: true,
			expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
			secure: process.env["NODE_ENV"] === "production",
		});

		return res.status(200).json({
			success: true,
		});
	} catch (error) {
		if (error instanceof Error) {
			logger.error(error.message);

			return res.status(400).json({
				success: false,
				error: error.message,
			});
		}

		logger.error(error);

		return res.status(400).json({
			success: false,
			error: "Internal Server Error!!",
		});
	}
};
