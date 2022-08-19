import { Button } from "@mui/material"
import { useContext, useState } from "react"
import { CreateOrder, CustomerCreateOrder } from "./CustomerCreateOrder"
import { CustomerOrderList, OrderList } from "./CustomerOrderList"


export const CustomerOrderPage=()=>{

    const [isCreate,setIsCreate]=useState(true)
    const [name,setName]=useState('Ваши заказы')
    const pressHandler=()=>{
      setIsCreate(!isCreate)
      if(isCreate){
      setName('Сделать заказ')
      }
      else{
        setName('Ваши заказы')
      }
    }
    return(
        <>
        <br/>
        <button class="btn waves-effect waves-light" name="action" onClick={()=>pressHandler()}>{name}</button>
        <br/>
 {isCreate ? <CustomerCreateOrder/> : <CustomerOrderList/>} 
        </>
    )
}