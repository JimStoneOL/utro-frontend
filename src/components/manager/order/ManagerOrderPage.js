import { useState } from "react"
import { ManagerOrderList } from "./ManagerOrderList"
import { NotTakedCustomerOrderList } from "./NotTakedCustomerOrderList"



export const ManagerOrderPage=()=>{
    const [isCreate,setIsCreate]=useState(true)
    const [name,setName]=useState('Взять заказ')
    const pressHandler=()=>{
      setIsCreate(!isCreate)
      if(isCreate){
      setName('Взятые заказы')
      }
      else{
        setName('Взять заказ')
      }
    }
    return(
        <>
        <br/>
        <button class="btn waves-effect waves-light" name="action" onClick={()=>pressHandler()}>{name}</button>
 {isCreate ? <ManagerOrderList/> : <NotTakedCustomerOrderList/>} 
        </>
    )
}