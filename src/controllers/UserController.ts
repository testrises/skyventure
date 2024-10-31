import mongoose from "mongoose";
import  User  from "../models/User";
import { encryption } from "../helpers/encryption";

export const createUser = async (req,res) =>{
    const req_user = req.body;
    if(!req_user.username || !req_user.password|| !req_user.email)
    {
        return res.status(400).json({success:false, message:'All fields are required'})
    }

    let password = await encryption.encryptpass(req_user.password);
    
    req_user.password = password;

    const user = new User(req_user);

    try{
       const user_created =  await user.save();
        const token  = await encryption.generateToken({id:user_created._id});

        console.log(user_created._id);

        const newObj = user_created.toObject();

         delete newObj.password;
        res.status(201).json({success:true, message:"new user created",data:newObj, token:token});
    }
    catch(error)
    {
        console.log(error.message)
        res.status(400).json({success:false, message:error.message});
    }
}


export const login = async (req,res) =>{
    try {
        let { email, password } = req.body;
        if (!email || !password) {
          return res
            .status(500)
            .json({ message: " email and password required" });
        }
  
        const user = await User.findOne({ email: req.body.email });
  
        const isPasswordValid = encryption.comparepassword(user.password, password);
        if (!user || !isPasswordValid) {
          return res.status(404).json({ message: "User not found" });
        }
        const token = encryption.generateToken({ id: user.id });

        const user_new = user.toObject();

        delete user_new.password;

   
        return res.status(200).json({ message: "Login successful", data :user_new, token : token});
      } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "user not found" });
      }
}

/*export const deleteProduct = async (req,res) =>{
    const {id} = req.params;
    console.log(id);
    try{
     const pr = await Product.findById(id);
     if(!pr){ 
        res.status(400).json({success:false, message:'product not found'})
     }   
    await Product.findByIdAndDelete(id);
    res.status(200).json({success:true, message:'product deleted'})
    }
    catch(err)
    {
       res.status(400).json({success:false, message:'product not found'})
    }
  
}

export const updateProduct = async (req,res) =>{

    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        res.status(400).json({success:false, data:'not found', message:'invalid id'});
        return;
    }

  
    const prod = req.body;
    try{
    const updatedprod = await Product.findByIdAndUpdate(id, prod, {new:true})
    res.status(200).json({success:true, data:updatedprod})
    }
    catch(err)
    {
        res.status(400).json({success:false, data:'not found', message:err.message})
    }
   
   
}

export const fetchProductById = async (req,res) =>{

    const {id} = req.params;
    const prod = await Product.findById(id);
   
    res.status(200).json({success:true, data:prod})
}*/