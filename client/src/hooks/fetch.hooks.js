import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

/**GET ALL BET SLIPS OF A USER */
export function useFetchBetSlips(query){
    const [ slipsData, setSlipsData ] = useState({ slipsLoading: true, slipsData: null, slipsStatus: null, slipsServerError: null })

    useEffect(() => {
        const fetchSlips = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/betting/getUserSlips`, {withCredentials: true}) : await axios.get(`/betting/getUserSlips`, {withCredentials: true})
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