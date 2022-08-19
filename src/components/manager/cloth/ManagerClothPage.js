
import { ManagerCreateCloth } from "./ManagerCreateCloth";
import { useState } from "react";
import { ManagerLoadClothList } from "./ManagerLoadClothList";

export const ManagerClothPage=()=>{

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
 {isCreate ? <ManagerCreateCloth/> : <ManagerLoadClothList/>}
   
        </>
    )
 }
 