
import { useState } from "react"
import { ManagerCreateFurniture } from "./ManagerCreateFurniture"
import { ManagerLoadFurnitureList } from "./ManagerLoadFurnitureList"

export const ManagerFurniturePage=()=>{

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
 {isCreate ? <ManagerCreateFurniture/> : <ManagerLoadFurnitureList/>}
   
        </>
    )
}