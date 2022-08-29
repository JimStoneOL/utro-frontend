import { useCallback, useContext, useEffect, useState } from "react"
import { Loader } from "../../../utils/component/Loader"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { CustomerCloth } from "./CustomerCloth"


export const CustomerClothList=({dataList})=>{

  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)
  const [isLoaded,setIsLoaded]=useState(false)
  const [cloth,setCloth]=useState([{
    name:'',color:'',drawing:'',structure:'',width:null,length:null,price:null,imageBytes:null
  }])
  
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
     {isLoaded ? <ShowCloth dataList={cloth}/> : <Loader/>}
  </>
)
}


export const ShowCloth=({dataList})=>{
  return(<>
    {
        dataList.map((item,i)=>{ 
          if(dataList[i].name===''){
          }else{
          return(
           <>
           <CustomerCloth data={item}/>
           </>
          ) 
          }
         })
    }
  
  </>)
}