import { useCallback } from "react"
import { useState } from "react"
import { useEffect } from "react"
import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { Loader } from "../../../utils/component/Loader"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { DirectorProduct } from "./DirectorProduct"

export const DirectorProductList=({dataList})=>{

  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)
  const [isLoaded,setIsLoaded]=useState(false)
  const [product,setProduct]=useState([{}])

  const getImageByArticle= useCallback(async (data) => {
    try {
      const fetched = await request(`http://localhost:8080/api/image/get/product/${data.article}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
  
     data.imageBytes=fetched.imageBytes
      if(!(product.length===dataList.length+1)){
        product.push(data)
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
      {isLoaded ? <ShowProduct dataList={product}/> : <Loader/>}
    </>
    )
}
export const ShowProduct=({dataList})=>{
  return(<>
    {
        dataList.map((item,i)=>{ 
          if(i===0){
               
          }else{
          return(
           <>
           <DirectorProduct data={item}/>
           </>
          ) 
          }
         })
    }
  
  </>)
}