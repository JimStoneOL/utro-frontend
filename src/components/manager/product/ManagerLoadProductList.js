import { useCallback } from "react"
import { useContext } from "react"
import { useEffect, useState } from "react"
import { Loader } from "../../../utils/component/Loader"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { ManagerProductFilter } from "./ManagerProductFilter"
import {ManagerProductContext} from './ManagerProductContext'

export const ManagerLoadProductList=()=>{

    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const [productData, setProductData]=useState([])
 
    const getAllProducts = useCallback(async () => {
       ('zalipa')
     try {
       const fetched = await request('https://morning-production-app.herokuapp.com/api/product/template/get/all', 'GET', null, {
         Authorization: `Bearer ${token}`
       })
       setProductData(fetched)
     } catch (e) {}
   }, [token, request])

 
   useEffect(() => {
     getAllProducts()
   }, [getAllProducts])

   if(!(productData.length>0) && !loading){
    return <h6 className="center" style={{marginTop:'20%'}}>Пусто</h6>
  }
   
   if (loading) {
     return <Loader/>
   }

   return(<>
    <ManagerProductContext.Provider value={{update:getAllProducts}}>
      {productData.length>0 && !loading && <ManagerProductFilter dataList={productData}/>}
    </ManagerProductContext.Provider>
   </>)

}