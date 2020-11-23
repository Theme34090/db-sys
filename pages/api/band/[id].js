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

    case "PUT":
      const { bandId, name, status, description, endDate } = body;
      const bandResult = await db.query(SQL`
          UPDATE band SET
            name=${name},
            status=${status},
            description=${description},
            endDate=${endDate}
          WHERE bandID=${bandId}
        `);
      // console.log(performerResult);
      // console.log(bandResult);
      if (bandResult.error) {
        res.status(400).end("error");
        break;
      }
      const bandr = await db.query(SQL`
          SELECT * FROM band WHERE bandId=${bandId};
        `);
      res.status(200).json(bandr);
      break;

    case "DELETE":
      const deleteResult = await db.query(SQL`
          DELETE FROM band WHERE bandId=${id};
        `);
      if (deleteResult.affectedRows === 0) {
        res.status(404).end();
        break;
      }
      res.status(200).json(deleteResult);
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
