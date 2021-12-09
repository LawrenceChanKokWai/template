const router = require("express").Router();

const {userSignupValidator} = require ("../middlewares/validators/auth")
const {runValidation} = require("../middlewares/validators")

const {
    userRegister,
    userLogin,
    dbUsers,
    delDBUsers
} = require("../controllers/Auth");

router.post('/register',userSignupValidator,runValidation, async (req,res)=>{
    await userRegister(req,res);
});

router.post('/login', userSignupValidator,runValidation, async (req,res)=>{
    await userLogin(req,res);
});

router.get('/users', async (req,res)=>{
    await dbUsers(req,res);
});



module.exports = router;