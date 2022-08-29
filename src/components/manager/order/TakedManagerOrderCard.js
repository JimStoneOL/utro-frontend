import Select from 'react-select'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useHttp } from '../../../utils/hooks/http.hook';
import { AuthContext } from '../../../utils/context/AuthContext';
import { Loader } from "../../../utils/component/Loader"
import { useMessage } from '../../../utils/hooks/message.hook'
import { Link } from 'react-router-dom';

export const TakedManagerOrderCard=({data})=>{

    const [username,setUsername]=useState([])

    const {loading, request,error,clearError} = useHttp()
    const {token} = useContext(AuthContext)
    const message = useMessage()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [stage,setStage]=useState({})
 
    useEffect(()=>{
        setUsername(data.username)
    },[])

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

  const options = [
      { value: 'STAGE_NEW', label: 'Новый' },
      { value: 'STAGE_EXPECTATION', label: 'Ожидание' },
      { value: 'STAGE_PROCESSING', label: 'В процессе' },
      { value: 'STAGE_COMPLETED', label: 'Завершенный' },
      { value: 'STAGE_CANCELLED', label: 'Отмененный' },
      { value: 'STAGE_IN_PROCESS_OF_DELETE', label: 'В процессе удаления' },
    ]

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

    const giveStage=useCallback(async (form) => { 

      try{
        const fetched=await request('https://morning-production-app.herokuapp.com/api/order/update/stage', 'POST', form,{
        Authorization: `Bearer ${token}`
      })
      data.stage=fetched.stage
      message('Стадия успешно обновлена')
  }catch(e){
     
  }
    },[token,request])

    const changeHandler = (selectedStage) => {
      setStage({stage:selectedStage.value, orderId:data.id})
    }
    const pressHandler = event => {
      giveStage(stage)
    }

    useEffect(() => {
      message(error)
      clearError()
    }, [error, message, clearError])

    if (loading) {
      return <Loader/>
    }

      return(
          <>
                <div class="row" key={data.id}>
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

        <Button variant="text" onClick={handleOpen}>Выбрать стадию</Button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Выбор стадии
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <Select options={options} onChange={changeHandler}/>
                                <br/>
                                <Button variant="outlined" onClick={pressHandler}>Принять</Button>
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