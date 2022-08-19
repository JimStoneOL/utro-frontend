import { useCallback } from "react"
import { useState } from "react"
import { useEffect } from "react"
import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { Loader } from "../../../utils/component/Loader"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { CustomerProduct } from "./CustomerProduct"


export const CustomerProductList=({dataList})=>{


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
    dataList.map(data=>{
      if(!(dataList.length+1===product.length)){
      getImageByArticle(data)
      }
    })
  } ,[])
  
  var interval=setInterval(()=>{
    if(product.length===dataList.length+1){
      setIsLoaded(true)
      clearInterval(interval)
    }else{
      console.log('not loaded')
    }
  },1000)

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
            console.log('undefined') 
          }else{
          return(
           <>
           <CustomerProduct data={item}/>
           </>
          ) 
          }
         })
    }
  
  </>)
}