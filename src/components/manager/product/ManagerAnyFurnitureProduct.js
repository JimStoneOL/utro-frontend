import { useCallback } from "react"
import { useState } from "react"
import { useEffect } from "react"
import { useContext } from "react"
import { useParams } from "react-router-dom"
import { Loader } from "../../../utils/component/Loader"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { CustomerFurnitureDetailList } from "../../customer/product/CustomerFurnitureDetailList"

export const ManagerAnyFurnitureProduct=()=>{

    const productId = useParams().id
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const [furnitureProduct, setFurnitureProduct]=useState([{}])

    const getFurniture = useCallback(async () => {
        try {
          const furnitureProductFetched = await request(`http://localhost:8080/api/furniture/product/get/any/product/${productId}`, 'GET', null, {
            Authorization: `Bearer ${token}`
          })
          if(furnitureProductFetched.length===0){
            setFurnitureProduct(null)
        }else{
            console.log('выполнен')
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
        {!loading && furnitureProduct ? <CustomerFurnitureDetailList dataList={furnitureProduct}/> : <h6 className="center" style={{marginTop:'20%'}}>Фурнитуры продукта не найдены</h6>}
        </>
    )
}