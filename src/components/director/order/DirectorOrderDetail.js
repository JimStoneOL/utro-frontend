import { useCallback, useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Loader } from "../../../utils/component/Loader"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { DirectorOrderedProductList } from "./DirectorOrderedProductList"

export const DirectorOrderDetail=()=>{

    const orderId = useParams().id
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const [orderedProduct, setOrderedProduct]=useState([{}])

    const getOrderedProduct = useCallback(async () => {
        try {
          const orderedProductFetched = await request(`https://morning-production-app.herokuapp.com/api/order/product/get/any/order/${orderId}`, 'GET', null, {
            Authorization: `Bearer ${token}`
          })
          if(orderedProductFetched.length===0){
            setOrderedProduct(null)
        }else{
             
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
        {!loading && orderedProduct ? <DirectorOrderedProductList dataList={orderedProduct}/> : <h6 className="center" style={{marginTop:'20%'}}>Заказанные продукты не найдены</h6>}
        </>
    )
}