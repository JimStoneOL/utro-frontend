import { useCallback, useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { Loader } from "../../../utils/component/Loader"
import { CustomerFurnitureList } from "./CustomerFurnitureList"
import { CustomerFurnitureFilter } from "./CustomerFurnitureFilter"

export const CustomerFurniturePage=()=>{

    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const [furnitureData, setFurnitureData]=useState([])
  

    const getAllFurniture = useCallback(async () => {
      try {
        const fetched = await request('https://morning-production-app.herokuapp.com/api/furniture/get/all', 'GET', null, {
          Authorization: `Bearer ${token}`
        })
        setFurnitureData(fetched)
      } catch (e) {}
    }, [token, request])
  
    useEffect(() => {
      getAllFurniture()
    }, [getAllFurniture])

    if(!(furnitureData.length>0) && !loading){
      return <h6 className="center" style={{marginTop:'20%'}}>Пусто</h6>
    }
    
    if (loading) {
      return <Loader/>
    }

    
    return(
      <>
          {!loading && furnitureData.length>0 && <CustomerFurnitureFilter dataList={furnitureData}/>}
        </>
    )
}