import { Button } from "@mui/material"
import { useCallback, useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { useHttp } from "../../hooks/http.hook"
import { Loader } from "../Loader"
import { BucketClothList } from "./BucketClothList"

export const BucketLoadClothList=()=>{

    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const [clothData, setClothData]=useState([])


  const getAllCloths = useCallback(async () => {
    try {
      const fetched = await request('http://localhost:8080/api/cloth/bucket/get/all', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setClothData(fetched)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    getAllCloths()
  }, [getAllCloths])

  const deleteAllClothBucket=useCallback(async () => { 
        try{
          await request('http://localhost:8080/api/cloth/bucket/delete/all', 'POST', null,{
          Authorization: `Bearer ${token}`
        })
        getAllCloths()
    }catch(e){
    }
    },[token,request])

    const pressHandler=event=>{
    deleteAllClothBucket()
}
  
  if (loading) {
    return <Loader/>
  }
  if(!(clothData.length>0) && !loading){
    return <h6 className="center" style={{marginTop:'20%'}}>Пусто</h6>
  }
  return(<>
     <br/>
     <Button variant="outlined" onClick={pressHandler}>удалить всё</Button>
  {clothData.length>0 && !loading && <BucketClothList dataList={clothData} update={getAllCloths}/>}
  </>)
}