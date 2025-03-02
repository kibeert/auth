const express = require('express');
const db = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Server is running");
});

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

app.post("/signup", async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query("INSERT INTO users (firstname, lastname, email, password) VALUES (?,?,?,?)",
            [firstname, lastname, email, hashedPassword],
            (err, result) => {
                if (err) {
                    console.error('Error inserting user:', err);
                    return res.status(500).json({ error: "Internal server error" });
                }
                res.json({ message: "User successfully registered" });
            });
    } catch (err) {
        console.error('Error in /signup route:', err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
            if (err) {
                console.error('Error querying user:', err);
                return res.status(500).json({ error: "Internal server error" });
            }
            if (!results.length) {
                console.error('No user found with email:', email);
                return res.status(401).json({ error: "User does not exist" });
            }
            const user = results[0];
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                console.error('Password does not match for user:', email);
                return res.status(401).json({ error: "Incorrect password" });
            }

            const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: "1h" });
            res.json({ message: "Login successful", token });
        });
    } catch (err) {
        console.error('Error in /login route:', err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/user", authenticateToken, (req, res) => {
    db.query("SELECT firstname, lastname, email FROM users WHERE id = ?", [req.user.id], (err, results) => {
        if (err) {
            console.error('Error fetching user details:', err);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (!results.length) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ user: results[0] });
    });
});

app.listen(5000, () => console.log("Server is running on port 5000"));
