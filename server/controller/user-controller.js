import User from '../model/user-schema.js';
import JWT from 'jsonwebtoken';
import { hassPassword, comparePassword } from '../helper/authHelper.js';


export const userSignup = async (request, response) => {
    try {
        const { firstname, lastname, username, email, password, phone } = request.body;
        const exist = await User.findOne({ username });
        if (exist) {
            return response.status(401).json({ message: 'Username already exist' });
        }
        const hassedPassword = await hassPassword(password)
        const user = await User({ firstname, lastname, username, email, password: hassedPassword, phone }).save()

        response.status(200).json({ message: user });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }

}

export const userLogin = async (request, response) => {
    try {
        const { username, password } = request.body;
        let user = await User.findOne({ username: username });
        if (!user) {
            return response.status(400).json({
                success: false,
                message: "User does not exist"
            });
        }

        const matchPassword = await comparePassword(password, user.password);
        if (!matchPassword) {
            return response.status(401).json({
                success: false,
                message: "Incorrect password"
            });
        }

        let token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        return response.status(200).json({
            success: true,
            data: user,
            token
        });
    } catch (error) {
        console.error('Error:', error);
        response.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};