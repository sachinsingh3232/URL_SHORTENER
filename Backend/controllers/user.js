const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Register = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            res.status(409).json({ message: "User Already Exist !" })
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        await User.create({
            email: req.body.email,
            password: hash,
        });

        res.status(200).json({ message: "Registered Successfully!" })
    } catch (e) {
        console.log(e)
    }
}

const Login = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(404).json({ message: "user doesn't exist!" })
            return;
        }
        const isCorrectPassword = bcrypt.compareSync(req.body.password, user.password);

        if (!isCorrectPassword) {
            res.status(400).json({ message: "Wrong email or password" })
            return;
        }
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "30d" });
        // const { password, ...other } = user;
        res.cookie("access_token", token, {
            httpOnly: true,
            sameSite: "None",
            secure: true
        }).status(200).json({ message: "Logged In!" })

    } catch (e) {
        console.log(e)
    }
}

const LogOut = (req, res) => {
    try {
        res.clearCookie("access_token").status(200).json("logged Out!")

    } catch (e) {
        return res.status(500).json("Internal Server Error!");
    }
}

module.exports = { Register, Login, LogOut }
