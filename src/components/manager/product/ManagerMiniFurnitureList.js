import { useCallback, useContext, useEffect, useState } from "react"
import { Loader } from "../../../utils/component/Loader"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import '../../../utils/styles/horizontal-menu.css'
import { Box } from "@mui/system"
import { ManagerMiniFurnitureCard } from "./ManagerMiniFurnitureCard"

export const ManagerMiniFurnitureList=({dataList,selectFurniture})=>{

    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const [isLoaded,setIsLoaded]=useState(false)
    const [furniture,setFurniture]=useState([{}])

    
    const getImageByArticle= useCallback(async (data) => {
        try {
          const fetched = await request(`https://morning-production-app.herokuapp.com/api/image/get/furniture/${data.article}`, 'GET', null, {
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
                   
              }else{
              return(
               <>
                  <li>
                  <div className="mini_card">
                    <ManagerMiniFurnitureCard data={item} selectFurniture={selectFurniture}/>
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