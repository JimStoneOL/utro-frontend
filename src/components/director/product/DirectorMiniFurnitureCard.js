import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useEffect, useState } from 'react';
import '../../../utils/styles/placeholder.css'
import { MenuItem, TextField } from '@mui/material';

export const DirectorMiniFurnitureCard=({data,selectFurniture})=>{

  const [selected,setSelected]=useState(false)

  const [form,setForm]=useState({
    furnitureId:'',placement:'',width:null,length:null,turn:null,amount:null
  })

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
    var isSelected=selectFurniture('check '+data.article)
    setSelected(isSelected)
  },[])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const pressHandler=event=>{
    
    if(currency==='м'){
      form.length=form.length*1000
      form.width=form.width*1000
      setCurrency('мм')
      
    }else if(currency==='см'){

      form.length=form.length*10
      form.width=form.width*10
      setCurrency('мм')

    }
    setSelected(selectFurniture(data.article,form))
  }

    return(<>
    <Card sx={{ maxWidth: 345,backgroundColor:'#b2dfdb'}} key={data.article}>
      <CardMedia
        component="img"
        height="140"
        image={`data:image/jpeg;base64,${data.imageBytes}`}
        alt="cloth image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
                                {data.color} <br/>
                                {data.price} руб <br/>

                  <div className="input-field">
                  <input
                    hidden={selected}
                    readOnly={selected}
                    placeholder="Укажите размещение"
                    id="placement"
                    type="text"
                    name="placement"
                    className="yellow-input"
                    value={form.placement}
                    onChange={changeHandler}
                  />
                  </div>
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
                  <div className="input-field">
                  <input
                    hidden={selected}
                    readOnly={selected}
                    placeholder="Укажите ширину"
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
                    hidden={selected}
                    readOnly={selected}
                    placeholder="Укажите длину"
                    id="length"
                    type="text"
                    name="length"
                    className="yellow-input"
                    value={form.length}
                    onChange={changeHandler}
                  />
                  </div>
                  <div className="input-field">
                  <input
                    hidden={selected}
                    readOnly={selected}
                    placeholder="Укажите поворот"
                    id="turn"
                    type="text"
                    name="turn"
                    className="yellow-input"
                    value={form.turn}
                    onChange={changeHandler}
                  />
                  </div>
                  <div className="input-field">
                  <input
                    hidden={selected}
                    readOnly={selected}
                    placeholder="Укажите количество"
                    id="amount"
                    type="text"
                    name="amount"
                    className="yellow-input"
                    value={form.amount}
                    onChange={changeHandler}
                  />
                  </div>
                                
        </Typography>
      </CardContent>
      <CardActions>
      
        <a style={{cursor: 'pointer'}} onClick={pressHandler}>
          {selected ? <i class="material-icons">check</i> : <i class="material-icons">crop_din</i>}
        </a>
      </CardActions>
    </Card>
    </>)
}