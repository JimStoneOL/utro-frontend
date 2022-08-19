import { Button } from "@mui/material"
import { useCallback } from "react"
import { useContext } from "react"
import { useEffect, useState } from "react"
import { Loader } from "../../../utils/component/Loader"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { CustomerProductList } from "./CustomerProductList"

export const CustomerLoadProductList=()=>{

    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const [productData, setProductData]=useState([])

    const getAllProducts = useCallback(async () => {
        try {
          const fetched = await request('http://localhost:8080/api/product/template/get/all', 'GET', null, {
            Authorization: `Bearer ${token}`
          })
          setProductData(fetched)
        } catch (e) {}
      }, [token, request])
    
      useEffect(() => {
        getAllProducts()
      }, [getAllProducts])
      
      if (loading) {
        return <Loader/>
      }

      return(<>
      
      {!loading && productData && <CustomerProductList dataList={productData}/>}

      </>)

}