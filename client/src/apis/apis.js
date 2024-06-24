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
        const res = await axios.post('/auth/login', formData, {withCredentials: true})
        
        if(res.data){
            return res.data
        }
    } catch (error) {
        const errorMsg = error.response.data.data || 'Unable to Login'
        toast.error(errorMsg)
    }
}

export async function adminlogin(formData){
    try {
        const res = await axios.post('/admin/adminLogin', formData, {withCredentials: true})
        
        if(res.data){
            return res.data
        }
    } catch (error) {
        const errorMsg = error.response.data.data || 'Unable to Login'
        toast.error(errorMsg)
    }
}

export async function forgotPassword(formData){
    try {
        const res = await axios.post('/auth/forgotPassword', formData, {withCredentials: true})
        //console.log('forgot password',res)
        if(res.data){
            return res.data
        }
    } catch (error) {
        const errorMsg = error.response.data.data || 'Unable to Proccess forgot password request'
        toast.error(errorMsg)
    }
}

export async function newBetSlip(formData){
    try {
        const res = await axios.post('/betting/newBetSlip', formData, {withCredentials: true})

        if(res?.data.success){
            toast.success(res.data.data)
            window.location.reload()
            return res.data
        }
    } catch (error) {
        //console.log(error)
        const errorMsg = error.response.data.data || 'Unable to upload bet ticket slip.'
        toast.error(errorMsg)
    }
}

export async function activeBetCashback(formData){
    try {
        console.log('lop')
        const res = await axios.post('/betting/activeBetCashback', formData, {withCredentials: true})

        if(res?.data.success){
            toast.success(res.data.data)
            window.location.reload()
            return res.data
        }
    } catch (error) {
        console.log('activeBetCashback',error)
        const errorMsg = error.response.data.data || 'Unable to upload bet ticket slip.'
        toast.error(errorMsg)
        console.log(errorMsg)
    }
}

export async function deactiveBetCashback(formData){
    try {
        const res = await axios.post('/betting/deactiveBetCashback', formData, {withCredentials: true})

        if(res?.data.success){
            toast.success(res.data.data)
            window.location.reload()
            return res.data
        }
    } catch (error) {
        //console.log(error)
        const errorMsg = error.response.data.data || 'Unable to upload bet ticket slip.'
        toast.error(errorMsg)
    }
}
