

import { useCallback, useContext, useEffect, useState } from 'react';
import { useHttp } from '../../../utils/hooks/http.hook';
import { AuthContext } from '../../../utils/context/AuthContext';
import { Loader } from '../../../utils/component/Loader';
import { UserData } from './UserData';
import { useMessage } from '../../../utils/hooks/message.hook';


export const UserPage=()=>{

  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)
  const [userData, setUserData]=useState([])
  const [username,setUsername]=useState('')
  const [searchUser,setSearchUser]=useState([{}])
  const [searching,setSearching]=useState(false)
  const message = useMessage()

   
  const getAllUsers = useCallback(async () => {
    try {
      const fetched = await request('http://localhost:8080/api/user/get/all', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setUserData(fetched)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    getAllUsers()
  }, [getAllUsers])

  const changeHandler = event => {
    setUsername(event.target.value)
  }

  const pressHandler=event=>{
    if(event.key === 'Enter'){
    let searchData = userData.find(user => user.username === username)
    if(searchData!==undefined){
      searchUser.push(searchData)
      setSearching(true)
    }else{
      message('Пользователь не найден')
    }
    }
  }

  if(searchUser!==undefined && searchUser!==[] && searchUser!==null && searching){
    searchUser.splice(0,1)
    return(<>
    <br/>
    <br/>
    <br/>
    <br/>
    {!loading && <UserData dataList={searchUser}/>}
    </>)
  }

  if (loading) {
    return <Loader/>
  }

  return(
    <>
             <div className="input-field">
                  <input
                    placeholder="Введите email пользователя"
                    id="username"
                    type="text"
                    name="username"
                    className="yellow-input"
                    onChange={changeHandler}
                    onKeyPress={pressHandler}
                  />
                  </div>
    {!loading && !searching && <UserData dataList={userData}/>}
    </>
  )
}
