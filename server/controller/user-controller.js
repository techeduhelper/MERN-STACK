import User from '../model/user-schema.js';
import  JWT  from 'jsonwebtoken';


export const userSignup = async (request, response) => {
    try {
       
        const exist = await User.findOne({ username: request.body.username });
        if (exist) {
            return response.status(401).json ({ message: 'Username already exist' });
        }  
                 
        const user = request.body;
        const newUser = new User(user);
        await newUser.save();

        response.status(200).json({ message: user });
    }catch (error) {
        response.status(500).json({ message: error.message });
    }

}

export const userLogin = async (request,response) => {
    try{
        const username = request.body.username;
        const password = request.body.password;

        let user = await User.findOne({ username: username, password: password });
        let token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        if (user) {
            return response.status(200).json({ data: user, token});
        } else {
            return response.status(401).json('Invalid login');
        }

    } catch (error) {
        response.status(500).json('Error', error.message);

    }

}
