import axios from "axios"
import * as Config from "../../Utils/Config";

export const LoginPage=async(data)=>{
    try{
        const res =  await axios.post(`${Config.base_url}login`, data)
        return res?.data
    }
    catch(err){
        return err
    }

}

export const ForgotPassword=async(data)=>{
    try{
        const res =  await axios.post(`${Config.base_url}Resetpass`, data)
        return res?.data
    }
    catch(err){
        return err
    }
}


export const PasswordChange=async(data)=>{
    const token = localStorage.getItem('token')

    try{
        const res =  await axios.post(`${Config.base_url}forgetpass`, data , 
            {
                headers: { 
                  'Content-Type': 'application/json', 
                  'Authorization': `Bearer ${token}`
            }})
        return res?.data
    }
    catch(err){
        return err
    }

}

export const RegistorUser=async(data)=>{
    try{
        const res =  await axios.post(`${Config.base_url}Signup`, data)
        return res?.data
    }
    catch(err){
        return err
    }

}