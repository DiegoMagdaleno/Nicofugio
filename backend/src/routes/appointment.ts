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

router.get('/:id', async (req: Request, res: Response) => {
    
})
