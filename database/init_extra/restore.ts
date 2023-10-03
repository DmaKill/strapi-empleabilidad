import * as dotenv from "dotenv";
import pgPromise from "pg-promise";
import * as fs from "fs";
import path from "path";
import tablesToRestore from "../../config/customTablesNames";
import waitOn from "wait-on";
import colors from "colors";
import yargs from 'yargs';

// Load environment variables from .env file
dotenv.config();

// Get the values of the environment variables
const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  PORT,
} = process.env;


const argv = yargs
  .options({
    port: {
      alias: 'p',
      description: 'Puerto para la restauración',
      type: 'number',
    },
  })
  .help()
  .alias('help', 'h').argv;

const port = argv.port || PORT || 1337;

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
    console.log(
      colors.bgBlue(
        `REMEMBER that this restore starts only if the server in http://localhost:${
          port
        } is running if not RUN IT or 'crt + c' TO CANCEL`
      )
    );
    await waitOn({ resources: [`http://localhost:${port}`] });
    // Execute the SQL file
    const sqlFilePath = path.resolve(__dirname, `../../../config/extra.sql`); // Replace with the actual path to your SQL file
    const sqlFileContents = fs.readFileSync(sqlFilePath, "utf8");
    await db.none(sqlFileContents);
    console.log("SQL file executed successfully.");

    const absoluteFilePath = path.resolve(__dirname, `../../../backup`);
    // Check if the database is not empty
    for (const table of tablesToRestore) {
      const countQuery = `SELECT COUNT(*) FROM ${table}`;
      const result = await db.one(countQuery);

      if (parseInt(result.count) > 0) {
        console.log(`Database is not empty. Skipping restoration of ${table}.`);
      } else {
        const filePath = `${absoluteFilePath}/${table}_backup.csv`;

        if (fs.existsSync(filePath)) {
          const query = `
          COPY ${table} FROM '${filePath}' CSV HEADER;
        `;

          await db.none(query);
          console.log(`Restoration of ${table} completed.`);
        } else {
          console.warn(colors.yellow(`Backup file for ${table} not found.`));
        }
      }
    }

    console.log(colors.green("Data restoration completed."));
    pgp.end();
  } catch (error) {
    console.error(colors.red("Error while restoring backups:"), error);
    pgp.end();
  }
})();
