import { useCallback, useContext, useEffect, useState } from "react"
import { Loader } from "../../../utils/component/Loader"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { ManagerCloth } from "./ManagerCloth"


export const ManagerClothList=({dataList,update})=>{

  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)
  const [isLoaded,setIsLoaded]=useState(false)
  const [cloth,setCloth]=useState([{
    name:'',color:'',drawing:'',structure:'',width:null,length:null,price:null,imageBytes:null
  }])
  
const getImageByArticle= useCallback(async (data) => {
   (cloth)
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
               
          }else{
          return(
           <>
           <ManagerCloth data={item} update={update}/>
           </>
          ) 
          }
         })
    }
  
  </>)
}