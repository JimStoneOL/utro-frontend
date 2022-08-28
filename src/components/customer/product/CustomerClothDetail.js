import { useCallback, useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { CustomerClothDetailCard } from "./CustomerClothDetailCard"


export const CustomerClothDetail=({data})=>{

    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const [cloth,setCloth]=useState()
  
    const getImageByArticle= useCallback(async (data) => {
      try {
        const fetched = await request(`http://localhost:8080/api/image/get/cloth/${data.article}`, 'GET', null, {
          Authorization: `Bearer ${token}`
        })
    
       data.imageBytes=fetched.imageBytes
        setCloth(data)
    
      } catch (e) {}
    },[token,request])
    
    useEffect(()=>{
        getImageByArticle(data)
    } ,[])

    return(
        <>
            {!loading && cloth && <CustomerClothDetailCard data={cloth}/>}
        </>
    )
}