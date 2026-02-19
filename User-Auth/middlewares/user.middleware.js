import jwt from 'jsonwebtoken';

export async function requireSignin(req, res, next) {
    try {
        let decode = jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY);
        if (!decode) {
            return res.send({ message: "Unauthrized req" });
        } else {
            req.user = decode;
            next();
        }
    } catch (error) {
        console.log(error);
    }
}