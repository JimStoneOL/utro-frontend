
import { useMessage } from "../../../utils/hooks/message.hook"
import { useState } from "react"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { MenuItem, Slider, TextField } from "@mui/material"
import { DirectorProductList } from "./DirectorProductList";


function valuetext(value) {
    return `${value}`;
  }

export const DirectorProductFilter=({dataList})=>{

    const message=useMessage()

    const [searching,setSearching]=useState(false)
    const [productName,setProductName]=useState('')
    const [searchProduct,setSearchProduct]=useState([{}])
    const [filterProduct,setFilterProduct]=useState([{}])

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [filtering,setFiltering]=useState(false)

    const [widthValue, setWidthValue] = useState([minWidth(), maxWidth()]);
    const [lengthValue, setLengthValue] = useState([minLength(), maxLength()]);

   
    const changeWidth = (event, newValue) => {
      setWidthValue(newValue);
    };

    const changeLength = (event, newValue) => {
      setLengthValue(newValue);
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
        setProductName(event.target.value)
      }
      
    
      const pressHandler=event=>{
        if(event.key === 'Enter'){
          setSearchProduct([{}])
          setSearching(false)
            let searchData = dataList.filter(product => product.name.toLowerCase() === productName.toLowerCase())
            if(searchData.length!==0){
              setSearchProduct(searchData)
              setSearching(true)
            }else{
              message('Продукты не найдены')
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


      const filterPressHandler=event=>{

        setFilterProduct([{}])
        setFiltering(false)
        let filtered=dataList.filter(item=>widthValue[0] <= item.width && item.width <= widthValue[1] && lengthValue[0] <= item.length && item.length <= lengthValue[1])
  
        if(filtered.length!==0){
          setFilterProduct(filtered)
          setFiltering(true)
        }else{
          message('Продукты не найдены')
        }
      }

      if(searching){
        return(<>
        <br/>
        <Button variant="outlined" onClick={()=>setSearching(false)}><i class="material-icons">clear</i></Button>
        {<DirectorProductList dataList={searchProduct}/>}
        </>)
      }else

      if(filtering){
        return(<>
         <br/>
        <Button variant="outlined" onClick={()=>setFiltering(false)}><i class="material-icons">clear</i></Button>
        {<DirectorProductList dataList={filterProduct}/>}

        </>)
      }


      return(
        <>
          <div className="input-field">

                  <input
                    placeholder={`Напишите наименование продукта`}
                    id="productName"
                    type="text"
                    name="productName"
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
                    </Typography>
                    <Button variant="outlined" onClick={filterPressHandler}>Принять</Button>
                  </Box>
                </Modal>
        {dataList && !searching && !filtering && <DirectorProductList dataList={dataList}/>}
        </>
      )
}