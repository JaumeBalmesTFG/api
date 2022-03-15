// AuthController.js

const bcrypt = require('bcrypt');

// Password Rounds
const { ROUNDS } = require('../../config/config');

// Token Methods
const { generateToken } = require('../../services/token');

// Http status codes and messages
const {
    HttpStatusCode,
    HttpStatusMessage,
    ResponseMessage
} = require('../../config/status-codes');
const User = require('../../models/auth/User');

// Register Controller
exports.registerController = async function (req, res) {

    // Request Body
    let body = req.body;

    // Verify if the email exists
    const match = await User.findOne({ email: body.email });

    // If is true, we return a [409 CONFLICT] status code
    if (match) {
        return res.status(HttpStatusCode.CONFLICT).send({
            error: HttpStatusMessage.CONFLICT,
            message: ResponseMessage.EMAIL_EXISTS,
            path: req.path,
            method: req.method,
            body: body
        });
    }

    // Encrypt the password
    const hash = await bcrypt.hashSync(body.password, ROUNDS);

    if(!hash){
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
            status: HttpStatusMessage.INTERNAL_SERVER_ERROR,
            message: ResponseMessage.PASSWORD_ENCRYPTION_ERROR,
            path: req.path,
            method: req.method,
            body: body
        }); 
    }

    // Create Object
    let newUser = new User(body);

    // Store hashed password
    newUser.password = hash;

    // Generate token
    await generateToken(newUser.email, newUser._id)
        .then(function(token){
            newUser.token = token;
        })
        .catch(function(err){
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
                error: HttpStatusMessage.INTERNAL_SERVER_ERROR,
                message: ResponseMessage.TOKEN_GENERATION_ERROR,
                path: req.path,
                method: req.method,
                body: body,
            }); 
        });

    // Store user
    newUser.save(function (err, doc) {
        if(err){
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
                error: HttpStatusMessage.INTERNAL_SERVER_ERROR,
                message: ResponseMessage.DATABASE_ERROR,
                path: req.path,
                method: req.method,
                body: body,
            }); 
        }

        return res.status(HttpStatusCode.CREATED).send({
            status: HttpStatusMessage.CREATED,
            message: ResponseMessage.USER_CREATED,
            path: req.path,
            method: req.method,
            body: body,
            token: doc.token
        }); 
    });
};