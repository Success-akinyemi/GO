import axios from 'axios'
import { useEffect, useState } from 'react'

/**GET ALL BET SLIPS OF A USER */
export function useFetchBetSlips(query){
    const [ slipsData, setSlipsData ] = useState({ slipsLoading: true, slipsData: null, slipsStatus: null, slipsServerError: null })

    useEffect(() => {
        const fetchSlips = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/betting/getUserSlips`, {withCredentials: true}) : await axios.get(`/betting/getUserSlip/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data)

                if(status === 200){
                    setSlipsData({ slipsLoading: false, slipsData: data, slipsStatus: status, slipsServerError: null})
                } else{
                    setSlipsData({ slipsLoading: false, slipsData: null, slipsStatus: status, slipsServerError: null})
                }
            } catch (error) {
                setSlipsData({ slipsLoading: false, slipsData: null, slipsStatus: null, slipsServerError: error})
            }
        }
        fetchSlips()
    }, [query])

    return slipsData
}

/**GET BET POINTS OF A USER */
export function useFetchBetPoint(query){
    const [ betPointsData, setBetPointsData ] = useState({ betPointsLoading: true, betPointsData: null, betPointsStatus: null, betPointsServerError: null })

    useEffect(() => {
        const fetchBetPoints = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/betting/getBetPoint`, {withCredentials: true}) : await axios.get(`/betting/getBetPoint`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data)

                if(status === 200){
                    setBetPointsData({ betPointsLoading: false, betPointsData: data, betPointsStatus: status, betPointsServerError: null})
                } else{
                    setBetPointsData({ betPointsLoading: false, betPointsData: null, betPointsStatus: status, betPointsServerError: null})
                }
            } catch (error) {
                setBetPointsData({ betPointsLoading: false, betPointsData: null, betPointsStatus: null, betPointsServerError: error})
            }
        }
        fetchBetPoints()
    }, [query])

    return betPointsData
}

/**GET ALL BET SLIPS */
export function useFetchAllBetSlips(query){
    const [ slipsData, setSlipsData ] = useState({ slipsLoading: true, slipsData: null, slipsStatus: null, slipsServerError: null })

    useEffect(() => {
        const fetchSlips = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/betting/getAllSlips`, {withCredentials: true}) : await axios.get(`/betting/getAllSlips`, {query: query}, {withCredentials: true})
                //console.log('Data from Hooks>>>', query)

                if(status === 200){
                    setSlipsData({ slipsLoading: false, slipsData: data, slipsStatus: status, slipsServerError: null})
                } else{
                    setSlipsData({ slipsLoading: false, slipsData: null, slipsStatus: status, slipsServerError: null})
                }
            } catch (error) {
                setSlipsData({ slipsLoading: false, slipsData: null, slipsStatus: null, slipsServerError: error})
            }
        }
        fetchSlips()
    }, [query])

    return slipsData
}

/**GET ALL USERS */
export function useFetchAllUsers(query){
    const [ allUsersData, setAllUsersData ] = useState({ allUsersLoading: true, allUsersData: null, allUsersStatus: null, allUsersServerError: null })

    useEffect(() => {
        const fetchSlips = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/user/getAllUsers/`, {withCredentials: true}) : await axios.get(`/user/getAllUser/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data)

                if(status === 200){
                    setAllUsersData({ allUsersLoading: false, allUsersData: data, allUsersStatus: status, allUsersServerError: null})
                } else{
                    setAllUsersData({ allUsersLoading: false, allUsersData: null, allUsersStatus: status, allUsersServerError: null})
                }
            } catch (error) {
                setAllUsersData({ allUsersLoading: false, allUsersData: null, allUsersStatus: null, allUsersServerError: error})
            }
        }
        fetchSlips()
    }, [query])

    return allUsersData
}

/**GET ALL USERS */
export function useFetchUserAllTransactions(query){
    const [ allTransactions, setAllTransactions ] = useState({ transactionLoading: true, transactionData: null, transactionStatus: null, transactionServerError: null })

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/user/getAllUserNotification`, {withCredentials: true}) : await axios.get(`/user/getAllUserNotification`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data)

                if(status === 200){
                    setAllTransactions({ transactionLoading: false, transactionData: data, transactionStatus: status, transactionServerError: null})
                } else{
                    setAllTransactions({ transactionLoading: false, transactionData: null, transactionStatus: status, transactionServerError: null})
                }
            } catch (error) {
                setAllTransactions({ transactionLoading: false, transactionData: null, transactionStatus: null, transactionServerError: error})
            }
        }
        fetchTransactions()
    }, [query])

    return allTransactions
}