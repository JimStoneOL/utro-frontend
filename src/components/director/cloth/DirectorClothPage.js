
import { DirectorCreateCloth } from "./DirectorCreateCloth"
import { DirectorLoadClothList } from "./DirectorLoadClothList"
import { useState } from "react"


export const DirectorClothPage=()=>{

    const [isCreate,setIsCreate]=useState(true)
    const [name,setName]=useState('Готовые ткани')
 
    const pressHandler=()=>{
      setIsCreate(!isCreate)
      if(isCreate){
      setName('Создать ткань')
      }
      else{
        setName('Готовые ткани')
      }
    }
    return(
        <>
        <br/>
        <button class="btn waves-effect waves-light" name="action" onClick={()=>pressHandler()}>{name}</button>
 {isCreate ? <DirectorCreateCloth/> : <DirectorLoadClothList/>}
   
        </>
    )
 }
 