import { useCallback } from "react"
import { useState } from "react"
import { useEffect } from "react"
import { useContext } from "react"
import { useParams } from "react-router-dom"
import { Loader } from "../../../utils/component/Loader"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { DirectorClothDetailList } from "./DirectorClothDetailList"

export const DirectorClothProduct=()=>{

    const productId = useParams().id
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const [clothProduct, setClothProduct]=useState([{}])

  
    

    const getCloth = useCallback(async () => {
        try {
          const clothProductFetched = await request(`https://morning-production-app.herokuapp.com/api/cloth/product/template/get/product/${productId}`, 'GET', null, {
            Authorization: `Bearer ${token}`
          })
          if(clothProductFetched.length===0){
            setClothProduct(null)
        }else{
             
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
        {!loading && clothProduct ? <DirectorClothDetailList dataList={clothProduct}/> : <div>Ткани продукта не найдены</div>}
        </>
    )
}