
import { useCallback } from "react"
import { useContext } from "react"
import { useEffect, useState } from "react"
import { Loader } from "../../../utils/component/Loader"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { CustomerMyProductFilter } from "./CustomerMyProductFilter"
import { CustomerProductContext } from "./CustomerProductContext"

export const CustomerLoadMyProductList=()=>{

    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const [myProductData, setMyProductData]=useState([])

    const getAllMyProducts = useCallback(async () => {
        try {
          const myfetched = await request('https://morning-production-app.herokuapp.com/api/product/get/all', 'GET', null, {
            Authorization: `Bearer ${token}`
          })
          setMyProductData(myfetched)
        } catch (e) {}
      }, [token, request])
    
      useEffect(() => {
        getAllMyProducts()
      }, [getAllMyProducts])

      if(!(myProductData.length>0) && !loading){
        return <h6 className="center" style={{marginTop:'20%'}}>Пусто</h6>
      }
      
      if (loading) {
        return <Loader/>
      }

      return(<>
         <CustomerProductContext.Provider value={{update:getAllMyProducts}}>
        {!loading && myProductData.length>0 && <CustomerMyProductFilter dataList={myProductData}/>}
        </CustomerProductContext.Provider>
        </>)
}