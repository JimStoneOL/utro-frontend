import { useCallback, useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { CustomerFurnitureCard } from "./CustomerFurnitureCard"


export const CustomerFurnitureImage=({data})=>{

    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const [furniture,setFurniture]=useState()
  
    const getImageByArticle= useCallback(async (data) => {
      try {
        const fetched = await request(`http://localhost:8080/api/image/get/furniture/${data.article}`, 'GET', null, {
          Authorization: `Bearer ${token}`
        })
    
       data.imageBytes=fetched.imageBytes
        setFurniture(data)
    
      } catch (e) {}
    },[token,request])
    
    useEffect(()=>{
        getImageByArticle(data)
    } ,[])

    return(
        <>
            {!loading && furniture && <CustomerFurnitureCard data={furniture}/>}
        </>
    )
}