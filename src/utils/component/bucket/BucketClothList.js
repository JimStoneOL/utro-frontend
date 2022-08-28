import { Button } from "@mui/material"
import { useCallback, useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { useHttp } from "../../hooks/http.hook"
import { Loader } from "../Loader"
import { BucketClothCard } from "./BucketClothCard"

export const BucketClothList=({dataList,update})=>{

    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const [isLoaded,setIsLoaded]=useState(false)
    const [cloth,setCloth]=useState([{
      name:'',color:'',drawing:'',structure:'',width:null,length:null,price:null,imageBytes:null
    }])
    
  const getImageByArticle= useCallback(async (data) => {
    try {
      const fetched = await request(`http://localhost:8080/api/image/get/cloth/${data.article}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
  
     data.imageBytes=fetched.imageBytes
      if(!(cloth.length===dataList.length+1)){
       cloth.push(data)
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
       {isLoaded ? <ShowCloth dataList={cloth} update={update}/> : <Loader/>}
    </>
  )
  }
  
  
  export const ShowCloth=({dataList,update})=>{
    return(<>
      {
          dataList.map((item,i)=>{ 
            if(dataList[i].name===''){
              console.log('undefined') 
            }else{
            return(
             <>
             <BucketClothCard data={item} update={update}/>
             </>
            ) 
            }
           })
      }
    
    </>)
}