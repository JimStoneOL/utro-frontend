
import { useState } from "react"
import { CustomerCreateProduct } from "./CustomerCreateProduct"
import { CustomerLoadMyProductList } from "./CustomerLoadMyProductList"
import { CustomerLoadProductList } from "./CustomerLoadProductList"


export const CustomerProductPage=()=>{
 
   const [name,setName]=useState('Создать продукт')
   

   const ShowProduct=()=>{
    if(name==='Создать продукт'){
      return <CustomerCreateProduct/>
    }else if(name==='Показать свои продукты'){
    return <CustomerLoadMyProductList/>
    }else if(name==='Показать готовые продукты'){
      return <CustomerLoadProductList/>
    }
  }
   return(
       <>
       <br/>
       <button class="btn waves-effect waves-light" name="action" onClick={()=>setName('Создать продукт')}>Создать продукт</button>
       <button class="btn waves-effect waves-light" name="action" onClick={()=>setName('Показать свои продукты')}>Показать свои продукты</button>
       <button class="btn waves-effect waves-light" name="action" onClick={()=>setName('Показать готовые продукты')}>Показать готовые продукты</button>

        <ShowProduct/>
  
       </>
   )
}