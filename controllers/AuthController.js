const Auth = require('../class/class.auth');
const models=require('../models');
const auth = new Auth();

async function Login(req,res){
    const username=req.body.username??'';
    const password=req.body.password??'';

    if(username!="" && password !=""){
        auth.username=username;
        auth.password=password;
        const login = await auth.SipSync_Login();
        res.status(200).json(login);
    }else{
        res.status(400).json({
            'status':400,
            'msg':'Required field can not be empty'
        })
    }
}

async function register(req,res){
    const name=req.body.name??'';
    const email=req.body.email??'';
    const address=req.body.address??'';
    const password=req.body.password??'';
    const cpassword=req.body.cpassword??'';

    auth.name=name;
    auth.email=email;
    auth.address=address;
    auth.password=password;
    auth.cpassword=cpassword;
    const register = await auth.SipSync_Register();

    res.status(200).json(register);
}

async function getProfile(req, res) {
    const email = req.params.email;
    console.log(email);
    auth.email=email??'';
    const getProfile= await auth.SipSync_Profile();
    res.status(200).json(getProfile);
}

async function checkPassword(req,res){
    auth.email=req.body.email;
    auth.password=req.body.password;
    console.log(req.body.password);
    const checkUser=await auth.SipSync_CheckPassword();
    res.status(200).json(checkUser);
}

module.exports={
    Login:Login,
    register:register,
    getProfile:getProfile,
    checkPassword:checkPassword
};