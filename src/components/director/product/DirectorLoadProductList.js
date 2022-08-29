import { useCallback, useEffect, useState } from "react"
import { useContext } from "react"
import { Loader } from "../../../utils/component/Loader"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { DirectorProductContext } from "./DirectorProductContext"
import { DirectorProductFilter } from "./DirectorProductFilter"
import { DirectorProductList } from "./DirectorProductList"


export const DirectorLoadProductList=()=>{
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const [productData, setProductData]=useState([])

    const getAllProducts = useCallback(async () => {
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
         <DirectorProductContext.Provider value={{update:getAllProducts}}>
         {!loading && productData.length>0 && <DirectorProductFilter dataList={productData}/>}
    </DirectorProductContext.Provider>
      </>)
}