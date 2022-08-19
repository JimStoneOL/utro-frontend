import { useState } from "react"
import { StorekeeperProfile } from "./StorekeeperProfile"
import { StorekeeperUpdateProfile } from "./StorekeeperUpdateProfile"


export const StorekeeperProfilePage=()=>{
    const [isCreate,setIsCreate]=useState(true)
    const [name,setName]=useState('Обновить профиль')
    const pressHandler=()=>{
      setIsCreate(!isCreate)
      if(isCreate){
      setName('Ваш профиль')
      }
      else{
        setName('Обновить профиль')
      }
    }
    return(
        <>
        <br/>
        <button class="btn waves-effect waves-light" name="action" onClick={()=>pressHandler()}>{name}</button>
 {isCreate ? <StorekeeperProfile/> : <StorekeeperUpdateProfile/>}
   
        </>
    )
 }