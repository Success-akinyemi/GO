import axios from 'axios'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL

export async function regieterUsers(formData){
    try {
        const res = await axios.post('/auth/register', formData)
        if(res.data.success){
            return res.data
        }
    } catch (error) {
        //console.log(error)
        const errorMsg = error.response.data.data || 'Unable to register user'
        //console.log(errorMsg)
        toast.error(errorMsg)
    }
}

export async function verifyUser({ id, token}){
    try {
        const res = await axios.post(`/auth/${id}/verify/${token}`)
        if(res.data.success){
            toast.success('Email Verified')
            return res
        }
    } catch (error) {
        const errorMsg = error.response.data.data || 'Unable to Verify Account'
        toast.error(errorMsg)
    }
}

export async function loginUsers(formData){
    try {
        const res = await axios.post('/auth/login', formData,)
        
        if(res.data){
            return res.data
        }
    } catch (error) {
        console.log('ERROR LOGIN', error)
        const errorMsg = error.response.data.data || 'Unable to Login'
        toast.error(errorMsg)
    }
}

export async function forgotPassword(formData){
    try {
        const res = await axios.post('/auth/forgotPassword', formData,)
        console.log('forgot password',res)
        if(res.data){
            return res.data
        }
    } catch (error) {
        const errorMsg = error.response.data.data || 'Unable to Proccess forgot password request'
        toast.error(errorMsg)
    }
}