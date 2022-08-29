import { Button, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import { useMessage } from "../../../utils/hooks/message.hook";
import { NotTakedManagerOrderShow } from "./NotTakedManagerOrderShow";

export const NotTakedManagerOrderFilter=({dataList})=>{
    const [searching,setSearching]=useState(false)
    const message=useMessage()
    const [searchOrder,setSearchOrder]=useState([{}])

    
    const stages = [
        {
          value: 'STAGE_NEW',
          label: 'Новый',
        },
        {
          value: 'STAGE_CONFIRMED',
          label: 'Оплаченный',
        },
        {
          value: 'STAGE_ACCEPTED',
          label: 'Принятый',
        },
        {
          value: 'STAGE_EXPECTATION',
          label: 'Ожидание',
        },
        {
          value: 'STAGE_PROCESSING',
          label: 'В процессе',
        },
        {
          value: 'STAGE_COMPLETED',
          label: 'Завершенный',
        },
        {
          value: 'STAGE_CANCELLED',
          label: 'Отмененный',
        },
        {
          value: 'STAGE_IN_PROCESS_OF_DELETE',
          label: 'В процессе удаления',
        }
      ];
    
      const [stage, setStage] = useState('');
    
      const handleStage = event => {
        let stage=event.target.value
        setStage(event.target.value);

        setSearchOrder([{}])
        setSearching(false)
       
         (stage)
          let searchData = dataList.filter(order => order.stage === stage)
          if(searchData.length!==0){
            setSearchOrder(searchData)
            setSearching(true)
          }else{
            message('Заказы не найдены')
          }
      };

      if(searching){
        return(<>
        <br/>
        <Button variant="outlined" onClick={()=>setSearching(false)}><i class="material-icons">clear</i></Button>
        {<NotTakedManagerOrderShow dataList={searchOrder}/>}
        </>)
      }

      return(<>
      <br/>
      <br/>
      Выберите этап
      <br/>
             <TextField
                        id="outlined-select-currency"
                        select
                        value={stages}
                        onChange={handleStage}
                      >
                        {stages.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                 </TextField>
         {dataList && !searching && <NotTakedManagerOrderShow dataList={dataList}/>}
      </>)
}