import { NextFunction, Request, Response } from "express";

export const isUnauthenticated = (req: Request, res: Response, next: NextFunction) => {
	const accessToken = req.cookies["access-token"];

	console.log(accessToken);

	if (accessToken) {
		return res.status(400).json({
			success: false,
			error: "Already logged in!!",
		});
	}

	return next();
};
