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
import { CustomerConfirmOrder } from "./CustomerConfirmOrder";
import { Link } from "react-router-dom";



export const CustomerCreateOrder=()=>{

  const {loading, request,error,clearError} = useHttp()
  const message = useMessage()
  const {token} = useContext(AuthContext)
  const [product,setProduct]=useState([{}])
  const [productOpen, setProductOpen] = useState(false);
  const [selectedProduct,setSelectedProduct]=useState([])
  const [orderedProduct,setOrderedProduct]=useState([{}])
  const [createdOrder,setCreatedOrder]=useState(null)
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
      const fetched = await request('https://morning-production-app.herokuapp.com/api/product/get/all', 'GET', null, {
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
    if(selectedProduct<1){
      message('Вы не выбрали продукты')
      return
    }
    let orderId
    try{
      const data=await request('https://morning-production-app.herokuapp.com/api/order/create', 'POST',null,{
        Authorization: `Bearer ${token}`
      })
      orderId=data.id
    for (const item of selectedProduct) {
      item.orderId=orderId
      await sendOrderedProduct(item);
    }
    }catch(e){}

      try{
      const responseMessage=await request(`https://morning-production-app.herokuapp.com/api/order/delete/aftermath/${orderId}`, 'POST',null,{
        Authorization: `Bearer ${token}`
      })
      message(responseMessage.message)
    }catch(e){}

    try{
      const updated=await request(`https://morning-production-app.herokuapp.com/api/order/update/${orderId}`, 'POST',null,{
        Authorization: `Bearer ${token}`
      })
      setCreatedOrder(updated)
    }catch(e){}
  }

  const sendOrderedProduct=useCallback(async (data) => {

    const fetch=await request('https://morning-production-app.herokuapp.com/api/order/product/create', 'POST', data,{
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
                           {!(product.length>0) && !loading && <h6 className="center">Пусто. <Link to={'/product'}>Создать продукт</Link></h6>}
                            {!loading && product.length>0 && !createdOrder && <CustomerMiniProductList dataList={product} selectProduct={selectProduct}/>}
              <br/>
              {createdOrder && <CustomerConfirmOrder data={createdOrder}/>}
              <br/>
              {!createdOrder && <Button variant="outlined" onClick={createOrderHandler}>Создать</Button>}
      </>
    )
}