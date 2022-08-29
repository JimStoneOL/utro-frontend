import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { useMessage } from "../../../utils/hooks/message.hook"

export const CustomerOrderCard=({data})=>{

  const {token} = useContext(AuthContext)
  const {request,loading,error,clearError} = useHttp()
  const [isDeleted,setIsDeleted]=useState(false)
  const [confirmed,setConfirmed]=useState(false)
  const message = useMessage()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  const deleteHandler=async event=>{

    try {
      const fetch = await request(`https://morning-production-app.herokuapp.com/api/order/delete/${data.id}`, 'POST', null,{
        Authorization: `Bearer ${token}`
      })
      setIsDeleted(true)
    }catch(e){}
  }

  const pressHandler=async event=>{

    try {
        const fetched = await request(`https://morning-production-app.herokuapp.com/api/order/confirm/${data.id}`, 'POST', null,{
          Authorization: `Bearer ${token}`
        })
        message('Успешно подтверждено')
        setConfirmed(true)
      }catch(e){}
}

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

const Confirmed=()=>{
    return(
      <>
      <div class="row" key={data.id} hidden={isDeleted}>
      <div class="col s12 m6">
        <div class="card">
          <div class="card-content">
            <span class="card-title">Номер заказа {data.id}</span>
          <p>
              Этап: {getStage()} <br/>
              Цена: {data.price} руб <br/>
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
const DontConfirmed=()=>{
  return(
      <>
           <div class="row" key={data.id}>
  <div class="col s12 m6">
    <div class="card">
      <div class="card-content">
        <span class="card-title">Номер заказа {data.id}</span>
       <p hidden={confirmed}>
          Этап: {getStage()} <br/>
           Цена: {data.price} руб <br/>
       </p>
       {confirmed && <div>Подтверждено</div>}
      </div>
      <div class="card-action" hidden={confirmed}>
          <Button onClick={handleOpen}>Оплатить</Button>
          <Button variant="text" color="error" style={{marginLeft:'10px'}} onClick={deleteHandler}>Отменить</Button>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Оплата
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
   
                <input
                  placeholder="Номер"
                  id="number"
                  type="text"
                  name="number"
                  className="yellow-input"
                />
                     <input
                  placeholder="Срок действия"
                  id="expiration"
                  type="text"
                  name="expiration"
                  className="yellow-input"
                />
                     <input
                  placeholder="Имя держателя"
                  id="name"
                  type="text"
                  name="name"
                  className="yellow-input"
                />
                     <input
                  placeholder="Код CVV"
                  id="cvv"
                  type="text"
                  name="cvv"
                  className="yellow-input"
                />
        
    <Button variant="outlined" color="success" onClick={pressHandler}>Подтвердить</Button>
        </Typography>
      </Box>
</Modal>
</div>
    </div>
  </div>
</div>
      </>
  )
}
  return(
    <>
    {data.stage==='STAGE_NEW' ? <DontConfirmed/> : <Confirmed/>}
    </>
  )
}