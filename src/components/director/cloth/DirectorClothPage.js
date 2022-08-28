
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
        <button class="btn-small waves-effect waves-light" style={{borderRadius:'50px',color:'black',marginRight:'20px',backgroundColor:'rgb(245, 237, 245)'}} name="action" onClick={()=>pressHandler()}><div className="txt">{name}</div></button>
 {isCreate ? <DirectorCreateCloth/> : <DirectorLoadClothList/>}
   
        </>
    )
 }
 