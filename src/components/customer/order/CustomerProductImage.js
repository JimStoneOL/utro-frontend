import { useCallback, useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { CustomerProductCard } from "./CustomerProductCard"

export const CustomerProductImage=({data})=>{

    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const [product,setProduct]=useState()
  
    const getImageByArticle= useCallback(async (data) => {
      try {
        const fetched = await request(`http://localhost:8080/api/image/get/product/${data.article}`, 'GET', null, {
          Authorization: `Bearer ${token}`
        })
    
       data.imageBytes=fetched.imageBytes
       setProduct(data)
    
      } catch (e) {}
    },[token,request])
    
    useEffect(()=>{
        getImageByArticle(data)
    } ,[])

    return(
        <>
            {!loading && product && <CustomerProductCard data={product}/>}
        </>
    )

}