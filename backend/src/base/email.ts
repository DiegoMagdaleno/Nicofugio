import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "diegomagdaleno231@gmail.com",
        pass: "fjpq uhzk vquf pdbc"
    }
})

export const baseOptions = {
    from: "diegomagdaleno231@gmail.com",
}