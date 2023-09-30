import * as dotenv from "dotenv";
import pgPromise from "pg-promise";
import * as fs from "fs";
import path from "path";
import tablesToBackup from "../../config/customTablesNames";
import colors from "colors";

// Load environment variables from .env file
dotenv.config();

// Get the values of the environment variables
const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
} = process.env;

// Create a PostgreSQL connection
const pgp = pgPromise();
const connectionString = {
  host: DATABASE_HOST,
  port: parseInt(DATABASE_PORT || "5432"),
  database: DATABASE_NAME,
  user: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
};

const db = pgp(connectionString);

(async () => {
  try {
    console.log(colors.blue("Init backup..."));
    const absoluteFilePath = path.resolve(__dirname, `../../../backup`);
    if (!fs.existsSync(absoluteFilePath)) {
      fs.mkdirSync(absoluteFilePath);
    }
    for (const table of tablesToBackup) {
      // Check if the table exists
      const checkTableQuery = `
        SELECT EXISTS (
          SELECT 1
          FROM information_schema.tables
          WHERE table_schema = 'public' AND table_name = $1
        );
      `;

      const tableExists = await db.one(checkTableQuery, [table]);
      if (tableExists.exists) {
        const query = `COPY ${table} TO '${absoluteFilePath}/${table}_backup.csv' CSV HEADER;`;
        await db.any(query);
        console.log(`Backup of ${table} completed.`);
      } else {
        console.warn(colors.yellow(`Table '${table}' does not exist. Skipping backup.`));
      }
    }

    console.log(colors.green("Backups completed."));
    console.log(colors.bgMagenta("OJO => Remember use the comman line 'npm run restore' after the strapi server is started"))
    pgp.end();
  } catch (error) {
    console.error(colors.red("Error while performing backups:"), error);
    pgp.end();
  }
})();
