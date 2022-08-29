import { useCallback, useContext, useEffect, useState } from "react"
import { Loader } from "../../../utils/component/Loader"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { ManagerFurniture } from "./ManagerFurniture"

export const ManagerFurnitureList=({dataList,update})=>{

  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)
  const [isLoaded,setIsLoaded]=useState(false)
  const [furniture,setFurniture]=useState([{}])

  const getImageByArticle= useCallback(async (data) => {
    try {
      const fetched = await request(`http://localhost:8080/api/image/get/furniture/${data.article}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
  
     data.imageBytes=fetched.imageBytes
      if(!(furniture.length===dataList.length+1)){
        furniture.push(data)
      }
  
    } catch (e) {}
  },[token,request])
  
  useEffect(()=>{
    const fetchData = async () => {
      for (const item of dataList) {
        await getImageByArticle(item);
      }
      setIsLoaded(true)
  }
  fetchData();
  } ,[])


  return(
    <>
       {isLoaded ? <ShowFurniture dataList={furniture} update={update}/> : <Loader/>}
    </>
  )
}

export const ShowFurniture=({dataList,update})=>{
  return(<>
    {
        dataList.map((item,i)=>{ 
          if(i===0){
               
          }else{
          return(
           <>
           <ManagerFurniture data={item} update={update}/>
           </>
          ) 
          }
         })
    }
  
  </>)
}