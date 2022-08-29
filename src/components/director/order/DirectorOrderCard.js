import { useCallback, useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Button from '@mui/material/Button';
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { useMessage } from "../../../utils/hooks/message.hook"

export const DirectorOrderCard=({data})=>{

  const {loading, request,error,clearError} = useHttp()
  const {token} = useContext(AuthContext)
  const message = useMessage()
  const [username,setUsername]=useState([])
  const [deleted,setDeleted]=useState(false)

  useEffect(()=>{
    setUsername(data.username)
},[])

const getStage=()=>{
  let stage=data.stage
  if(stage==='STAGE_NEW'){
      return 'Новый'
  }
  if(stage==='STAGE_CONFIRMED'){
    return 'Оплаченный'
  }
  if(stage==='STAGE_ACCEPTED'){
    return 'Принятый'
  }
  if(stage==='STAGE_EXPECTATION'){
      return 'Ожидание'
  }
  if(stage==='STAGE_PROCESSING'){
      return 'В процессе'
  }
  if(stage==='STAGE_COMPLETED'){
      return 'Завершенный'
  }
  if(stage==='STAGE_CANCELLED'){
    return 'Отмененный'
}
if(stage==='STAGE_IN_PROCESS_OF_DELETE'){
  return 'В процессе удаления'
}
}

const deleteOrder=useCallback(async () => { 

    try{
      const fetched=await request(`https://morning-production-app.herokuapp.com/api/order/delete/forever/${data.id}`, 'POST',null,{
      Authorization: `Bearer ${token}`
    })
    message(fetched.message)
    setDeleted(true)
  }catch(e){
  }
},[token,request])

const pressHandler = event => {
  deleteOrder()
}

useEffect(() => {
  message(error)
  clearError()
}, [error, message, clearError])

if(deleted){
  return(<></>)
}

    return(
        <>
              <div class="row">
    <div class="col s12 m6">
      <div class="card">
        <div class="card-content">
          <span class="card-title">Номер заказа {data.id}</span>
         <p>
             Этап: {getStage()} <br/>
             Цена: {data.price} руб <br/>
             Пользователи: {username.join('  |  ')}
         </p>
        </div>
        <div class="card-action">
      <Link to={`/detail/order/${data.id}`}>Детали</Link>
      <Button variant="outlined" onClick={pressHandler}>Удалить</Button>
        </div>
      </div>
    </div>
  </div>
        </>
    )
}