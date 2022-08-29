import { useCallback, useContext, useEffect, useState } from 'react'
import { UploadControl } from '../../../utils/component/UploadControl'
import { AuthContext } from '../../../utils/context/AuthContext'
import { useHttp } from '../../../utils/hooks/http.hook'
import { useMessage } from '../../../utils/hooks/message.hook'
import '../../../utils/styles/horizontal-menu.css'
import { Loader } from "../../../utils/component/Loader"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from "axios";
import { ManagerMiniClothList } from './ManagerMiniClothList'
import { ManagerMiniFurnitureList } from './ManagerMiniFurnitureList'
import { MenuItem, TextField } from '@mui/material'
import { ManagerProductContext } from './ManagerProductContext'
import { Link } from 'react-router-dom'



export const ManagerChangeDetail=({productId})=>{

  const {loading, request,error,clearError} = useHttp()
  const {token} = useContext(AuthContext)
  const [furnitureData, setFurnitureData]=useState([])
  const [clothData, setClothData]=useState([])
  const message = useMessage()
  const {update}=useContext(ManagerProductContext)
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
      const fetched = await request('https://morning-production-app.herokuapp.com/api/furniture/bucket/get/all', 'GET', null, {
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
      const fetched = await request('https://morning-production-app.herokuapp.com/api/cloth/bucket/get/all', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setClothData(fetched)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    getAllCloth()
  }, [getAllCloth])
  

  const sendClothProduct=useCallback(async (data) => {

    

    await request('https://morning-production-app.herokuapp.com/api/cloth/product/template/create', 'POST', data,{
      Authorization: `Bearer ${token}`
    })
  
  },[token,request])

  const sendFurnitureProduct=useCallback(async (data) => {

    await request('https://morning-production-app.herokuapp.com/api/furniture/product/template/create', 'POST', data,{
      Authorization: `Bearer ${token}`
    })
  },[token,request])

  const updateDetailHandler=async event=>{
    //------------------------------------------------------------------------------------------------
    try{

      await request(`https://morning-production-app.herokuapp.com/api/cloth/product/template/delete/product/${productId}`, 'POST', null,{
        Authorization: `Bearer ${token}`
      })

      await request(`https://morning-production-app.herokuapp.com/api/furniture/product/template/delete/product/${productId}`, 'POST', null,{
        Authorization: `Bearer ${token}`
      })

      clothProduct.forEach((item,i) => {
          if(i>0){
            item.productId=productId
            sendClothProduct(item)
        }
      });
      furnitureProduct.forEach((item,i) => {
        if(i>0){
          item.productId=productId
          sendFurnitureProduct(item)
      }
      });
      update()
      message('Детали успешно изменены')
    }catch(e){
         
        update()
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
              <span className="card-title" style={{color:'rgb(105, 182, 204)'}}>Изменение деталей</span>
              <div className="pink lighten-5">
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
                            {!loading && clothData.length>0 && <ManagerMiniClothList dataList={clothData} selectCloth={selectCloth}/>}
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
                            {!loading && furnitureData.length>0 && <ManagerMiniFurnitureList dataList={furnitureData} selectFurniture={selectFurniture}/>}
                            </Typography>
                            </Box>
              </Modal>
              </div>
            </div>
            <div className="card-action">
              <button
                className="btn own-button"
                style={{marginRight: 10,borderRadius:'50px'}}
                onClick={updateDetailHandler}
              >
                Изменить
              </button>
            </div>
            </div>
          </div>
        </div>  
      </div>
    )
}