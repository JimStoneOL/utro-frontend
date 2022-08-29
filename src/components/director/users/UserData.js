import { useCallback, useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { User } from "./User"
import Box from '@mui/material/Box';
import { Loader } from "../../../utils/component/Loader";

export const UserData=({dataList})=>{

    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const [isLoaded,setIsLoaded]=useState(false)
    const [user,setUser]=useState([{}])

    const getImageByArticle= useCallback(async (data) => {
   
        try {
          const fetched = await request(`https://morning-production-app.herokuapp.com/api/image/get/user/${data.id}`, 'GET', null, {
            Authorization: `Bearer ${token}`
          })
      
         data.imageBytes=fetched.imageBytes
          if(!(user.length===dataList.length+1)){
            user.push(data)
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
           {isLoaded ? <ShowUser dataList={user}/> : <Loader/>}
        </>
      )
}
export const ShowUser=({dataList})=>{
    return(<>
                  <Box 
                        component="ul"
                        sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 0, m: 0 }}>
        {
            dataList.map((item,i)=>{ 
              if(i===0){
                   
              }else{
              return(
               <>
                            <User data={item}/>
               </>
              ) 
              }
             })
        }
         </Box>
      </>)
}