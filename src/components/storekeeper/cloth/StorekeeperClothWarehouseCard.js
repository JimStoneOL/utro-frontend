import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Card, CardContent, CardMedia, MenuItem, TextField, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../utils/context/AuthContext";
import { useHttp } from "../../../utils/hooks/http.hook";
import { useMessage } from '../../../utils/hooks/message.hook';

export const StorekeeperClothWarehouseCard=({data})=>{

  const [open, setOpen] = useState(false);
  const message = useMessage()
  const [deleted,setDeleted]=useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {token} = useContext(AuthContext)
  const {request,loading,error,clearError} = useHttp()
  const [form,setForm]=useState({})


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
    
    }else if(currency==='см'){
      setLength(data.length/10)

    }else if(currency==='мм'){
      setLength(data.length)
    }
      
  },[currency,length])

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

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  const pressHandler = async event => {

    form.id=data.id
    form.clothId=data.clothId

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
        const fetch = await request('https://morning-production-app.herokuapp.com/api/cloth/warehouse/update', 'POST', {...form},{
          Authorization: `Bearer ${token}`
        })
        data.length=fetch.length
        message('Успешно обновлено')
      }catch(e){}
    }

    const deleteHandler=async event=>{
      let obj
      try {
        const fetched = await request(`https://morning-production-app.herokuapp.com/api/cloth/warehouse/delete/${data.id}`, 'POST', null,{
          Authorization: `Bearer ${token}`
        })
        message('Успешно удалено')
        setDeleted(true)
      }catch(e){
      }
    }


    return(<>
        <Card sx={{ maxWidth: 345,backgroundColor:'#b2dfdb'}} key={data.article} hidden={deleted}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            Номер склада: {data.id}
            </Typography>
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
            <Typography variant="body2" color="text.secondary">
                 <br/>  Длина: {length} {currency} <br/>

                  <Button onClick={handleOpen}>Обновить склад</Button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Обновление склада
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
                <Button variant="text" color="error" onClick={deleteHandler}>Удалить склад</Button>
            </Typography>
          </CardContent>
        </Card>
        </>)
}