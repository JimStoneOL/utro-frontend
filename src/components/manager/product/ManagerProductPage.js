
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
       <button class="btn waves-effect waves-light" name="action" onClick={()=>pressHandler()}>{name}</button>
{isCreate ? <ManagerCreateProduct/> : <ManagerLoadProductList/>}
  
       </>
   )
}