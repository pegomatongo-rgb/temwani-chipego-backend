const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors({
    origin: "*"
}));
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.post("/send-answer", async (req, res) => {
    console.log("🔥 NODE RECEIVED REQUEST");
    console.log(req.body);

    const { question, answer } = req.body;

    try {

        await transporter.sendMail({
            from: process.env.EMAIL_SENDER,
            to: process.env.EMAIL_USER,
            subject: "❤️ New Love Question Answer",
            html: `
                <h2>Question</h2>
                <p>${question}</p>

                <h2>Answer</h2>
                <p>${answer}</p>
            `
        });

        res.json({
            success: true
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false
        });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
