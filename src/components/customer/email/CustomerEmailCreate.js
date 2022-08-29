import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { useMessage } from "../../../utils/hooks/message.hook"
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Button } from "@mui/material";
import Select from 'react-select'


export const CustomerEmailCreate=()=>{

    const message = useMessage()
    const {token} = useContext(AuthContext)
    const { request, error, clearError} = useHttp()
    const [form,setForm]=useState({})

      const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
      }

      const pressHandler = async event => {
        form.status='STATUS_PRIVATE'
        try {
              await request('https://morning-production-app.herokuapp.com/api/local/email/send', 'POST', {...form},{
              Authorization: `Bearer ${token}`
            })
            message('Сообшение отправлено')
          }catch(e){}
      }

      useEffect(() => {
        window.M.updateTextFields()
      }, [])

      useEffect(() => {
        message(error)
        clearError()
      }, [error, message, clearError])

      return(<>
          <div className="row">
        <div className="">
          <div className="card left">
            <div className='pink lighten-5'>
            <div className="card-content white-text">
              <span className="card-title" style={{color:'rgb(105, 182, 204)'}}>Отправить сообшение</span>
              <div className="pink lighten-5"></div>
      <br/>
      <TextField id="standard-basic" label="Введите название" variant="standard" name="heading" value={form.heading} onChange={changeHandler}/>
      <br/>
    <TextField id="standard-basic" label="Кому отправить" variant="standard" name="whomUserEmail" value={form.whomUserEmail} onChange={changeHandler}/>
      <br/>
      <br/>
      <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Введите сообщение"
            style={{ width: 500 }}
            minRows={5}
            name="message"
            value={form.message}
            onChange={changeHandler}
            />
      <br/>
    <Button variant="text" onClick={pressHandler}>Отправить</Button>
    </div>
    </div>
    </div>
    </div>
    </div>
      </>)
}