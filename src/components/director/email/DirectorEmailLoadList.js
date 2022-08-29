import { useCallback, useContext, useEffect, useState } from "react"
import { Loader } from "../../../utils/component/Loader"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { DirectorEmailList } from "./DirectorEmailList"

export const DirectorEmailLoadList=()=>{

    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const [messages, setMessages]=useState([])


  const getAllMessages = useCallback(async () => {
    try {
      const fetched = await request('https://morning-production-app.herokuapp.com/api/local/email/get/all', 'GET', null, {
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
  {messages.length>0 && !loading && <DirectorEmailList dataList={messages}/>}
  </>)
}