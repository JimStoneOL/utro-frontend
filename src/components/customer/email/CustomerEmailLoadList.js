import { useCallback, useContext, useEffect, useState } from "react"
import { Loader } from "../../../utils/component/Loader"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { CustomerEmailList } from "./CustomerEmailList"

export const CustomerEmailLoadList=()=>{

    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const [messages, setMessages]=useState([])


  const getAllMessages = useCallback(async () => {
    try {
      const fetched = await request('http://localhost:8080/api/local/email/get/all', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
     setMessages(fetched)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    getAllMessages()
  }, [getAllMessages])
  
  if (loading) {
    return <Loader/>
  }
  return(<>
  {messages.length>0 && !loading && <CustomerEmailList dataList={messages}/>}
  </>)
}