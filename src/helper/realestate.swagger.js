exports.realEstates ={
    "/realestate/":{
        post:{
            tags:["RealEstate"],
            requestBody:{
                content:{
                    "application/json":{
                        schema:{
                            type:"object",
                            properties:{
                                province:{
                                    type:"string",
                                    example:"Northern province",
                                    description:"province of estate"
                                },
                                district:{
                                    type:"string",
                                    example:"Gakenke",
                                    description:"district of estate"
                                },
                                street:{
                                    type:"string",
                                    example:"KN 45 st",
                                    description:"Street of the building"
                                },
                                price:{
                                    type:Number,
                                    example:8900000.78,
                                    description:"district of estate"
                                },
                                beds:{
                                    type:Number,
                                    example:6,
                                    description:"How many beds are in the building"
                                },
                                bath:{
                                    type:Number,
                                    example:2,
                                    description:"How many bath are in the building"
                                },
                                year_built:{
                                    type:Number,
                                    example:1999,
                                    description:"When was it built?"
                                },
                                lot_size:{
                                    type:"string",
                                    example:"Gakenke",
                                    description:"district of estate"
                                },
                                status:{
                                    type:"string",
                                    example:"Gakenke",
                                    description:"district of estate"
                                },
                                description:{
                                    type:"string",
                                    example:"Gakenke",
                                    description:"Can you describe it please"
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
    }
}