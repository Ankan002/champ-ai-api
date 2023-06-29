import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError, JwtPayload, verify as jwtVerify } from "jsonwebtoken";
import { logger } from "utils/logger";

interface AuthJwtPayLoad extends JwtPayload {
	user?: {
		id: string;
		email: string;
	};
}

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
	const accessToken = req.cookies["access-token"];

	if (!accessToken) {
		return res.status(401).json({
			success: false,
			error: "Access Denied!!",
		});
	}

	try {
		const payloadData = jwtVerify(accessToken, process.env["SECRET"] ?? "") as AuthJwtPayLoad;

		console.log(payloadData.user);

		if (!payloadData.user) {
			res.clearCookie("access-token");

			return res.status(401).json({
				success: false,
				error: "Access Denied!!",
			});
		}

		req.user = payloadData.user;

		return next();
	} catch (error) {
		if (error instanceof JsonWebTokenError) {
			res.clearCookie("access-token");

			return res.status(401).json({
				success: false,
				error: "Access Denied!!",
			});
		}

		if (error instanceof Error) {
			logger.error(error);

			return res.status(400).json({
				success: false,
				error: error.message,
			});
		}

		logger.error(error);

		return res.status(500).json({
			success: false,
			error: "Internal Server Error!!",
		});
	}
};
