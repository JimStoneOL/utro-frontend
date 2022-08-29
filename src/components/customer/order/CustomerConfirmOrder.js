import { Button } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { useMessage } from "../../../utils/hooks/message.hook"

export const CustomerConfirmOrder=({data})=>{

  const message = useMessage()
  const {token} = useContext(AuthContext)
  const {request,loading,error,clearError} = useHttp()
  const [confirmed,setConfirmed]=useState(false)

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])


    const pressHandler=async event=>{

        try {
            const fetched = await request(`https://morning-production-app.herokuapp.com/api/order/confirm/${data.id}`, 'POST', null,{
              Authorization: `Bearer ${token}`
            })
            message('Успешно подтверждено')
            setConfirmed(true)
          }catch(e){}
    }

    const Confirmed=()=>{
       return(
        <>
        <div>Подтверждено</div>
        </>
       )
    }

 const DontConfirmed=()=>{
    return(
        <>
              <div class="row">
    <div class="col s12 m6">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">Номер заказа {data.id}</span>
         <p>
             Цена: {data.price} руб <br/>
         </p>
        </div>
        <div class="card-action">
                  <input
                    placeholder="Номер"
                    id="number"
                    type="text"
                    name="number"
                    className="yellow-input"
                  />
                       <input
                    placeholder="Срок действия"
                    id="expiration"
                    type="text"
                    name="expiration"
                    className="yellow-input"
                  />
                       <input
                    placeholder="Имя держателя"
                    id="name"
                    type="text"
                    name="name"
                    className="yellow-input"
                  />
                       <input
                    placeholder="Код CVV"
                    id="cvv"
                    type="text"
                    name="cvv"
                    className="yellow-input"
                  />
          
      <Button variant="outlined" color="error" onClick={pressHandler}>Подтвердить</Button>
        </div>
      </div>
    </div>
  </div>
        </>
    )
 }
 return(
   <>
   {confirmed ? <Confirmed/> : <DontConfirmed/>}
   </>
)
}