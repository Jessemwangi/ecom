import { useEffect, useState } from "react"
import { makeRequest } from "../Utility/functions"

const UseFetch = (url) =>{

    const [data, setData] =useState([])
    const [loading, setLoading] =useState(false)
    const [error, setError] =useState(false)

useEffect(() => {
    const getProducts = async() =>{
      try {
        setLoading(true)
        const {data} =await makeRequest.get(url)
        setData(data.data)
        setLoading(false)
        // console.log(data);
      
      } catch (error) {
        console.log(error)
        setError(true)
        setLoading(false)
      }
        } 
    getProducts()
  },[url])
  return {data,loading, error}
      } 

 export default UseFetch