
import { ManagerCreateCloth } from "./ManagerCreateCloth";
import { useState } from "react";
import { ManagerLoadClothList } from "./ManagerLoadClothList";
import '../../../utils/styles/font.css'

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
        <button class="btn-small waves-effect waves-light pink lighten-5" style={{borderRadius:'50px',color:'black'}} name="action" onClick={()=>pressHandler()}><div className="txt">{name}</div></button>
 {isCreate ? <ManagerCreateCloth/> : <ManagerLoadClothList/>}
   
        </>
    )
 }
 