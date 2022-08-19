import { Box } from "@mui/material"
import { useCallback, useContext, useEffect, useState } from "react"
import { Loader } from "../../../utils/component/Loader"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import '../../../utils/styles/horizontal-menu.css'
import { CustomerMiniProductCard } from "./CustomerMiniProductCard"




export const CustomerMiniProductList=({dataList,selectProduct})=>{

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
           {isLoaded ? <ShowMiniProduct dataList={product} selectProduct={selectProduct}/> : <Loader/>}
        </>
      )
    }
  
    export const ShowMiniProduct=({dataList,selectProduct})=>{
      return(<>
     
                         <Box
                        component="ul"
                        sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 0, m: 0 }}>
                          <ul>
        {
            dataList.map((item,i)=>{ 
              if(i===0){
                console.log('undefined') 
              }else{
              return(
               <>
               <li>
                       <div className="mini_card">
                    <CustomerMiniProductCard data={item} selectProduct={selectProduct}/>
                      </div>
                    </li>
               </>
               
              ) 
              }
             })
        }
        </ul>
        </Box>
      </>)
    }