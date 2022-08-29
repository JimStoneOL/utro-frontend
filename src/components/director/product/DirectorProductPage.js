
import { useEffect, useState } from "react"
import { DirectorCreateProduct } from "./DirectorCreateProduct"
import { DirectorLoadProductList } from "./DirectorLoadProductList"
import { DirectorProductList } from "./DirectorProductList"


export const DirectorProductPage=()=>{
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
{isCreate ? <DirectorCreateProduct/> : <DirectorLoadProductList/>}
  
       </>
   )
}