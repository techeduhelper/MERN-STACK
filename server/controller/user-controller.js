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
        const username = request.body.username;
        const password = request.body.password;

        let user = await User.findOne({ username: username });
        const matchPassword = await comparePassword(password, user.password)
        if (!matchPassword) {
            return response.status(401).send({
                success: false,
                message: "Incorrect Password"
            })
        }
        let token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        if (user) {
            return response.status(200).json({ data: user, token });
        } else {
            return response.status(401).json('Invalid login');
        }

    } catch (error) {
        response.status(500).json('Error', error.message);

    }

}
