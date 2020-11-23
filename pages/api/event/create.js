import db from "../../../db";
import SQL from "sql-template-strings";

export default async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
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
        INSERT INTO location (location,latitude,longitude)
        VALUES (${location},${latitude},${longitude})
      `);
      const eventResult = await db.query(SQL`
        INSERT INTO event (eventId,userId,name,location,ticketPrice,description,dateTime) 
        VALUES (${eventId}, ${userId}, ${name}, ${location}, ${ticketPrice}, ${description}, ${dateTime})
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
      res.status(200).json(event);
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
