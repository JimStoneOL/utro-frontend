import { useCallback, useContext, useEffect, useState } from "react"
import { Loader } from "../../../utils/component/Loader"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { CustomerOrderFilter } from "./CustomerOrderFilter"

export const CustomerOrderList=()=>{

  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)
  const [orders,setOrders]=useState([{}])

  const getAllOrders = useCallback(async () => {
    try {
      const fetched = await request('https://morning-production-app.herokuapp.com/api/order/get/all', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setOrders(fetched)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    getAllOrders()
  }, [getAllOrders])

  if(!(orders.length>0) && !loading){
    return <h6 className="center" style={{marginTop:'20%'}}>Пусто</h6>
  }
  
  if (loading) {
    return <Loader/>
  }
  return(<>
    {orders.length>0 && !loading && <CustomerOrderFilter dataList={orders}/>}
  </>)
}