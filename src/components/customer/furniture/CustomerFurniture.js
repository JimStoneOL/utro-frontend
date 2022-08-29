import { MenuItem, TextField,Button } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../utils/context/AuthContext";
import { useHttp } from "../../../utils/hooks/http.hook";
import { useMessage } from "../../../utils/hooks/message.hook";

export const CustomerFurniture=({data})=>{

  const {loading, request,error,clearError} = useHttp()
  const {token} = useContext(AuthContext)
  const message = useMessage()
  const [width,setWidth]=useState(data.width)
  const [length,setLength]=useState(data.length)
  const [added,setAdded]=useState(false)

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

  const addFurnitureToBucket=useCallback(async (article) => { 
 
    try{
      await request(`https://morning-production-app.herokuapp.com/api/furniture/bucket/create/${article}`, 'POST', null,{
      Authorization: `Bearer ${token}`
    })
    setAdded(true)
}catch(e){
}
},[token,request])

const deleteFurnitureBucket=useCallback(async (article) => { 
        try{
          await request(`https://morning-production-app.herokuapp.com/api/furniture/bucket/delete/${article}`, 'POST', null,{
          Authorization: `Bearer ${token}`
        })
        setAdded(false)
    }catch(e){
    }
},[token,request])


const pressHandler = event => {


if(added){
 deleteFurnitureBucket(data.article)
 
}else{
  addFurnitureToBucket(data.article)
}
}

const checkFurnitureInBucket = useCallback(async () => {
  try {
    const fetched = await request(`https://morning-production-app.herokuapp.com/api/furniture/bucket/get/${data.article}`, 'GET', null, {
      Authorization: `Bearer ${token}`
    })
    if(fetched.article===data.article){
      setAdded(true)
    }
  } catch (e) {}
  }, [token, request])
  
  useEffect(() => {
    checkFurnitureInBucket()
  }, [checkFurnitureInBucket])
  
  useEffect(() => {
  message(error)
  clearError()
  }, [error, message, clearError])

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
                  артикль: {data.article} <br/>
                  наименование: {data.name} <br/>
                  тип: {data.type} <br/>
                  ширина: {width} {currency}<br/>
                  длина: {length} {currency} <br/>
                  вес: {data.weight} гр<br/>
                  цена: {data.price} руб<br/>
            </p>
            </div>
          </div>
          <Button variant="outlined" onClick={pressHandler}>
            {added ? <i class="material-icons">remove_shopping_cart</i> : <i class="material-icons">add_shopping_cart</i>}
            </Button>
        </div>
      </div>
    )
}