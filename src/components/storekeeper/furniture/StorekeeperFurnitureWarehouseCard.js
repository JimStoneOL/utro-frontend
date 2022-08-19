import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Card, CardContent, CardMedia, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../utils/context/AuthContext";
import { useHttp } from "../../../utils/hooks/http.hook";
import { useMessage } from '../../../utils/hooks/message.hook';

export const StorekeeperFurnitureWarehouseCard=({data})=>{

  const [open, setOpen] = useState(false);
  const message = useMessage()
  const [deleted,setDeleted]=useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {token} = useContext(AuthContext)
  const {request,loading,error,clearError} = useHttp()
  const [form,setForm]=useState({})

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
    form.furnitureId=data.furnitureId
      try {
        const fetch = await request('http://localhost:8080/api/furniture/warehouse/update', 'POST', {...form},{
          Authorization: `Bearer ${token}`
        })
        data.amount=fetch.amount
        message('Успешно обновлено')
      }catch(e){}
    }

    const deleteHandler=async event=>{

      try {
        const fetch = await request(`http://localhost:8080/api/furniture/warehouse/delete/${data.id}`, 'POST', null,{
          Authorization: `Bearer ${token}`
        })
        message('Успешно удалено')
        setDeleted(true)
      }catch(e){}
    }

    return(<>
        <Card sx={{ maxWidth: 345,backgroundColor:'#b2dfdb'}} key={data.article} hidden={deleted}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            Номер склада: {data.id}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                                   Количество: {data.amount} штук<br/>
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
                            <input
                                  placeholder="Введите количество"
                                  id="amount"
                                  type="text"
                                  name="amount"
                                  className="yellow-input"
                                  value={form.amount}
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