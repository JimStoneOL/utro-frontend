import { Button } from "@mui/material"
import { useCallback } from "react"
import { useContext } from "react"
import { useEffect, useState } from "react"
import { Loader } from "../../../utils/component/Loader"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { CustomerMyProductFilter } from "./CustomerMyProductFilter"

export const CustomerLoadMyProductList=()=>{

    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const [myProductData, setMyProductData]=useState([])

    const getAllMyProducts = useCallback(async () => {
        try {
          const myfetched = await request('http://localhost:8080/api/product/get/all', 'GET', null, {
            Authorization: `Bearer ${token}`
          })
          setMyProductData(myfetched)
        } catch (e) {}
      }, [token, request])
    
      useEffect(() => {
        getAllMyProducts()
      }, [getAllMyProducts])
      
      if (loading) {
        return <Loader/>
      }

      return(<>
      
        {!loading && myProductData.length>0 && <CustomerMyProductFilter dataList={myProductData}/>}
  
        </>)
}