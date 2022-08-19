import { MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export const DirectorFurnitureCard=({data})=>{

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

    return(
        <div class="col s12 m7">
        <div class="card horizontal">
          <div class="card-image">
            <img src={`data:image/jpeg;base64,${data.imageBytes}`}/>
          </div>
          <div class="card-stacked">
          <TextField
                        id="outlined-select-currency"
                        select
                        label="Select"
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
                  вес: {data.weight} <br/>
                  цена: {data.price} <br/>
            </p>
            </div>
          </div>
        </div>
      </div>
    )

}