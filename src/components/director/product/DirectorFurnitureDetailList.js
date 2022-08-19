import { useContext, useState } from "react"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { DirectorFurnitureProductDetailList } from "./DirectorFurnitureProductDetailList"

export const DirectorFurnitureDetailList=({dataList})=>{

  console.log(dataList)

    return(<>
        {
            dataList.map((item,i)=>{ 

              return(
               <>
               <DirectorFurnitureProductDetailList data={item}/>
               </>
              ) 
              
             })
        }
      
      </>)

}