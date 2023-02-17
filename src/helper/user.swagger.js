exports.UserDocs={
    "/user/signup": {
        post:{
            tags:["User"],
            security:[
                {
                    token:[]
                }
            ],
            requestBody:{
                content:{
                    "application/json": {
                        schema: {
                            type:"object",
                            properties:{
                                username:{
                                    type:"String",
                                    description:"Your username",
                                    example:"saveur12",
                                    required:true
                                },
                                email:{
                                    type:"String",
                                    description:"Your Email address",
                                    title:"Email address",
                                    example:"bikorimanaxavier@gmail.com"
                                },
                                password:{
                                    type:"String",
                                    description:"Strong Password",
                                    example:"saveur",
                                    title:"Your Password"
                                }
                            }
                        }
                    }
                }
            },
            responses:{
                200:{
                    description:"Response body for Signup page",
                    content:{
                        "application/json" : {
                                type:"object",
                                example:{
                                    message:"User was added successfully",
                                    token:"",
                                    userData:{}
                                }
                         }
                    }
                }
            }
        }
    },
    "/user/login" : {
        post:{
            tags:["User"],
            description:"Login Form for Users",
            requestBody:{
                description:"Login Request Example",
                content:{
                    "application/json":{
                        schema:{
                            type:"object",
                            properties:{
                                email:{
                                    type:"String",
                                    description:"Type Your Login Email address",
                                    title:"your Email address",
                                    example:"bikorimana@gmail.com"
                                },
                                password:{
                                    type:"String",
                                    description:"Type Your given Password",
                                    example:"saveur"
                                }
                            }
                        }
                    }
                }
            },
            responses:{
                200:{
                    description:"Successfully Login Example",
                    content:{
                        "application/json" :{
                            type:"object",
                            example:[{
                                message: "Login successfully",
                                token: "",
                                userData:{}
                            }
                        ]
                        }
                    }
                },
                401:{
                    description:"Login Failed Example",
                    content:{
                       "application/json":{
                        type:"object",
                        example:{
                            message: "Authentication failed"
                        }
                       }
                    }                
                }
            }
        }
    },
    "/user" : {
        get:{
            tags:["User"],
            description:"List of all users",
            parameters: [
                {
                    in:"query",
                    name:"page",
                    type:Number,
                    required:false,
                    description:"Enter Page Number"
                },
                {
                    in:"query",
                    name:"data_per_page",
                    type:Number,
                    required:false,
                    description:"Enter Data To be on One page"
                }
            ],
            security:[
                {
                    token:[]
                }
            ],
            responses: {
                200: {
                description:"OK",
                content: {
                    "applicatin/json": {
                        schema: {
                            type:"object",
                            example: {
                                status:"success",
                                count:0,
                                user:[

                                ]
                            }                                    
                        }
                    }

                }
                }
            }
        }
    },
    "/user/{user_id}":{
        get:{
            tags:["User"],
            description:"Get Single User Using Id",
            parameters:[{
              in:"path",
              name:"user_id",
              type:"String",
              title:"Type in User Id",
              description:"Fetch user by using id",
              required:true,
              example:"63da9eb9db47ce0c7f205d6f"
            }],
            responses:{
                200:{
                    content:{
                        "application/json":{
                            type:"object",
                            example:{
                                _id: "63d90a40ef529fd533f8edf4",
                                username: "bikorimana",
                                email: "bikorimana@gmail.com",
                                password: "$2b$10$aMtqmQvrf5ogVJU9vIk4oOZFcO1Jt6Zgup7bJZ6jR/k8dlb4KGZjO",
                                active: true,
                            }
                        }
                    }
                }
            }
        }
    },
    "/user/{update_id}" : {
        put:{
            tags:["User"],
            parameters:[{
                in:"path",
                type:"String",
                required:true,
                name:"update_id",
                description:"Enter Id for updatation"
            }],
            security:[
                {
                    token:[]
                }
            ],
            requestBody:{
                content:{
                    "application/json" : {
                        schema:{
                            type:"object",
                            properties:{
                                username:{
                                    type:"String",
                                    required:true,
                                    description:"update username",
                                    example:"Saveur"
                                },
                                email:{
                                   type:"String",
                                   required:true,
                                   description:"Update your Email",
                                   example:"bikorimana@gmail.com"
                                },
                                password:{
                                    type:"String",
                                    required:true,
                                    description:"change your password",
                                    example:"hello@123"
                                },
                                active: {
                                    type:Boolean,
                                    required:true,
                                    description:"What is user status",
                                    example:"true"
                                }
                            }
                        }
                    }
                }
            },
            responses:{
                201:{
                    description:"Update User response example",
                    content:{
                        "application/json" : {
                            type:"object",
                            example:{
                                message:"User Info Is updated successfully",
                                request:{
                                    type:"GET",
                                    url:process.env.BLOG_URL+"/user/63d90a40ef529fd533f8edf4"
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "/user/{delete_id}":{
        delete:{
            tags:["User"],
            description:"Delete single user",
            parameters:[{
                in:"path",
                name:"delete_id",
                type:"String",
                description:"Delete single user",
                required:true,
                example:"63da9eb9db47ceic7f205d6o"
            }],
            security:[
                {
                    token:[]
                }
            ],
            responses:{
                200:{
                    description:"Delete user example response",
                    content:{
                        "application/json":{
                            type:"object",
                            example:{
                               message: "User deleted successfully"
                            }
                        }
                    }
                }
            }
        }
    }
}