import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { MenuItem, TextField,Button } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom"
import { AuthContext } from "../../../utils/context/AuthContext";
import { useHttp } from "../../../utils/hooks/http.hook";
import { useMessage } from "../../../utils/hooks/message.hook";
import { CustomerChangeDetail } from './CustomerChangeDetail';
import { CustomerUpdateProduct } from './CustomerUpdateProduct';
export const CustomerMyProduct=({data})=>{

  const {token} = useContext(AuthContext)
  const {request,loading,error,clearError} = useHttp()

  const [width,setWidth]=useState(data.width)
  const [length,setLength]=useState(data.length)

  const message = useMessage()
  const [deleted,setDeleted]=useState(false)
  const [ordered,setOrdered]=useState(false)
  const [price,setPrice]=useState(0)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openDetail, setOpenDetail] = useState(false);
  const handleOpenDetail = () => setOpenDetail(true);
  const handleCloseDetail = () => setOpenDetail(false);

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

  const getPriceForProduct = useCallback(async () => {
    try {
      const fetched = await request(`https://morning-production-app.herokuapp.com/api/product/price/${data.article}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
        setPrice(fetched)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    getPriceForProduct()
  }, [getPriceForProduct])

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  const deleteHandler=async event=>{
    try {
      const fetch = await request(`https://morning-production-app.herokuapp.com/api/product/delete/${data.article}`, 'POST', null,{
        Authorization: `Bearer ${token}`
      })
      setDeleted(true)
      message('Продукт успешно удалён')
    }catch(e){}
  }

  const checkProductInOrder = useCallback(async () => {
    try {
      const fetched = await request(`https://morning-production-app.herokuapp.com/api/product/orderCheck/${data.article}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      if(fetched.message==='true'){
        setOrdered(true)
      }
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    checkProductInOrder()
  }, [checkProductInOrder])

  if(deleted){
    return(<></>)
  }
    return(
        <>
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
                Артикль: {data.article} <br/>
                Наименование: {data.name} <br/>
                ширина: {width} {currency}<br/>
                длина: {length} {currency} <br/>
                Комментарий: {data.comment} <br/>
                Цена: {Math.round(price * 100) / 100} руб
              </p>
              </div>
              <div class="card-action">
        <Link to={`/my/detail/cloth/${data.article}`}>Ткань</Link>
        <Link to={`/my/detail/furniture/${data.article}`}>Фурнитура</Link>
        <Link to={`/my/detail/images/${data.article}`}>Изображения</Link>

        {ordered && <h5 style={{color:'rgb(47, 214, 176)'}}>Заказан</h5>}
        {!ordered && <Button variant="outlined" onClick={deleteHandler}>Удалить</Button>}
        {!ordered && <Button variant="outlined" onClick={handleOpen} style={{marginLeft:'10px'}}>Обновить</Button>}
        {!ordered && <Button variant="outlined" onClick={handleOpenDetail} style={{marginLeft:'10px'}}>Изменить детали</Button>}
        
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                 <CustomerUpdateProduct data={data}/>
                </Typography>
              </Box>
            </Modal>

            <Modal
              open={openDetail}
              onClose={handleCloseDetail}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                 <CustomerChangeDetail productId={data.article}/>
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