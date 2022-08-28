
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
        <button class="btn-small waves-effect waves-light" style={{borderRadius:'50px',color:'black',marginRight:'20px',backgroundColor:'rgb(245, 237, 245)'}} name="action" onClick={()=>pressHandler()}><div className="txt">{name}</div></button>
 {isCreate ? <DirectorCreateFurniture/> : <DirectorLoadFurnitureList/>}
   
        </>
    )
}