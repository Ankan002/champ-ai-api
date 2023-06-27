import { connect } from "mongoose";
import { logger } from "utils/logger";

export const connectToDB = () => {
	const databaseUrl = process.env["DATABASE_URL"] ?? "";

	connect(databaseUrl)
		.then(() => logger.info("Connected to DB!!"))
		.catch((error) => logger.error(error));
};
