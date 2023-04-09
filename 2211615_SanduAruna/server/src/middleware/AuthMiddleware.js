import { jwt_token, statusCode } from "../utils/constants.js"
import { jsonGenerate } from "../utils/helpers.js"
import jwt from 'jsonwebtoken';


const AuthMiddleware = (req,res,next) => {
    if(req.headers['auth'] === undefined) {
        return res.json(jsonGenerate(statusCode.AUTH_ERROR, "Access denied"))
    }

    const token = req.headers['auth'];
    try {
        const decoded = jwt.verify(token,jwt_token)
        console.log(decoded)
        
        req.userId=decoded.userId;
        return next();

    } catch (error) {
        return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTITY, "Invalid token"));
    }
}; 

export default AuthMiddleware;