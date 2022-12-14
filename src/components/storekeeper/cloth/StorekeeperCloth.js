
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../utils/context/AuthContext';
import { useHttp } from '../../../utils/hooks/http.hook';
import { StorekeeperClothWarehouseList } from './StorekeeperClothWarehouseList';
import { useMessage } from '../../../utils/hooks/message.hook';
import { MenuItem, TextField } from '@mui/material';

export const StorekeeperCloth=({data})=>{

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openInfo, setOpenInfo] = useState(false);
  const handleOpenInfo = () =>{
    setOpenInfo(true);
    getAllClothWarehouses()
  } 
  const handleCloseInfo = () => setOpenInfo(false);
  const {token} = useContext(AuthContext)
  const {request,loading,error,clearError} = useHttp()
  const message = useMessage()
  const [form,setForm]=useState({})
  const [clothWarehouses,setClothWarehouses]=useState([])

  const [width,setWidth]=useState(data.width)
  const [length,setLength]=useState(data.length)

  const currencies = [
    {
      value: 'мм',
      label: 'мм',
    },
    {
      value: 'см',
      label: 'см',
    },
    {
      value: 'м',
      label: 'м',
    }
  ];

  const [currency, setCurrency] = useState('мм');

  const handleUnit = event => {

    setCurrency(event.target.value);

  };

  useEffect(()=>{

    if(currency==='м'){
      setLength(data.length/1000)
      setWidth(data.width/1000)
    
    }else if(currency==='см'){
      setLength(data.length/10)
      setWidth(data.width/10)

    }else if(currency==='мм'){
      setLength(data.length)
      setWidth(data.width)

    }
      
  },[currency,length,width])

  //----------------------------------------------------------------------------


  const [currency2, setCurrency2] = useState('мм');

  const handleUnit2 = event => {

    setCurrency2(event.target.value);

  };


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

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const pressHandler = async event => {

    form.clothId=data.article

    if(currency2==='м'){
      
      form.length=form.length*1000
      form.width=form.width*1000
      setCurrency2('мм')
      
    }else if(currency2==='см'){

      form.length=form.length*10
      form.width=form.width*10
      setCurrency2('мм')

    }
      try {
        const res = await request('https://morning-production-app.herokuapp.com/api/cloth/warehouse/create', 'POST', {...form},{
          Authorization: `Bearer ${token}`
        })
        message('Склад успешно создался - номер: '+res.id)
      }catch(e){}
    }

    const getAllClothWarehouses = useCallback(async () => {
      try {
        const fetched = await request(`https://morning-production-app.herokuapp.com/api/cloth/warehouse/get/all/cloth/${data.article}`, 'GET', null, {
          Authorization: `Bearer ${token}`
        })
        setClothWarehouses(fetched)
      } catch (e) {}
    }, [token, request])
  
    useEffect(() => {
      getAllClothWarehouses()
    }, [getAllClothWarehouses])

    useEffect(() => {
      window.M.updateTextFields()
    }, [])

    return(
        <div class="col s12 m7" key={data.article}>
        <div class="card horizontal">
          <div class="card-image">
            <img src={`data:image/jpeg;base64,${data.imageBytes}`}/>
          </div>
          <div class="card-stacked">
          <TextField
                        id="outlined-select-currency"
                        select
                        
                        value={currency}
                        onChange={handleUnit}
                        helperText="Выберите единицу измерения"
                      >
                        {currencies.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                 </TextField>
            <div class="card-content">
              <p>
                  арктикл: {data.article} <br/>
                  наименование: {data.name} <br/>
                  цвет: {data.color} <br/>
                  рисунок: {data.drawing} <br/>
                  состав: {data.structure} <br/>
                  ширина: {width} {currency}<br/>
                  длина: {length} {currency} <br/>
                  цена: {data.price} руб<br/>
            </p>
            </div>
          </div>
          <Button onClick={handleOpen}>Добавить склад</Button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Добавить склад
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <TextField
                                  id="outlined-select-currency"
                                  select
                                  
                                  value={currency2}
                                  onChange={handleUnit2}
                                  helperText="Выберите единицу измерения"
                                >
                                  {currencies.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                      {option.label}
                          </MenuItem>
                        ))}
                 </TextField>
                            <input
                                  placeholder="Введите длину"
                                  id="length"
                                  type="text"
                                  name="length"
                                  className="yellow-input"
                                  value={form.length}
                                  onChange={changeHandler}
                  />
                                <br/>
                                <Button variant="outlined" onClick={pressHandler}>Принять</Button>
                            </Typography>
                            </Box>
                        </Modal>


                  
         <Button onClick={handleOpenInfo}>Информация</Button>
                        <Modal
                            open={openInfo}
                            onClose={handleCloseInfo}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                            Информация о складах
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {!(clothWarehouses.length>0) && !loading && <h6 className="center">Пусто</h6>}
                            {!loading && clothWarehouses.length>0 && <StorekeeperClothWarehouseList dataList={clothWarehouses}/>}
                            </Typography>
                            </Box>
                        </Modal>
        </div>
      </div>
    )
}