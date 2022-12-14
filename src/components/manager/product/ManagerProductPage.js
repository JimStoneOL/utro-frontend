
import { useState } from "react"
import { ManagerCreateProduct } from "./ManagerCreateProduct"
import { ManagerLoadProductList } from "./ManagerLoadProductList"


export const ManagerProductPage=()=>{
   const [isCreate,setIsCreate]=useState(true)
   const [name,setName]=useState('Готовые продукты')
  

   const pressHandler=()=>{
     setIsCreate(!isCreate)
     if(isCreate){
     setName('Создать шаблонный продукт')
     }
     else{
       setName('Готовые продукты')
     }
   }
   return(
       <>
       <br/>
       <button class="btn-small waves-effect waves-light" style={{borderRadius:'50px',color:'black',backgroundColor:'rgb(245, 237, 245)'}} name="action" onClick={()=>pressHandler()}><div className="txt">{name}</div></button>
{isCreate ? <ManagerCreateProduct/> : <ManagerLoadProductList/>}
  
       </>
   )
}