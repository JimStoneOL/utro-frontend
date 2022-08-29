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
          const fetched = await request(`https://morning-production-app.herokuapp.com/api/image/get/product/${data.article}`, 'GET', null, {
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