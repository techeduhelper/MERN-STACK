import mongoose from "mongoose";


export const connection = async(username, password) => {
    const URL = `mongodb+srv://ramugoyal091:Bimpg%401287@mongodbtutorial.wsvgkfx.mongodb.net/`;    
    try { 
       await mongoose.connect(URL, {useUnifiedTopology:true, useNewUrlParser: true })
       console.log('Database connected Successfully');
    } catch (error) {
        console.log('while error is connecting with database', error.message);
    }
}

export default connection