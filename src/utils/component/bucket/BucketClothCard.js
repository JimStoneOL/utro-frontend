import { Button, MenuItem, TextField } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";

export const BucketClothCard=({data,update})=>{

  const {loading, request,error,clearError} = useHttp()
  const {token} = useContext(AuthContext)
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

  const deleteClothBucket=useCallback(async (article) => { 
    try{
      await request(`http://localhost:8080/api/cloth/bucket/delete/${article}`, 'POST', null,{
      Authorization: `Bearer ${token}`
    })
    update()
}catch(e){
}
},[token,request])


const pressHandler = event => {
  deleteClothBucket(data.article)
}


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
          <Button variant="outlined"  onClick={pressHandler}>
            <i class="material-icons">remove_shopping_cart</i>
            </Button>
        </div>
      </div>
    )
}