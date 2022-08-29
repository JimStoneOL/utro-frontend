import { Button } from "@mui/material"
import { useCallback, useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { useMessage } from "../../../utils/hooks/message.hook"

export const ManagerOrderCard=({data})=>{

  const {loading, request,error,clearError} = useHttp()
  const message = useMessage()
  const {token} = useContext(AuthContext)
  const [hidden,setHidden]=useState(false)

  const [username,setUsername]=useState([])
 
  useEffect(()=>{
      setUsername(data.username)
  },[])


  const addManager=useCallback(async (orderId) => { 

    try{
      await request(`http://localhost:8080/api/order/add/manager/${orderId}`, 'POST', null,{
      Authorization: `Bearer ${token}`
    })
    message('Успешно добавлен заказ')
    setHidden(true)

}catch(e){
    
}
  },[token,request])


  const pressHandler = event => {
    addManager(data.id)
  }

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

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

 
    return(
        <>
              <div class="row" hidden={hidden} key={data.id}>
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
      <Button color="secondary" onClick={pressHandler}>Добавить</Button>
        </div>
      </div>
    </div>
  </div>
        </>
    )
}