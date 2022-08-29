import Select from 'react-select'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useCallback, useContext, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useHttp } from '../../../utils/hooks/http.hook';
import { AuthContext } from '../../../utils/context/AuthContext';
import { Loader } from "../../../utils/component/Loader"
import { useMessage } from '../../../utils/hooks/message.hook'



export const User=({data})=>{

    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const message=useMessage()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [role,setRole]=useState({})

    const getRole=()=>{
        let role=data.role[0].name
        if(role==='ROLE_CUSTOMER'){
            return 'Заказчкик'
        }
        if(role==='ROLE_MANAGER'){
            return 'Менеджер'
        }
        if(role==='ROLE_DIRECTOR'){
            return 'Директор'
        }
        if(role==='ROLE_STOREKEEPER'){
            return 'Кладовщик'
        }
    }

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
        { value: 'ROLE_CUSTOMER', label: 'Заказчик' },
        { value: 'ROLE_MANAGER', label: 'Менеджер' },
        { value: 'ROLE_STOREKEEPER', label: 'Складовщик' },
        { value: 'ROLE_DIRECTOR', label: 'Директор' }
      ]

      const giveRole=useCallback(async (data) => { 
        if(data.role===undefined){
            message('Вы не выбрали роль')
            return
        }
        try{
          await request('http://localhost:8080/api/role/give', 'POST', data,{
          Authorization: `Bearer ${token}`
        })
    }catch(e){
      
    }
      },[token,request])

      const changeHandler = (selectedRole) => {
        setRole({role:selectedRole.value, userId:data.id})
      }
      const pressHandler = event => {
        giveRole(role)
      }

      if (loading) {
        return <Loader/>
      }
    return(<>

    <Card sx={{ maxWidth: 345,backgroundColor:'#b2dfdb'}} key={data.id}>
      <CardMedia
        component="img"
        height="140"
        image={`data:image/jpeg;base64,${data.imageBytes}`}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {data.username}
        </Typography>
        <Typography variant="body2" color="text.secondary">
                                имя: {data.firstname} <br/>
                                фамилия: {data.lastname} <br/>
                                роль: {getRole()} <br/>
                                
        </Typography>
      </CardContent>
      <CardActions>
      <Button onClick={handleOpen}>Выбрать роль</Button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Выбор роли
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <Select options={options} onChange={changeHandler}/>
                                <br/>
                                <Button variant="outlined" onClick={pressHandler}>Принять</Button>
                            </Typography>
                            </Box>
                        </Modal>
      </CardActions>
    </Card>
      
    </>)
}