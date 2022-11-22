
            import axios from "axios";
            import {
                useQuery,
            } from "@tanstack/react-query";
        
                export const useSignin = () => {
                    return useQuery({
                        queryKey: ["signin"],
                        queryFn: async () => {
                            const { data } = await axios.post("https://google.com/auth/signin",
                            {email:"user@gmail.com",
                    password:"abc123",
                    },
                            {
                                headers: {
                                    "Content-Type": "aplication/json",
                                    Authorization: "Bearer "+TOKEN
                                }
                            })
                            return data
                        }
                    })
                }
                export const useSignup = () => {
                    return useQuery({
                        queryKey: ["signup"],
                        queryFn: async () => {
                            const { data } = await axios.post("https://google.com/auth/signup",
                            {name:"User Name",
                    email:"user@gmail.com",
                    password:"abc123",
                    },
                            {
                                headers: {
                                    "Content-Type": "aplication/json",
                                    Authorization: "Bearer "+TOKEN
                                }
                            })
                            return data
                        }
                    })
                }