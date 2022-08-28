import React, {useCallback, useContext, useEffect, useState} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import morning from '../img/morning.jpg'
import { Loader } from './Loader'
import '../styles/font.css'


export const Navbar = () => {
  const history = useHistory()
  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)
  const [img,setImg]=useState(null)

  const avatar = useCallback(async () => {
    try {
      const fetched = await request('http://localhost:8080/api/image/get/avatar', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setImg(fetched)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    avatar()
  }, [avatar])

  if (loading) {
    return <Loader/>
  }

  return(
    <>
    {!loading && img && <NavbarJSX img={img}/>}
    </>
  )
}
  const NavbarJSX=({img})=>{
  return (
    <nav className='own-container'>
    <div class="nav-wrapper">
      <NavLink to="/profile" className="brand-logo right">
      <img class="own-image" width="70px" height="64px" src={`data:image/jpeg;base64,${img.imageBytes}`}/>
            </NavLink>
      <ul>
        <li>
        <NavLink to="/">
      <img class="" width="70px" height="64px" src={morning}/>
            </NavLink>
        </li>
      <li><NavLink to="/order">
            <div className='own-black txt'>
              Заказ
              </div>
            </NavLink></li>
          <li><NavLink to="/product">
            <div className='own-black txt'>
              Продукт
              </div>
            </NavLink></li>
          <li><NavLink to="/cloth">
          <div className='own-black txt'>
            Ткань
            </div>
            </NavLink></li>
            <li><NavLink to="/furniture">
          <div className='own-black txt'>
            Фурнитура
            </div>
            </NavLink></li>
            <li><NavLink to="/bucket" className="right">
              <div className='own-black txt'>
              <i class="material-icons">shopping_cart</i>
                </div>
            </NavLink></li>
            <li><NavLink to="/email">
          <div className='own-black txt'>
          <i class="material-icons">email</i>
            </div>
            </NavLink></li>
            <li><NavLink to="/about">
          <div className='own-black txt'>
          <i class="material-icons">info_outline</i>
            </div>
            </NavLink></li>
        </ul>
      </div>
    </nav>
  )
}

