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
          const fetched = await request(`http://localhost:8080/api/image/get/user/${data.id}`, 'GET', null, {
            Authorization: `Bearer ${token}`
          })
      
         data.imageBytes=fetched.imageBytes
         //setTheObject(prevState => ({ ...prevState, currentOrNewKey: newValue}));
        // setCloth(cloth=>({...cloth,data}))
          if(!(user.length===dataList.length+1)){
            user.push(data)
          }
        } catch (e) {}
      },[token,request])
      
      useEffect(()=>{
        dataList.map(data=>{
          if(!(dataList.length+1===user.length)){
          getImageByArticle(data)
          }
        })
      } ,[])
      
      var interval=setInterval(()=>{
        if(user.length===dataList.length+1){
          setIsLoaded(true)
          clearInterval(interval)
        }else{
          console.log('not loaded')
        }
      },1000)

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
                console.log('undefined') 
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