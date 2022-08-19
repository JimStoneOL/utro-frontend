import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const DirectorOrderCard=({data})=>{

  const [username,setUsername]=useState([])

  useEffect(()=>{
    setUsername(data.username)
},[])

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
              <div class="row">
    <div class="col s12 m6">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">Номер заказа {data.id}</span>
         <p>
             Этап: {getStage()} <br/>
             Цена: {data.price} руб <br/>
             Пользователи: {username.join('  |  ')}
         </p>
        </div>
        <div class="card-action">
      <Link to={`/detail/order/${data.id}`}>Детали</Link>
        </div>
      </div>
    </div>
  </div>
        </>
    )
}