import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { logger } from "utils/logger";
import { morganConfig } from "middlewares/morgan";

export const startServer = () => {
	const app = express();
	const PORT = process.env["PORT"];

	app.use(cors());
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

	app.use("/", (req, res) => {
		return res.status(200).json({
			success: true,
			message: "Hello from Champ AI!!",
		});
	});

	app.listen(PORT, () => logger.info(`App is running at port: ${PORT}`));
};
