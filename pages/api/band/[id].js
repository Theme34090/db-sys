import db from "../../../db/mysql";
import SQL from "sql-template-strings";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
    body,
  } = req;

  switch (method) {
    case "GET":
      const band = await db.query(SQL`
        SELECT * FROM band WHERE bandId=${id};
      `);
      res.status(200).json(band);
      break;

    case "DELETE":
      const deleteResult = await db.query(SQL`
          DELETE FROM band WHERE bandId=${id};
        `);
      res.status(200).json(deleteResult);
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
