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
        <button class="btn-small waves-effect waves-light" style={{borderRadius:'50px',color:'black',backgroundColor:'rgb(245, 237, 245)'}} name="action" onClick={()=>pressHandler()}><div className="txt">{name}</div></button>
        <br/>
        <br/>
 {isCreate ? <CustomerCreateOrder/> : <CustomerOrderList/>} 
        </>
    )
}