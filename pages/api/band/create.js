import db from "../../../db/mysql";
import SQL from "sql-template-strings";

export default async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case "PUT":
      const { bandId, bandManagerId, name, description } = body;
      const performerResult = await db.query(SQL`
        INSERT INTO performer () 
        VALUES ()
      `);
      const performer = await db.query(
        SQL`CALL getLatestPerformerAutoIncrementId()`
      );
      const bandResult = await db.query(SQL`
        INSERT INTO band (bandId,userId,performerId,name,status,description,startDate) 
        VALUES (${bandId},${bandManagerId},${
        performer[0][0]["AUTO_INCREMENT"]
      },${name},'active',${description},${new Date()})
      `);
      // console.log(performerResult);
      // console.log(bandResult);
      if (performerResult.error || bandResult.error) {
        res.status(400).end("error");
        break;
      }
      const band = await db.query(SQL`
        SELECT * FROM band WHERE bandId=${bandId};
      `);
      res.status(200).json(band);
      break;

    default:
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
