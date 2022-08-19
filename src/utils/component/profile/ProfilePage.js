import { useContext } from "react"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import { AuthContext } from "../../../utils/context/AuthContext"
import { Profile } from "./Profile"
import { UpdateProfile } from "./UpdateProfile"



export const ProfilePage=()=>{
    
    const [isCreate,setIsCreate]=useState(true)
    const auth = useContext(AuthContext)
    const history = useHistory()
    const [name,setName]=useState('Обновить профиль')

    const logoutHandler = event => {
      auth.logout()
      history.push('/')
    }
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
 {isCreate ? <Profile/> : <UpdateProfile/>}
        <button class="btn waves-effect waves-light" name="action" onClick={()=>logoutHandler()}>Выйти</button>
        
        </>
    )
 }