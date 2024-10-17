const UserModel = require("../models/UserModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

var jwtSecret = process.env.ACCESS_TOKEN_SECRET;

exports.createUser = (req, res, next) => {
    
    if (req.body._id == null || req.body._id == "null") {
        saveUser(req, res, next);
    } else {
        updateUser(req, res, next);
    }
};

async function saveUser(req, res, next) {

    try{
        var password = req.body.password;
        var hashedPassword = await hashPassword(password);
        var ifUserAlreadyExist = await UserModel.find({phone: req.body.phone}).exec();
        if(ifUserAlreadyExist.length > 0){
            return res.json({
                status: false,
                message: "User already exist",
                title: "error"
            })
        }
        let data = new UserModel({ 
            name:           req.body.name,
            lastName:       req.body.lastName,
            loginMode:      req.body.loginMode,
            profileImg:     req.body.profileImg,
            email:          req.body.email,
            phone:          req.body.phone,
            password:       hashedPassword
        });
        data.save()
        .then(async (info) => {
            return res.json({
                status: true,
                data: info,
                message: "User created!",
                title: "success"
            })
        }).catch((err) => {
            return res.json({
                status: false,
                data: err,
                message: "Something went wrong!",
                title: "error"
            })
        });
    }catch(err) {
        return res.json({
            status: false,
            data: err,
            message: "Something went wrong in catch block!",
            title: "error"
        })
    }
    
}

async function updateUser(req, res, next) {

}

exports.getUserInfo = async (req, res, next) =>   {
    try{
        var userData = await UserModel.find();

        return res.json({
            status: true,
            data: userData,
            message: "Successful!",
            title: "success"
        }) ;
    } catch(err) {
        return res.json({
            status: false,
            data: err,
            message: "Something went wrong in catch block!",
            title: "error"
        })
    }
    
}

exports.loginUser= async (req, res, next) =>   {
    var password = req.body.password;
    var phoneNo = req.body.phoneNo;
    
    try {
      var userData = await UserModel.findOne({phone: phoneNo}).exec();

      const isPasswordValid = await comparePassword(password, userData["password"]);
  
      if (!isPasswordValid) {
        return res.json({
            status: false,
            message: "Wrong password. Try again",
            title: "error"
        })
      }
  
      // Password is valid, generate JWT
      const payload = userData.toObject(); // This can include more user details as needed
      const token = generateToken(payload);
      return res.json({
        status: true,
        data: payload,
        token: token,
        message: "Successful!",
        title: "success"
    }) ;
    } 
    catch(err) {
        return res.json({
            status: false,
            data: err,
            message: "Something went wrong in catch block!",
            title: "error"
        })
    }
  }

async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

async function comparePassword(plainPassword, hashedPassword) {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
}

function generateToken(payload) {
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' }); // Token expires in 1 hour
    return token;
}