import SMTPTransport from "nodemailer/lib/smtp-transport";
import { transporter, baseOptions } from "../base/email";
import express, {Request, Response} from "express";
import { db } from "../firebase";
import { Appointment } from "../model/appointment";
import axios from "axios";

const router = express.Router();

router.post('/contact', (req: Request, res: Response) => {
    let { email, name, message } = req.body;

    console.log(email, name, message);

    const mailOptions = {
        ...baseOptions,
        to: email,
        subject: `Hola, ${name}. Gracias por contactarnos`,
        text: `Hola, ${name}. Gracias por contactarnos. Nos pondremos en contacto contigo lo antes posible.`
    }

    transporter.sendMail(mailOptions, function (error: Error | null, info: SMTPTransport.SentMessageInfo) {
        if (error) {
            res.send(res.json({
                message: "Error al enviar el correo electrónico",
            }))
        } else {
            res.send(res.json({
                message: "Correo electrónico enviado",
            }))
        }
    })

    // Part 2: Send a message to the company, with the user's message
    const mailOptionsNicofugio = {
        ...baseOptions,
        to: "diegomagdaleno231@gmail.com",
        subject: `Nuevo mensaje de ${name}`,
        text: message
    }

    transporter.sendMail(mailOptionsNicofugio, function (error: Error | null, info: SMTPTransport.SentMessageInfo) {
        if (error) {
            console.log(error);
        } else {
            console.log("Correo electrónico enviado");
        }
    })
});

router.post('/appointment', async (req: Request, res: Response) => {
    let { appointmentId } = req.body;

    const petsResponse = await axios.get(
        "https://gist.githubusercontent.com/DiegoMagdaleno/d1293fe76c253c22479c0c9f23132327/raw/ede111e5de0f7a4bb35895077bc49e1841b3ee2a/pets.json"
      );
    const pets = petsResponse.data;

    let appointmentRef = db.collection('appointments').doc(appointmentId);

    appointmentRef.get().then((doc) => {
        if (!doc.exists) {
            res.status(404).send({ message: "¡Cita no encontrada!" });
        } else { 
            let appointment = doc.data() as Appointment;
            const petName = pets.find((p: any) => p.id === appointment.petId).name;
            let mailOptions = {
                ...baseOptions,
                to: appointment.email,
                subject: `Cita de adopcion para ${petName}`,
                text: `Hola, ${appointment.name}. Tu cita para adoptar a ${petName} ha sido agendada para el ${appointment.date} a las ${appointment.time}. ¡Te esperamos!`
            }

            transporter.sendMail(mailOptions, function (error: Error | null, info: SMTPTransport.SentMessageInfo) {
                if (error) {
                    res.send(res.json({
                        message: "Error al enviar el correo electrónico",
                    }))
                } else {
                    res.send(res.json({
                        message: "Correo electrónico enviado",
                    }))
                }
            });
        }
    })


})

export default router;