import { Router } from "express";
import nodemailer from "nodemailer";
const router = Router();

// send feedback mail
router.post("/", async (req, res) => {
    // !valid email
    if (req.body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)) {
        return res.status(400).send("Invalid email");
    }
    if (!req.body.email || !req.body.message) {
        return res.status(400).send("Email or message not provided");
    }

    if (!process.env.EMAIL || !process.env.PASSWORD) {
        return res.status(500).send("Email not configured");
    }
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });

    var mailOptions = {
        from: process.env.EMAIL,
        to: `${process.env.EMAIL}, ${req.body.email}`,
        subject: "Feedback from user " + req.body.email,
        text: req.body.message,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        console.log(error, info);
        if (error) {
            res.status(500).send("Error sending email");
        } else {
            res.status(200).send("Email sent");
        }
    });
});

export default router;
