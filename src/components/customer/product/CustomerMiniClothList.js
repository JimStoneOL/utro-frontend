import { Box } from "@mui/material"
import { useCallback, useContext, useEffect, useState } from "react"
import { Loader } from "../../../utils/component/Loader"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import '../../../utils/styles/horizontal-menu.css'
import { CustomerMiniClothCard } from "./CustomerMiniClothCard"



export const CustomerMiniClothList=({dataList,selectCloth})=>{

    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const [isLoaded,setIsLoaded]=useState(false)
    const [cloth,setCloth]=useState([{}])

    
    const getImageByArticle= useCallback(async (data) => {
        try {
          const fetched = await request(`https://morning-production-app.herokuapp.com/api/image/get/cloth/${data.article}`, 'GET', null, {
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
           {isLoaded ? <ShowMiniCloth dataList={cloth} selectCloth={selectCloth}/> : <Loader/>}
        </>
      )
    }
    
    export const ShowMiniCloth=({dataList,selectCloth})=>{
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
                    <CustomerMiniClothCard data={item} selectCloth={selectCloth}/>
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