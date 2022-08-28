
import { useMessage } from "../../../utils/hooks/message.hook"
import { useState } from "react"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { MenuItem, Slider, TextField } from "@mui/material"
import { ManagerClothList } from "./ManagerClothList";


function valuetext(value) {
    return `${value}`;
  }

export const ManagerClothFilter=({dataList,update})=>{

    const message=useMessage()

    const [searching,setSearching]=useState(false)
    const [clothName,setClothName]=useState('')
    const [searchCloth,setSearchCloth]=useState([{}])
    const [filterCloth,setFilterCloth]=useState([{}])

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [filtering,setFiltering]=useState(false)

    const [widthValue, setWidthValue] = useState([minWidth(), maxWidth()]);
    const [lengthValue, setLengthValue] = useState([minLength(), maxLength()]);
    const [priceValue, setPriceValue] = useState([minPrice(), maxPrice()]);

    const types = [
      {
        value: 'наименование',
        label: 'наименование',
      },
      {
        value: 'цвет',
        label: 'цвет',
      },
      {
        value: 'рисунок',
        label: 'рисунок',
      }
    ];
  
    const [type, setType] = useState('наименование');
  
    const handleType = event => {
  
      setType(event.target.value);
  
    };


    const changeWidth = (event, newValue) => {
      setWidthValue(newValue);
    };

    const changeLength = (event, newValue) => {
      setLengthValue(newValue);
    };


    const changePrice = (event, newValue) => {
      setPriceValue(newValue);
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

    const changeHandler = event => {
        setClothName(event.target.value)
      }
      
    
      const pressHandler=event=>{
        if(event.key === 'Enter'){
          setSearchCloth([{}])
          setSearching(false)
          if(type==='наименование'){
            let searchData = dataList.filter(cloth => cloth.name.toLowerCase() === clothName.toLowerCase())
            if(searchData.length!==0){
              setSearchCloth(searchData)
              setSearching(true)
            }else{
              message('Ткани не найдены')
            }
          }else if(type==='цвет'){
            let searchData = dataList.filter(cloth => cloth.color.toLowerCase() === clothName.toLowerCase())
            if(searchData.length!==0){
              setSearchCloth(searchData)
              searchCloth.push(searchData)
              setSearching(true)
            }else{
              message('Ткани не найдены')
            }
          }
          else if(type==='рисунок'){
            let searchData = dataList.filter(cloth => cloth.drawing.toLowerCase() === clothName.toLowerCase())
            if(searchData.length!==0){
              setSearchCloth(searchData)
              searchCloth.push(searchData)
              setSearching(true)
            }else{
              message('Ткани не найдены')
            }
          }
        }
      }

      function bubbleSortWidth(arr) {
        for (let j = arr.length - 1; j > 0; j--) {
          for (let i = 0; i < j; i++) {
            if (arr[i].width > arr[i + 1].width) {
              let temp = arr[i];
              arr[i] = arr[i + 1];
              arr[i + 1] = temp;
            }
          }
        }
        return arr
      }

      function maxWidth(){
       return bubbleSortWidth(dataList)[dataList.length-1].width
      }

      function minWidth(){
        return bubbleSortWidth(dataList)[0].width
       }
      
       //--------------------------------------------------

       function bubbleSortLength(arr) {
        for (let j = arr.length - 1; j > 0; j--) {
          for (let i = 0; i < j; i++) {
            if (arr[i].length > arr[i + 1].length) {
              let temp = arr[i];
              arr[i] = arr[i + 1];
              arr[i + 1] = temp;
            }
          }
        }
        return arr
      }

      function maxLength(){
       return bubbleSortLength(dataList)[dataList.length-1].length
      }

      function minLength(){
        return bubbleSortLength(dataList)[0].length
       }

       //-----------------------------------------------------------------
       
      

       function bubbleSortPrice(arr) {
        for (let j = arr.length - 1; j > 0; j--) {
          for (let i = 0; i < j; i++) {
            if (arr[i].price > arr[i + 1].price) {
              let temp = arr[i];
              arr[i] = arr[i + 1];
              arr[i + 1] = temp;
            }
          }
        }
        return arr
      }

      function maxPrice(){
       return bubbleSortPrice(dataList)[dataList.length-1].price
      }

      function minPrice(){
        return bubbleSortPrice(dataList)[0].price
       }

      const filterPressHandler=event=>{

        setFilterCloth([{}])
        setFiltering(false)
        let filtered=dataList.filter(item=>widthValue[0] <= item.width && item.width <= widthValue[1] && lengthValue[0] <= item.length && item.length <= lengthValue[1] &&  priceValue[0] <= item.price && item.price <= priceValue[1])
  
        if(filtered.length!==0){
          setFilterCloth(filtered)
          setFiltering(true)
        }else{
          message('Ткани не найдены')
        }
      }

      if(searching){
        return(<>
        <br/>
        <Button variant="outlined" onClick={()=>setSearching(false)}><i class="material-icons">clear</i></Button>
        {<ManagerClothList dataList={searchCloth} update={update}/>}
        </>)
      }else

      if(filtering){
        return(<>
         <br/>
        <Button variant="outlined" onClick={()=>setFiltering(false)}><i class="material-icons">clear</i></Button>
        {<ManagerClothList dataList={filterCloth} update={update}/>}

        </>)
      }


      return(
        <>
          <div className="input-field">
          <TextField
                        id="outlined-select-currency"
                        select
                        value={type}
                        onChange={handleType}
                      >
                        {types.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                 </TextField>
                  <input
                    placeholder={`Напишите ${type} ткани`}
                    id="clothName"
                    type="text"
                    name="clothName"
                    className="yellow-input"
                    onChange={changeHandler}
                    onKeyPress={pressHandler}
                  />
            </div>
            <Button onClick={handleOpen}>Фильтр</Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      Фильтры
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Ширина
                    <Box sx={{ width: 300 }}>
                        <Slider
                          getAriaLabel={() => 'Ширина'}
                          min={minWidth()}
                          max={maxWidth()}
                          value={widthValue}
                          onChange={changeWidth}
                          valueLabelDisplay="auto"
                          getAriaValueText={valuetext}
                        />
                      </Box>
                      Длина
                    <Box sx={{ width: 300 }}>
                        <Slider
                          getAriaLabel={() => 'Длина'}
                          min={minLength()}
                          max={maxLength()}
                          value={lengthValue}
                          onChange={changeLength}
                          valueLabelDisplay="auto"
                          getAriaValueText={valuetext}
                        />
                      </Box>
                      Цена
                    <Box sx={{ width: 300 }}>
                        <Slider
                          getAriaLabel={() => 'Вес'}
                          min={minPrice()}
                          max={maxPrice()}
                          value={priceValue}
                          onChange={changePrice}
                          valueLabelDisplay="auto"
                          getAriaValueText={valuetext}
                        />
                      </Box>
                    </Typography>
                    <Button variant="outlined" onClick={filterPressHandler}>Принять</Button>
                  </Box>
                </Modal>
        {dataList && !searching && !filtering && <ManagerClothList dataList={dataList} update={update}/>}
        </>
      )
}