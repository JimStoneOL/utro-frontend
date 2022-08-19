import { useCallback, useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Loader } from "../../../utils/component/Loader"
import { CustomerMiniProductList } from "./CustomerMiniProductList";
import { useMessage } from "../../../utils/hooks/message.hook";



export const CustomerCreateOrder=()=>{

  const {loading, request,error,clearError} = useHttp()
  const message = useMessage()
  const {token} = useContext(AuthContext)
  const [product,setProduct]=useState([{}])
  const [productOpen, setProductOpen] = useState(false);
  const [selectedProduct,setSelectedProduct]=useState([{}])
  const [orderedProduct,setOrderedProduct]=useState([{}])
  const handleProductOpen = () =>{
    setProductOpen(true);
    getAllProduct()
  } 
  const handleProductClose = () => setProductOpen(false);

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  const getAllProduct = useCallback(async () => {
    try {
      const fetched = await request('http://localhost:8080/api/product/get/all', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setProduct(fetched)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    getAllProduct()
  }, [getAllProduct])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  
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

  const selectProduct=(selectId,form)=>{
    var str=selectId.split(' ')
    if(str[0]==='check'){
      if(selectedProduct.some(item=>item.productId===str[1])){
        return true
      }else{
        return false
      }
    }

      if(selectedProduct.some(item=>item.productId===selectId)){
        var index = selectedProduct.map(function(e) {
          return e.productId;
        }).indexOf(selectId);
        if (index !== -1) {
          selectedProduct.splice(index, 1);
        }
          return false
      }else{
        form.productId=selectId
        selectedProduct.push(form)
        window.M.updateTextFields()
        return true
      }
  }

 

  const createOrderHandler=async event=>{
    console.log(selectedProduct)

    let orderId
    try{
      const data=await request('http://localhost:8080/api/order/create', 'POST',null,{
        Authorization: `Bearer ${token}`
      })
      orderId=data.id
      selectedProduct.forEach((item,i) => {
        if(i>0){
          item.orderId=orderId
          sendOrderedProduct(item)
      }
    });
   
    }catch(e){}

    try{
      const updated=await request(`http://localhost:8080/api/order/update/${orderId}`, 'POST',null,{
        Authorization: `Bearer ${token}`
      })
      console.log(updated)
    }catch(e){}
  }

  const sendOrderedProduct=useCallback(async (data) => {

    const fetch=await request('http://localhost:8080/api/order/product/create', 'POST', data,{
      Authorization: `Bearer ${token}`
    })
    const form={
      orderedProducts:fetch.id
    }
    orderedProduct.push(form)

  },[token,request])



  if (loading) {
    return <Loader/>
  }

    return(
      <>
      <Button onClick={handleProductOpen}>Выбрать продукты</Button>
                <Modal
                            open={productOpen}
                            onClose={handleProductClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            
                        >
                            <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Выбор продуктов
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {!loading && product && <CustomerMiniProductList dataList={product} selectProduct={selectProduct}/>}
                            </Typography>
                            </Box>
              </Modal>
              <br/>
              <Button variant="outlined" onClick={createOrderHandler} disabled={!(selectedProduct.length>1)}>Создать</Button>
      </>
    )
}