import { useState } from "react"
import { BucketLoadClothList } from "./BucketLoadClothList"
import { BucketLoadFurnitureList } from "./BucketLoadFurnitureList"

export const BucketPage=()=>{

    const [isCloth,setIsCloth]=useState(true)
    const [name,setName]=useState('Фурнитуры')
    const pressHandler=()=>{
        setIsCloth(!isCloth)
      if(isCloth){
      setName('Ткани')
      }
      else{
        setName('Фурнитуры')
      }
    }
    return(
        <>
        <br/>
        <button class="btn-small waves-effect waves-light" style={{borderRadius:'50px',color:'black',backgroundColor:'rgb(245, 237, 245)'}} name="action" onClick={()=>pressHandler()}><div className="txt">{name}</div></button>
        <br/>
 {isCloth ? <BucketLoadClothList/> : <BucketLoadFurnitureList/>} 
        </>
    )
}