require("dotenv").config({ path: "./config.local.env" });
export const { PORT, DB_URL, JWT_SECRET, JWT_EXPIRES } = process.env;
