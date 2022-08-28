
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
       <button class="btn-small waves-effect waves-light" style={{borderRadius:'50px',color:'black',marginRight:'20px',backgroundColor:'rgb(245, 237, 245)'}} name="action" onClick={()=>setName('Создать продукт')}><div className="txt">Создать продукт</div></button>
       <button class="btn-small waves-effect waves-light" style={{borderRadius:'50px',color:'black',marginRight:'20px',backgroundColor:'rgb(245, 237, 245)'}} name="action" onClick={()=>setName('Показать свои продукты')}><div className="txt">Показать свои продукты</div></button>
       <button class="btn-small waves-effect waves-light" style={{borderRadius:'50px',color:'black',backgroundColor:'rgb(245, 237, 245)'}} name="action" onClick={()=>setName('Показать готовые продукты')}><div className="txt">Показать готовые продукты</div></button>
      <hr/>
        <ShowProduct/>
  
       </>
   )
}