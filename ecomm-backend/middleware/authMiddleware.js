import Jwt from "jsonwebtoken";
import  asyncHandler from 'express-async-handler';
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
    let token = req.headers.authorization;

    if(token && token.startsWith('Bearer')){
        
        try {
            token = token.split(' ')[1];
            const decoded = Jwt.verify(token, process.env.JWT_TOKEN_SECRET)

            req.user = await User.findById(decoded.id).select('-password')
            // req.user = decoded.id

            next();
            
        } catch (error) {
            // console.error(error)
            res.status(401)
            throw new Error('Not authorized, bad token')
        }
    }

    if(!token){
        res.status(401);
        throw Error('not authorize, no token')
    }

})

export default protect