import { Button } from "@mui/material"
import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"

export const CustomerOrderCard=({data})=>{

  const {token} = useContext(AuthContext)
  const {request,loading} = useHttp()
  const [isDeleted,setIsDeleted]=useState(false)


  const deleteHandler=async event=>{

    try {
      const fetch = await request(`http://localhost:8080/api/order/delete/${data.id}`, 'POST', null,{
        Authorization: `Bearer ${token}`
      })
      setIsDeleted(true)
    }catch(e){}
  }


  const getStage=()=>{
    let stage=data.stage
    if(stage==='STAGE_NEW'){
        return 'Новый'
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
              <div class="row" key={data.id} hidden={isDeleted}>
    <div class="col s12 m6">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">Номер заказа {data.id}</span>
         <p>
             Этап: {getStage()} <br/>
             Цена: {data.price} руб <br/>
         </p>
        </div>
        <div class="card-action">
      <Link to={`/detail/order/${data.id}`}>Детали</Link>
      <Button variant="outlined" color="error" onClick={deleteHandler}>Отменить</Button>
        </div>
      </div>
    </div>
  </div>
        </>
    )
}