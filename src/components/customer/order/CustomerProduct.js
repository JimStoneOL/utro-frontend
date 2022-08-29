import { useCallback, useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Loader } from "../../../utils/component/Loader"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { CustomerProductCard } from "./CustomerProductCard"
import { CustomerProductImage } from "./CustomerProductImage"

export const CustomerProduct=()=>{

    const productId = useParams().id
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const [product,setProduct]=useState({})

    const getProduct = useCallback(async () => {
        try {
          const fetched = await request(`https://morning-production-app.herokuapp.com/api/product/get/${productId}`, 'GET', null, {
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
        {!loading && product ? <CustomerProductImage data={product}/> : <div>Продукт не найдены</div>}
        </>
    )
}