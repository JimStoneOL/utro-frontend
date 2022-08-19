import { useCallback, useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Loader } from "../../../utils/component/Loader"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { ManagerAnyClothDetailList } from "./ManagerAnyClothDetailList"

export const ManagerAnyClothProduct=()=>{

    const productId = useParams().id
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const [clothProduct, setClothProduct]=useState([{}])

    const getCloth = useCallback(async () => {
        try {
          const clothProductFetched = await request(`http://localhost:8080/api/cloth/product/get/any/product/${productId}`, 'GET', null, {
            Authorization: `Bearer ${token}`
          })
          if(clothProductFetched.length===0){
            setClothProduct(null)
        }else{
            console.log('выполнен')
            setClothProduct(clothProductFetched)
        }
          
        } catch (e) {}
      }, [token, request])
    
      useEffect(() => {
        getCloth()
      }, [getCloth])

    
      
      if (loading) {
        return <Loader/>
      }

    return(
        <>
        {!loading && clothProduct ? <ManagerAnyClothDetailList dataList={clothProduct}/> : <div>Ткани продукта не найдены</div>}
        </>
    )
}