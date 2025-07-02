import jwt from 'jsonwebtoken';  // Importing JWT for token verification

// Checking user authentication using token
const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;  // Getting token from request headers

    if (!token) {
        return res.json({ success: false, message: 'Not Authorized Login Again' });  // Sending error if no token
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);  // Verifying token with secret
        req.body.userId = token_decode.id;  // Attaching user ID to request body
        next();  // Moving to next middleware or route
    } catch (error) {
        return res.json({ success: false, message: error.message });  // Sending error if token invalid
    }
}

export default authMiddleware;  // Exporting middleware function
