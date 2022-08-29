import { useCallback, useContext, useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { Loader } from "../../../utils/component/Loader"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { DirectorOrderCard } from "./DirectorOrderCard"

export const DirectorOrderList=()=>{
   
  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)
  const [orders,setOrders]=useState([{}])

  const getAllOrders = useCallback(async () => {
    try {
      const fetched = await request('http://localhost:8080/api/order/get/any/all', 'GET', null, {
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
    {
        orders.map((item,i)=>{ 
          if(orders[i].name===''){
               
          }else{
          return(
           <>
           <DirectorOrderCard data={item}/>
           </>
          ) 
          }
         })
    }
  
  </>)
}