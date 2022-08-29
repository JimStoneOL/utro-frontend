import { useCallback, useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { ManagerClothDetailCard } from "./ManagerClothDetailCard"


export const ManagerClothDetail=({data})=>{

    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const [cloth,setCloth]=useState()
  
    const getImageByArticle= useCallback(async (data) => {
      try {
        const fetched = await request(`https://morning-production-app.herokuapp.com/api/image/get/cloth/${data.article}`, 'GET', null, {
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
            {!loading && cloth && <ManagerClothDetailCard data={cloth}/>}
        </>
    )
}