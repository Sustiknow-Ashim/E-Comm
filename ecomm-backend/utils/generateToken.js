import Jwt from "jsonwebtoken";

const generateToken = (id) =>{
    return Jwt.sign({id}, process.env.JWT_TOKEN_SECRET, {
        expiresIn: '2d'
    })
}

export {generateToken}