
import { DirectorCreateFurniture } from "./DirectorCreateFurniture"
import { DirectorLoadFurnitureList } from "./DirectorLoadFurnitureList"
import { useState } from "react"

export const DirectorFurniturePage=()=>{

    const [isCreate,setIsCreate]=useState(true)
    const [name,setName]=useState('Готовые фурнитуры')

   
    const pressHandler=()=>{
      setIsCreate(!isCreate)
      if(isCreate){
      setName('Создать фурнитуру')
      }
      else{
        setName('Готовые фурнитуры')
      }
    }
    return(
        <>
        <br/>
        <button class="btn waves-effect waves-light" name="action" onClick={()=>pressHandler()}>{name}</button>
 {isCreate ? <DirectorCreateFurniture/> : <DirectorLoadFurnitureList/>}
   
        </>
    )
}