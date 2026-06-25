require("dotenv").config();

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Temwani & Chipego Backend Running ❤️");
});

app.post("/send-answer", async (req, res) => {

    try {

        const { question, answer } = req.body;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from:process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: "💌 New Answer From Tee",
            html: `
                <h2>New Response ❤️</h2>
                 <p><strong>Question:</strong></p>
                <p>${question}</p>

                <p><strong>Answer:</strong></p>
                <p>${answer}</p>
            `
        });

        res.json({
            success: true
        });

    } catch(error) {

        console.error(error);

        res.status(500).json({
            success: false,
            error: error.message
        });

    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
