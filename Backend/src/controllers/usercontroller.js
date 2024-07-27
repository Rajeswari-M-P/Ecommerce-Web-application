const db = require('../models/users'); 
const db = require('../models/admin'); // Import your models
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user or admin
const registerUserOrAdmin = async (req, res) => {
    try {
        const { role, name, email, password } = req.body;

        // Check if the email already exists
        const userExists = await db.User.findOne({ where: { email } });
        const adminExists = await db.Admin.findOne({ where: { email } });

        if (userExists || adminExists) {
            return res.status(400).send('Email is already associated with an account');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 5);

        if (role === 'admin') {
            await db.Admin.create({
                name,
                email,
                password: hashedPassword,
            });
        } else {
            await db.User.create({
                name,
                email,
                password: hashedPassword,
            });
        }

        return res.status(200).send('Registration successful');
    } catch (err) {
        return res.status(500).send('Error in registering user or admin');
    }
}

// Sign in as a user or admin
const signInUserOrAdmin = async (req, res) => {
    try {
        const { role, email, password } = req.body;

        let user;
        if (role === 'admin') {
            user = await db.Admin.findOne({ where: { email } });
        } else {
            user = await db.User.findOne({ where: { email } });
        }

        if (!user) {
            return res.status(404).json('Email not found');
        }

        // Verify password
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            return res.status(404).json('Incorrect email and password combination');
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, role }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION
        });

        res.status(200).send({
            id: user.id,
            name: user.name,
            email: user.email,
            accessToken: token,
        });
    } catch (err) {
        return res.status(500).send('Sign in error');
    }
};

module.exports = {
    registerUserOrAdmin,
    signInUserOrAdmin,
};
