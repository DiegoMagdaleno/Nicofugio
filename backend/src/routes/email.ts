import SMTPTransport from "nodemailer/lib/smtp-transport";
import { transporter, baseOptions } from "../base/email";
import express, {Request, Response} from "express";

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

export default router;