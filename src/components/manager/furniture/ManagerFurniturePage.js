
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
        <button class="btn-small waves-effect waves-light pink lighten-5" style={{borderRadius:'50px',color:'black'}} name="action" onClick={()=>pressHandler()}><div className="txt">{name}</div></button>
 {isCreate ? <ManagerCreateFurniture/> : <ManagerLoadFurnitureList/>}
   
        </>
    )
}