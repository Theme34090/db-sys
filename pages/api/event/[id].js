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
      const eventRes = await db.query(SQL`
        SELECT * FROM event WHERE eventId=${id};
      `);
      const locationRes = await db.query(SQL`
        SELECT * FROM location WHERE location=${eventRes[0].location};
      `);
      res.status(200).json([Object.assign(eventRes[0], locationRes[0])]);
      break;

    case "PUT":
      const {
        eventId,
        userId,
        name,
        location,
        ticketPrice,
        description,
        dateTime,
        latitude,
        longitude,
      } = body;
      const locationResult = await db.query(SQL`
          UPDATE location SET
            location=${location},
            latitude=${latitude},
            longitude=${longitude}
          WHERE location=${location}
        `);
      const eventResult = await db.query(SQL`
          UPDATE event SET
            userId=${userId},
            name=${name},
            location=${location},
            ticketPrice=${ticketPrice},
            description=${description},
            dateTime=${dateTime}
          WHERE eventId=${eventId}
        `);
      console.log(locationResult);
      console.log(eventResult);
      if (locationResult.error || eventResult.error) {
        res.status(400).end("error");
        break;
      }
      const event = await db.query(SQL`
          SELECT * FROM event WHERE eventId=${eventId};
        `);
      const loc = await db.query(SQL`
          SELECT * FROM location WHERE location=${event[0].location};
        `);
      res.status(200).json([Object.assign(event[0], loc[0])]);
      break;

    case "DELETE":
      const deleteResult = await db.query(SQL`
          DELETE FROM event WHERE eventId=${id};
        `);
      if (deleteResult.affectedRows === 0) {
        res.status(404).end();
        break;
      }
      res.status(200).json(deleteResult);
      break;

    default:
      res.setHeader("Allow", ["GET", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
