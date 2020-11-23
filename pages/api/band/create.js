import db from "../../../db/mysql";
import SQL from "sql-template-strings";

export default async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case "PUT":
      const { bandManagerId, performerId, name, description, startDate } = body;
      const performerResult = await db.query(SQL`
        INSERT INTO performer (performerId) 
        VALUES (${performerId})
      `);
      const bandResult = await db.query(SQL`
        INSERT INTO band (userId,performerId,name,status,description,startDate) 
        VALUES (${bandManagerId},${performerId},${name},'active',${description},${startDate})
      `);
      console.log(performerResult);
      console.log(bandResult);
      res.status(200).json({ performerResult, bandResult });
      break;

    default:
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
