import { useCallback, useContext, useEffect, useState } from "react"
import { Loader } from "../../../utils/component/Loader"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { DirectorClothDetail } from "./DirectorClothDetail"

export const DirectorClothDetailList=({dataList})=>{

    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
     const [isLoaded,setIsLoaded]=useState(false)
    const [cloth, setCloth]=useState([{}])


    const getClothByArticle= useCallback(async (data) => {
        try {
        
          const fetched = await request(`https://morning-production-app.herokuapp.com/api/cloth/get/${data.clothId}`, 'GET', null, {
            Authorization: `Bearer ${token}`
          })
          if(!(dataList.length+1===cloth.length)){
            cloth.push(fetched)
          }
      
        } catch (e) {}
      },[token,request])
      
      useEffect(()=>{
        const fetchData = async () => {
          for (const item of dataList) {
            await getClothByArticle(item);
          }
          setIsLoaded(true)
      }
      fetchData();
      } ,[])

    return(
        <>
       {isLoaded ? <ShowDetailCloth dataList={cloth}/> : <Loader/>}
        </>
    )
}
export const ShowDetailCloth=({dataList})=>{
    return(<>
      {
          dataList.map((item,i)=>{ 
            if(i===0){
           
            }else{
            return(
             <>
             <DirectorClothDetail data={item}/>
             </>
            ) 
            }
           })
      }
    
    </>)
  }