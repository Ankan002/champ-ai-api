import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { logger } from "utils/logger";
import { morganConfig } from "middlewares/morgan";
import { origins } from "constants/origins";
import { connectToDB } from "utils/connect-to-db";
import { authRouter } from "routes/auth-router";

export const startServer = () => {
	const app = express();
	const PORT = process.env["PORT"];

	connectToDB();

	app.use(
		cors({
			credentials: true,
			origin: origins,
		})
	);
	app.use(express.json());
	app.use(cookieParser());

	app.use(
		fileUpload({
			limits: {
				fileSize: 20 * 1024 * 1024,
			},
		})
	);

	app.use(morganConfig);

	app.get("/", (req, res) => {
		return res.status(200).json({
			success: true,
			message: "Hello from Champ AI!!",
		});
	});

	app.use("/api/auth", authRouter);

	app.listen(PORT, () => logger.info(`App is running at port: ${PORT}`));
};
