"use strict";

const models = require('../models');

class Auth {
    constructor() {}

    async SipSync_Login() {
        try {
            let response = {};
            if (this.username && this.password) {
                const user = await models.Auth.findOne({ where: { email: this.username, password: this.password } });
                
                if (user) {
                    response = {
                        status: 200,
                        msg: 'Login successful',
                        data: user
                    };
                } else {
                    response = {
                        status: 401,
                        msg: 'Invalid username or password'
                    };
                }
            } else {
                response = {
                    status: 400,
                    msg: 'Username and password are required'
                };
            }
            return response;
        } catch (error) {
            console.error('Error in SipSync_Login:', error);
            return {
                status: 500,
                msg: 'Internal server error'
            };
        }
    }

    async SipSync_Register() {
        try {
            var response = {};
            
            // Check if required fields are not empty
            console.log(this.name+" "+ this.email+" "+ this.password+" "+ this.address+ " " + this.cpassword);
            if (this.name && this.email && this.address && this.password) {
                if(this.password==this.cpassword){
                    // Check if user already exists
                    const checkUserExistOrNot = await models.Auth.findOne({ where: { email: this.email } });
                    
                    if (!checkUserExistOrNot) {
                        // User does not exist, proceed with registration
                        const userData = {
                            name: this.name,
                            email: this.email,
                            address: this.address,
                            password: this.password
                        };
                        const user = await models.Auth.create(userData);
                        response={
                            'status': 201,
                            'msg' : 'User registered successfully',
                            'data': user
                        }
                    } else {
                        // User already exists
                        response={
                            'status' : 400,
                            'msg':'User already registered'
                        }
                    }
                }else{
                    response={
                        'status':400,
                        'msg':'Password mismatch'
                    }
                }
            } else {
                // Required fields are missing
                response={
                    'status' :400,
                    'msg' :'Required fields cannot be empty'
                }
            }
            console.log('====================================');
            console.log(response);
            console.log('====================================');
    
            return response;
        } catch (error) {
            console.error('Error during registration:', error);
            return {
                status: 500,
                msg: 'Internal server error'
            };
        }
    }
    
    async SipSync_Profile(){
        try{
            var response={};
            console.log(">>>>>>>"+this.email);
            if(this.email!=""){
                const user = await models.Auth.findOne({ where: { email: this.email} });
                if (user) {
                    response = {
                        status: 200,
                        msg: 'fetched successful',
                        data: user
                    };
                } else {
                    response = {
                        status: 401,
                        msg: 'User not exist!'
                    };
                }
            }else{
                response={
                    'status':400,
                    'msg':'params not found'
                }
            }
            return response;
        }catch (error) {
            console.error('Error in SipSync_Login:', error);
            return {
                status: 500,
                msg: 'Internal server error'
            };
        }
    }

    async SipSync_CheckPassword(){
        try{
            var response={};
            if(this.email!="" && this.email!=undefined){
                console.log(this.email +" "+ this.password);
                var checkUserQuery=await models.Auth.findOne({where:{email:this.email}});
                if(checkUserQuery.password == this.password){
                    if(checkUserQuery){
                        response={
                            'status':200,
                            'msg':'fetching successfull',
                            'data':checkUserQuery
                        }
                    }else{
                        response={
                            'status':400,
                            'msg':'Invalid userid!'
                        }
                    }
                }else{
                    response={
                        'status':400,
                        'msg':'Invalid password',
                    }
                }
            }else{
                response={
                    'status':400,
                    'msg':'email field can not be null'
                }
            }
            return response;
        }catch(error) {
            response={
                'status':400,
                'msg':error
            }
        }
    }
}

module.exports = Auth;
