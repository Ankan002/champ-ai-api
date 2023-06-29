import { Request, Response } from "express";

export const logout = async (req: Request, res: Response) => {
	res.clearCookie("access-token");

	return res.status(200).json({
		success: true,
	});
};
