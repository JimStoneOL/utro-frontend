import { useCallback, useContext, useEffect, useState } from 'react'
import { UploadControl } from '../../../utils/component/UploadControl'
import { AuthContext } from '../../../utils/context/AuthContext'
import { useHttp } from '../../../utils/hooks/http.hook'
import { useMessage } from '../../../utils/hooks/message.hook'
import '../../../utils/styles/horizontal-menu.css'
import { Loader } from "../../../utils/component/Loader"
import { DirectorMiniFurnitureList } from './DirectorMiniFurnitureList'
import { DirectorMiniClothList } from './DirectorMiniClothList'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from "axios";
import { MenuItem, TextField } from '@mui/material'
import { Link } from 'react-router-dom'



export const DirectorCreateProduct=()=>{
  const {loading, request, error,clearError} = useHttp()
  const {token} = useContext(AuthContext)
  const [furnitureData, setFurnitureData]=useState([])
  const [clothData, setClothData]=useState([])
  const message = useMessage()
  const [file,setFile]=useState(null)
  const [clothOpen, setClothOpen] = useState(false);
  const handleClothOpen = () =>{
    setClothOpen(true);
    getAllCloth()
  } 
  const handleClothClose = () => setClothOpen(false);
  const [furnitureOpen, setFurnitureOpen] = useState(false);
  const handleFurnitureOpen = () =>{
    setFurnitureOpen(true);
    getAllFurniture()
  } 
  const handleFurnitureClose = () => setFurnitureOpen(false);
  const [furnitureProduct,setFurnitureProduct]=useState([{}])
  const [clothProduct,setClothProduct]=useState([{}])

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


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const furnitureStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  const getAllFurniture = useCallback(async () => {
    try {
      const fetched = await request('http://localhost:8080/api/furniture/bucket/get/all', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setFurnitureData(fetched)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    getAllFurniture()
  }, [getAllFurniture])

  const getAllCloth = useCallback(async () => {
    try {
      const fetched = await request('http://localhost:8080/api/cloth/bucket/get/all', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setClothData(fetched)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    getAllCloth()
  }, [getAllCloth])
  

  const handleAddBanner = ({ target: { files } }) => {
    const loadedImage = files[0];
    if(loadedImage.type.split('/')[0]==='image'){
      setFile(loadedImage)
    }else{
      message('Неверный формат файла')
    }
  };

  const [form, setForm] = useState({
    name: '',
    width: '',
    length:'',
    comment:'',
  })

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }
  const sendClothProduct=useCallback(async (data) => {

    await request('http://localhost:8080/api/cloth/product/template/create', 'POST', data,{
      Authorization: `Bearer ${token}`
    })
  },[token,request])

  const sendFurnitureProduct=useCallback(async (data) => {

   
    await request('http://localhost:8080/api/furniture/product/template/create', 'POST', data,{
      Authorization: `Bearer ${token}`
    })
  },[token,request])

  const createProductHandler=async event=>{
    //------------------------------------------------------------------------------------------------
    const formData=new FormData()
    formData.append("file",file)

    if(currency==='м'){
      
      form.length=form.length*1000
      form.width=form.width*1000
      setCurrency('мм')
      
    }else if(currency==='см'){

      form.length=form.length*10
      form.width=form.width*10
      setCurrency('мм')

    }

    let productId
    try{
      const data=await request('http://localhost:8080/api/product/template/create', 'POST', {...form},{
        Authorization: `Bearer ${token}`
      })
      productId=data.article
      clothProduct.forEach((item,i) => {
          if(i>0){
            item.productId=productId
            sendClothProduct(item)
        }
      });
      furnitureProduct.forEach((item,i) => {
        if(i>0){
          item.productId=productId
           (furnitureProduct)
          sendFurnitureProduct(item)
      }
      });
      axios.post(`http://localhost:8080/api/image/upload/template/product/${productId}`,formData,{
          headers:{
            'Authorization':`Bearer ${token}`,
            'Content-Type':'multipart/form-data'
          }
        }
        )
        message('Продукт успешно создан '+productId)
    }catch(e){
         ('wrong')
    }
  }

  const selectFurniture=(selectId,form)=>{
    
    var str=selectId.split(' ')
    if(str[0]==='check'){
      if(furnitureProduct.some(item=>item.furnitureId===str[1])){
        return true
      }else{
        return false
      }
    }

      if(furnitureProduct.some(item=>item.furnitureId===selectId)){
        var index = furnitureProduct.map(function(e) {
          return e.furnitureId;
        }).indexOf(selectId);
        if (index !== -1) {
          furnitureProduct.splice(index, 1);
        }
          return false
      }else{
        form.furnitureId=selectId
        furnitureProduct.push(form)
        window.M.updateTextFields()
        return true
      }
  }
  const selectCloth=(selectId)=>{
 
    var str=selectId.split(' ')
    if(str[0]==='check'){
      if(clothProduct.some(item=>item.clothId===str[1])){
        return true
      }else{
        return false
      }
    }

      if(clothProduct.some(item=>item.clothId===selectId)){
        var index = clothProduct.map(function(e) {
          return e.clothId;
        }).indexOf(selectId);
        if (index !== -1) {
          clothProduct.splice(index, 1);
        }
          return false
      }else{
        const form={
          productId:null,
          clothId:selectId
        }
        clothProduct.push(form)
        window.M.updateTextFields()
        return true
      }
  }
  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  if (loading) {
    return <Loader/>
  }

  return(
        <div className="row">
        <div className="">
          <div className="card center">
            <div className='pink lighten-5'>
            <div className="card-content white-text">
              <span className="card-title" style={{color:'rgb(105, 182, 204)'}}>Создание шаблонного продукта</span>
              <div className="pink lighten-5">
              <div className="input-field">
                  <input
                    placeholder="Введите название"
                    id="name"
                    type="text"
                    name="name"
                    className="yellow-input"
                    value={form.name}
                    onChange={changeHandler}
                  />
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
                  </div>
                  <div className="input-field">
                  <input
                    placeholder="Введите ширину"
                    id="width"
                    type="text"
                    name="width"
                    className="yellow-input"
                    value={form.width}
                    onChange={changeHandler}
                  />
                  </div>
                  <div className="input-field">
                  <input
                    placeholder="Введите длину"
                    id="length"
                    type="text"
                    name="length"
                    className="yellow-input"
                    value={form.length}
                    onChange={changeHandler}
                  />
                  </div>
                  <div className="">
                    <UploadControl onChange={handleAddBanner} accept="image/*">
                    <div style={{color:'rgb(105, 182, 204)',cursor:'pointer'}}>
                    {file ? file.name : 'Добавить изображение'}
                    </div>
                    </UploadControl>
                </div>
                  <div className="input-field">
                  <input
                    placeholder="Оставьте комментарий"
                    id="comment"
                    type="text"
                    name="comment"
                    className="yellow-input"
                    value={form.comment}
                    onChange={changeHandler}
                  />
                  </div>

  
              <Button onClick={handleClothOpen}>Выбрать ткани</Button>
                <Modal
                            open={clothOpen}
                            onClose={handleClothClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            
                        >
                            <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Выбор тканей
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                           {!(clothData.length>0) && !loading && <h6 className="center">Пусто. <Link to={'/cloth'}>Выбрать ткани</Link></h6>}
                            {!loading && clothData.length>0 && <DirectorMiniClothList dataList={clothData} selectCloth={selectCloth}/>}
                            </Typography>
                            </Box>
              </Modal>
    
                
                  <Button onClick={handleFurnitureOpen}>Выбрать фурнитуры</Button>
                <Modal
                            open={furnitureOpen}
                            onClose={handleFurnitureClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={furnitureStyle}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Выбор фурнитуры
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                           {!(furnitureData.length>0) && !loading && <h6 className="center">Пусто. <Link to={'/furniture'}>Выбрать фурнитуры</Link></h6>}
                            {!loading && furnitureData.length>0 && <DirectorMiniFurnitureList dataList={furnitureData} selectFurniture={selectFurniture}/>}
                            </Typography>
                            </Box>
              </Modal>
              </div>
            </div>
            <div className="card-action">
              <button
                className="btn own-button"
                style={{marginRight: 10,borderRadius:'50px'}}
                onClick={createProductHandler}
              >
                Создать
              </button>
            </div>
            </div>
          </div>
        </div>  
      </div>
    )
}