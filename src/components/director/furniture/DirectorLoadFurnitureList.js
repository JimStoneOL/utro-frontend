import { useCallback, useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { DirectorFurnitureList } from "./DirectorFurnitureList"
import { Loader } from "../../../utils/component/Loader"

export const DirectorLoadFurnitureList=()=>{

    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const [furnitureData, setFurnitureData]=useState([])

    const getAllFurniture = useCallback(async () => {
        try {
          const fetched = await request('http://localhost:8080/api/furniture/get/all', 'GET', null, {
            Authorization: `Bearer ${token}`
          })
          setFurnitureData(fetched)
        } catch (e) {}
      }, [token, request])
    
      useEffect(() => {
        getAllFurniture()
      }, [getAllFurniture])
      
      if (loading) {
        return <Loader/>
      }

      return(
        <>
        {furnitureData && !loading && <DirectorFurnitureList dataList={furnitureData}/>}
        </>
      )
    
}