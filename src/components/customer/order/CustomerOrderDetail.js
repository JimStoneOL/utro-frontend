import { useCallback } from "react"
import { useState } from "react"
import { useEffect } from "react"
import { useContext } from "react"
import { useParams } from "react-router-dom"
import { Loader } from "../../../utils/component/Loader"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { CustomerOrderedProductList } from "./CustomerOrderedProductList"

export const CustomerOrderDetail=()=>{

    const orderId = useParams().id
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const [orderedProduct, setOrderedProduct]=useState([{}])

    const getOrderedProduct = useCallback(async () => {
        try {
          const orderedProductFetched = await request(`http://localhost:8080/api/order/product/get/order/${orderId}`, 'GET', null, {
            Authorization: `Bearer ${token}`
          })
          if(orderedProductFetched.length===0){
            setOrderedProduct(null)
        }else{
            console.log('выполнен')
            setOrderedProduct(orderedProductFetched)
        }
          
        } catch (e) {}
      }, [token, request])
    
      useEffect(() => {
        getOrderedProduct()
      }, [getOrderedProduct])
 
      if (loading) {
        return <Loader/>
      }

    return(
        <>
        {!loading && orderedProduct ? <CustomerOrderedProductList dataList={orderedProduct}/> : <div>Заказанные продукты не найдены</div>}
        </>
    )
}