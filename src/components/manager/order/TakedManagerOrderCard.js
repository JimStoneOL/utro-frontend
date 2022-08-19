import Select from 'react-select'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useCallback, useContext, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useHttp } from '../../../utils/hooks/http.hook';
import { AuthContext } from '../../../utils/context/AuthContext';
import { Loader } from "../../../utils/component/Loader"
import { useMessage } from '../../../utils/hooks/message.hook'
import { Link } from 'react-router-dom';

export const TakedManagerOrderCard=({data})=>{

    const [username,setUsername]=useState([])

    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
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

    const giveStage=useCallback(async (data) => { 

      try{
        await request('http://localhost:8080/api/order/update/stage', 'POST', data,{
        Authorization: `Bearer ${token}`
      })
  }catch(e){
      console.log()
  }
    },[token,request])

    const changeHandler = (selectedStage) => {
      setStage({stage:selectedStage.value, orderId:data.id})
    }
    const pressHandler = event => {
      giveStage(stage)
    }

    if (loading) {
      return <Loader/>
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

        <Button variant="contained" color="error" onClick={handleOpen}>Выбрать стадию</Button>
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