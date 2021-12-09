if(process.env.NODE_ENV !=='production'){
    require('dotenv').config()
}
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
//const passport = require("passport")

const userRegister = async (req,res)=>{
    let {email,password} = req.body
    try{
        
        const user = await User.findOne({email:email});
        if(user){
            console.log("Email already in use")
            res.json({status:'fail'})
        }
        else{
            password = await bcrypt.hash(password,12)
            const response = await User.create({
                email,
                password
            })
            await response.save();
            console.log('User created successfully: ', response)
            res.json({status:'ok'})

        }
    
    }
    catch(err){
        if (err.code === 500){
            return res.json({status: 'error', error:'Oops something went wrong, Please try again'})
        }
        throw err
    }
}

const userLogin =  async (req,res)=>{
    let {email,password} = req.body;
    const SECRET = process.env.SECRET;
    const user = await User.findOne({email});
    if (!user){
        console.log("User not found");
        res.json({status:'fail, user not found'});

    
    }

    let matchpass = await bcrypt.compare(password,user.password);
    if(matchpass){
        let token = jwt.sign({
            userID: user._id,
            email: user.email,
            
        },
       SECRET,
        {expiresIn: "3 days"},
        )
        let result ={
            userID: user._id,
            email: user.email,
            token: `Bearer ${token}`,
            expiresIn: 72,
        };
        res.json({
            ...result,
            status:'success, you are logged in'});

    }
    else{
        res.json({
            status:'fail, incorrect password'
        });
    }

}

const dbUsers = async (req,res) =>{
    //Here fetch data using mongoose query like
    User.find({}, function(err, users) {
    if (err) throw err;
    // object of all the users
    res.json(users);
    
  });

}

const delDBUsers = async (req,res) =>{

}


module.exports ={
    userRegister,
    userLogin,
    dbUsers,
    delDBUsers
};