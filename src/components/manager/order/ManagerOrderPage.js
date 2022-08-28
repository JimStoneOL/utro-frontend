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
        <button class="btn-small waves-effect waves-light pink lighten-5" style={{borderRadius:'50px',color:'black'}} name="action" onClick={()=>pressHandler()}><div className="txt">{name}</div></button>
 {isCreate ? <ManagerOrderList/> : <NotTakedCustomerOrderList/>} 
        </>
    )
}