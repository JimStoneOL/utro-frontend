import { useCallback, useContext, useEffect, useState } from "react"
import { Loader } from "../../../utils/component/Loader"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import '../../../utils/styles/horizontal-menu.css'
import { Box } from "@mui/system"
import { CustomerMiniFurnitureCard } from "./CustomerMiniFurnitureCard"

export const CustomerMiniFurnitureList=({dataList,selectFurniture})=>{

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
        dataList.map(data=>{
          if(!(dataList.length===furniture.length)){
          getImageByArticle(data)
          }
        })
      } ,[])
      
      var interval=setInterval(()=>{
        if(furniture.length===dataList.length+1){
          setIsLoaded(true)
          clearInterval(interval)
        }else{
          console.log('not loaded')
        }
      },1000)
    
    
      return(
        <>
           {isLoaded ? <ShowMiniFurniture dataList={furniture} selectFurniture={selectFurniture}/> : <Loader/>}
        </>
      )
    }
    
    export const ShowMiniFurniture=({dataList,selectFurniture})=>{
      return(<>
                       <Box
                        component="ul"
                        sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 0, m: 0 }}></Box>
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
                    <CustomerMiniFurnitureCard data={item} selectFurniture={selectFurniture}/>
                    </div>
                  </li>
               </>
              ) 
              }
             })
        }
        </ul>
        <Box/>
      </>)
    }