exports.blogDocs={
    "/blogs/create":{
        post:{
            tags:["Blog"],
            security:[
                {
                token:[]
                }
            ],
            requestBody:{
                content:{
                    "multipart/form-data":{
                        schema:{
                            type:"object",
                            properties:{
                                title:{
                                    type:"string",
                                    description:"Type in Blog Title",
                                    example:"Coding Can be fun!"
                                },
                                body:{
                                    type:"object",
                                    description:"Blog Main text",
                                    example:"This can contain more than on paragraph"
                                },
                                user:{
                                    type:"string",
                                    description:"Id of user who post",
                                    example:"63d90a40ef529fd533f8edf4"
                                },
                                blogImage:{
                                    type:"file",
                                    description:"Optional Blog image"
                                }
                            }
                        }
                    }
                }
            },
            responses:{
                200:{
                    description:"This is example of response",
                    content:{
                        "application/json" : {
                            type:"object",
                            example:{
                                message:"Created New Post successfully",
                                created_blog:{}
                            }
                        }
                    }
                }
            }
        }
    },
    "/blogs" :{
        get:{
            tags:["Blog"],
            responses:{
                200:{
                    description:"Example of Blogs Response",
                    content:{
                        "application/json":{
                            type:"object",
                            example:{
                                counted:1,
                                result:[
                                    {
                                        _id: "63d9260842ad8f0dfbe21e85",
                                        title: "Learn html and css in 5 minutes",
                                        body: "I have been doing a research on how one can learn html or css in 5 minutes and what i have found is interesting because i found that it is possible if you are committed",
                                        user: "63d90a40ef529fd533f8edf4",
                                        createdAt: "2023-01-31T14:30:32.526Z",
                                        updatedAt: "2023-01-31T14:30:32.526Z",
                                        request: {
                                          type: "GET",
                                          url: "http://localhost:6700/63d9260842ad8f0dfbe21e85"
                                        }
                                    }
                                ],
                            }
                        }
                    }
                }
            }
        }
    },
    "/blogs/{blog_id}":{
        get:{
            tags:["Blog"],
            parameters:[{
                in:"path",
                type:"String",
                description:"Type in Blog id",
                example:"63d927b7074cc281c164df6c",
                name:"blog_id",
                required:true
            }],
            responses:{
                200:{
                    content:{
                        "application/json":{
                            type:"object",
                            example:{
                                _id: "63d927b7074cc281c164df6c",
                                title: "Create your own blog in 1h without worrying about coding",
                                body: "did you know that you can create your blog without coding . its easy don't shy away just signup on my website",
                                user: "63d90a40ef529fd533f8edf4",
                                createdAt: "2023-01-31T14:37:43.210Z",
                                updatedAt: "2023-01-31T14:37:43.210Z",
                                request: {
                                    type: "GET",
                                    url: process.env.BLOG_URL+"/63d927b7074cc281c164df6c"
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "/blogs/update/{update_id}" : {
        put:{
            tags:["Blog"],
            parameters:[{
                in:"path",
                name:"update_id",
                description:"Blog id to Update",
                required:true,
                example:"63d9260842ad8f0dfbe21e85",
                type:"string"
            }],
            security:[
                {
                token:[]
                }
            ],
            requestBody:{
                content:{
                    "multipart/form-data":{
                        schema:{
                            type:"object",
                            properties:{
                                title:{
                                    type:"string",
                                    description:"Title of blog",
                                    example:"Five method to learn better"
                                },
                                body:{
                                    type:"object",
                                    description:"text description of title",
                                    example:"You can learn better by implementing the following five method..."
                                },
                                user:{
                                    type:"string",
                                    description:"id of user who inserted blog",
                                    example:"63d90a40ef529fd533f8edf4"
                                },
                                blogImage:{
                                    type:"file",
                                    description:"Blog Image representation"
                                }
                            }
                        }
                    }
                }
            },
            responses:{
                200:{
                    content:{
                        "application/json" : {
                            type:"object",
                            example:{
                                message:"Blog updated successfully",
                                request:{}
                            }
                        }
                    }
                }
            }
        }
    },
    "/blogs/delete/{delete_id}":{
        delete:{
            tags:["Blog"],
            security:[
                {
                token:[]
                }
            ],
            parameters:[{
                in:"path",
                required:true,
                name:"delete_id",
                description:"Blog Id to delete",
                example:"63d9260842ad8f0dfbe21e85"
            }],
            responses:{
                200:{
                    content:{
                        "application/json" :{
                            type:"object",
                            example:{
                                message:"Post has been deleted successfully",
                                request: {}
                            }
                        }
                    }
                }
            }
        }
    },
    "/blogs/likes":{
        post:{
            tags:["Blog"],
            security:[
                {
                    token:[]
                }
            ],
            requestBody:{
                description:"required fields",
                content:{
                    "application/json":{
                        schema:{
                            type:"object",
                            properties:{
                                blog_id:{
                                    type:"String",
                                    description:"Id of blog to Like",
                                    example:"63d90a40ef529fd533f8edf4",
                                    required:true
                                },
                                like:{
                                    type:Number,
                                    description:"like value are 1 or -1",
                                    example:1,
                                    required:true
                                }
                            }
                        }
                    }
                }
            },
            responses:{
                200:{
                    content:{
                        "application/json":{
                            type:"object",
                            example:{
                                status:"success",
                                message:""
                            }
                        }
                    }
                }
            }
        }
    },
    "/blogs/likes/{blog_id}":{
        get:{
            tags:["Blog"],
            parameters:[{
               in:"path",
               type:"string",
               name:"blog_id",
               example:"63e4fd5d938843dc4218f839",
               required:true,
               description:"get all likes on a single blog"
            }],
            responses:{
                200:{
                    content:{
                        "application/json":{
                            type:"object",
                            example:{
                                status:"success",
                                likes_number:0
                            }
                        }
                    }
                }
            }
        }
    },
    "/blogs/comment/create":{
        post:{
            tags:["Blog"],
            security:[
                {
                    token:[]
                }
            ],
            requestBody:{
                description:"Make Comment on this blog post",
                content:{
                    "application/json":{
                        schema:{
                            type:"object",
                            properties:{
                                blog_id:{
                                    type:"String",
                                    description:"Id of comment to put comment to!",
                                    example:"63d90a40ef529fd533f8edf4",
                                    required:true
                                },
                                comment:{
                                    type:"String",
                                    description:"You comment on blog",
                                    example:"This is my body comment on this blog",
                                    required:true
                                }
                            }
                        }
                    }
                }
            },
            responses:{
                200:{
                    content:{
                        "application/json":{
                            type:"object",
                            example:{
                                status:"success",
                                message:""
                            }
                        }
                    }
                }
            }
        }
    },
    "/blogs/comment/{blog_id}":{
        get:{
            tags:["Blog"],
            parameters:[{
                in:"path",
                type:"string",
                required:true,
                name:"blog_id",
                example:"63d9260842ad8f0dfbe21e85"
            }],
            responses:{
                200:{
                    description:"Response Example",
                    content:{
                        "application/json":{
                            type:"object",
                            example:{
                                count:0,
                                coments:[]
                            }
                        }
                    }
                }
            }
        }
    }
}