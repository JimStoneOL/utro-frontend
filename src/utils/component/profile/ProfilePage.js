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
        <button class="btn-small waves-effect waves-light" style={{borderRadius:'50px',color:'black',backgroundColor:'rgb(245, 237, 245)'}} name="action" onClick={()=>pressHandler()}><div className="txt">{name}</div></button>
 {isCreate ? <Profile/> : <UpdateProfile/>}
        <button class="btn-small waves-effect waves-light" style={{borderRadius:'50px',color:'black',backgroundColor:'rgb(245, 237, 245)'}} name="action" onClick={()=>logoutHandler()}><div className="txt">Выйти</div></button>
        
        </>
    )
 }