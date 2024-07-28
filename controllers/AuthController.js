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

module.exports={
    Login:Login,
    register:register
};