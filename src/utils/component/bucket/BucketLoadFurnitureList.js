import { Button } from "@mui/material"
import { useCallback, useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { Loader } from "../../../utils/component/Loader"
import { BucketFurnitureList } from "./BucketFurnitureList"

export const BucketLoadFurnitureList=()=>{

    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const [furnitureData, setFurnitureData]=useState([])
   

    const getAllFurniture = useCallback(async () => {
        try {
          const fetched = await request('https://morning-production-app.herokuapp.com/api/furniture/bucket/get/all', 'GET', null, {
            Authorization: `Bearer ${token}`
          })
          setFurnitureData(fetched)
        } catch (e) {}
      }, [token, request])
    
      useEffect(() => {
        getAllFurniture()
      }, [getAllFurniture])

  
      const deleteAllFurnitureBucket=useCallback(async () => { 
        try{
          await request('https://morning-production-app.herokuapp.com/api/furniture/bucket/delete/all', 'POST', null,{
          Authorization: `Bearer ${token}`
        })
        getAllFurniture()
    }catch(e){
    }
    },[token,request])

    const pressHandler=event=>{
      deleteAllFurnitureBucket()
}
  
      if (loading) {
        return <Loader/>
      }

      if(!(furnitureData.length>0) && !loading){
        return <h6 className="center" style={{marginTop:'20%'}}>Пусто</h6>
      }

      return(
        <>
     <br/>
       <Button variant="outlined" onClick={pressHandler}>удалить всё</Button>
        {furnitureData.length>0 && !loading && <BucketFurnitureList dataList={furnitureData} update={getAllFurniture}/>}
        </>
      )
}