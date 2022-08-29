import { useCallback, useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Loader } from "../../../utils/component/Loader"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { CustomerFurnitureDetailList } from "./CustomerFurnitureDetailList"


export const CustomerMyFurnitureProduct=()=>{

    const productId = useParams().id
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const [furnitureProduct, setFurnitureProduct]=useState([{}])

    const getFurniture = useCallback(async () => {
        try {
          const furnitureProductFetched = await request(`https://morning-production-app.herokuapp.com/api/furniture/product/get/product/${productId}`, 'GET', null, {
            Authorization: `Bearer ${token}`
          })
          if(furnitureProductFetched.length===0){
            setFurnitureProduct(null)
        }else{
             
            setFurnitureProduct(furnitureProductFetched)
        }
          
        } catch (e) {}
      }, [token, request])
    
      useEffect(() => {
        getFurniture()
      }, [getFurniture])
 
      if (loading) {
        return <Loader/>
      }

    return(
        <>
        {!loading && furnitureProduct ? <CustomerFurnitureDetailList dataList={furnitureProduct}/> : <div>Фурнитуры продукта не найдены</div>}
        </>
    )
}