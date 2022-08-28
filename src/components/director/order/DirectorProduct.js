import { useCallback } from "react"
import { useState } from "react"
import { useEffect } from "react"
import { useContext } from "react"
import { useParams } from "react-router-dom"
import { Loader } from "../../../utils/component/Loader"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { DirectorProductImage } from "./DirectorProductImage"

export const DirectorProduct=()=>{

    const productId = useParams().id
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const [product,setProduct]=useState({})

    const getProduct = useCallback(async () => {
        try {
          const fetched = await request(`http://localhost:8080/api/product/get/any/${productId}`, 'GET', null, {
            Authorization: `Bearer ${token}`
          })
          
          setProduct(fetched)

        } catch (e) {}
        
      }, [token, request])
    
      useEffect(() => {
        getProduct()
      }, [getProduct])
 
      if (loading) {
        return <Loader/>
      }

    return(
        <>
        {!loading && product ? <DirectorProductImage data={product}/> : <div>Продукт не найдены</div>}
        </>
    )
}