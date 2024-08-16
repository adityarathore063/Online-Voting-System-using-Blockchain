import User from "../model/User.js";
import bcryptjs from 'bcryptjs'

export const signup = async (req,res,next) => {
    const {firstname,lastname, email, password, accountAddress} = req.body;

    let existingUser;
    try{
        existingUser = await User.findOne({email});
    }
    catch(err){
        return console.log(err);
    }

    if(existingUser){
        return res.status(400).json({message: "User Already Exist"});
    }

    const hashedPassword = bcryptjs.hashSync(password,10);
    const user = new User({
        firstname,
        lastname,
        email,
        password:hashedPassword,
        accountAddress
    });

    try{
        await user.save();
    }
    catch(err){
        return console.log(err);
    }

    return res.status(201).json({user});
}

export const signin = async (req,res,next) => {
    const {email,password} = req.body;

    let existingUser;

    try{
        existingUser = await User.findOne({email});
    }
    catch(err){
        return console.log(err);
    }

    if(!existingUser){
        return res.status(404).json({message: "User Not Exists!"})
    }

    const isPasswordCorrect = bcryptjs.compareSync(password,existingUser.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message:"Incorrect Password"});
    }

    return res.status(200).json({message:"Login Successful", user: existingUser});
}