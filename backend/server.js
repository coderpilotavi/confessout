const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Simulated Database
const messages = [];

// API Endpoint to Send Messages
app.post("/api/sendMessage", (req, res) => {
    const { name = "Anonymous", message } = req.body;

    if (!message.trim()) {
        return res.status(400).json({ message: "Message cannot be empty!" });
    }

    const senderIP = req.ip;
    const newMessage = { name, message, senderIP, timestamp: new Date() };

    messages.push(newMessage);

    console.log("New Confession:", newMessage);
    res.status(200).json({ message: "Confession sent successfully!" });
});

// API Endpoint to Retrieve Messages
app.get("/api/getMessages", (req, res) => {
    res.status(200).json(messages);
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:5000`);
});
