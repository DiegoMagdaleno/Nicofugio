import express, { Request, Response } from "express";
import { db } from "../firebase";
import { Appointment } from "../model/appointment";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const data = req.body as Appointment;
    const docRef = await db.collection("appointments").add(data);
    res.status(201).send({ id: docRef.id });
  } catch (error) {
    res
      .status(500)
      .send({ message: "¡Ocurrio un error al registrar la cita!", error });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const snapshot = await db.collection("appointments").get();
    const appointments: any[] = [];
    snapshot.forEach((doc) => {
      appointments.push({ id: doc.id, ...doc.data() } as Appointment);
    });
    res.status(200).send(appointments);
  } catch (error) {
    res
      .status(500)
      .send({ message: "¡Ocurrio un error al obtener las citas!", error });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const doc = await db.collection("appointments").doc(req.params.id).get();
    if (!doc.exists) {
      res.status(404).send({ message: "¡Cita no encontrada!" });
    } else {
      res.status(200).send({ id: doc.id, ...doc.data() });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "¡Ocurrio un error al obtener la cita!", error });
  }
});

router.get("/email/:email", async (req: Request, res: Response) => {
  try {
    const snapshot = await db
      .collection("appointments")
      .where("email", "==", req.params.email)
      .get();
    const appointments: any[] = [];
    snapshot.forEach((doc) => {
      appointments.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).send(appointments);
  } catch (error) {
    res
      .status(500)
      .send({ message: "¡Ocurrio un error al obtener las citas!", error });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const data = req.body;
    await db.collection("appointments").doc(req.params.id).update(data);
    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .send({ message: "¡Ocurrio un error al actualizar la cita!", error });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await db.collection("appointments").doc(req.params.id).delete();
    res.status(204).send({ message: "¡Cita eliminada con éxito!" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "¡Ocurrio un error al eliminar la cita!", error });
  }
});

router.get("/qr/:id", async (req, res) => {
  // Get the appointment data
  const doc = await db.collection("appointments").doc(req.params.id).get();
  if (!doc.exists) {
    res.status(404).send({ message: "¡Cita no encontrada!" });
    return;
  }
  const appointment = doc.data() as Appointment;

  let appointmentDateSplit = appointment.date.split("/");
  let appointmentTimeSplit = appointment.time.split(":");
  const startDate = new Date(
    `${appointmentDateSplit[2]}-${appointmentDateSplit[1]}-${appointmentDateSplit[0]}T${appointmentTimeSplit[0]}:${appointmentTimeSplit[1]}:00Z`
  );

  let calcEndDate = new Date(startDate);
  calcEndDate.setMinutes(calcEndDate.getMinutes() + 30);
  const endDate = calcEndDate;

  const eventTitle = "Cita de adopción";
  const calendarEventData = `BEGIN:VEVENT
SUMMARY:${eventTitle}
DTSTART:${startDate.toISOString().replace(/[-:]/g, "").slice(0, -5)}
DTEND:${endDate.toISOString().replace(/[-:]/g, "").slice(0, -5)}
END:VEVENT`;

  const calendarData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Your Company//NONSGML Event//EN
${calendarEventData}
END:VCALENDAR`;

  res.status(200).send({ qr: calendarData });
});

module.exports = router;

export default router;
