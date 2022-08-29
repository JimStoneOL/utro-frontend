import { ManagerOrderCard } from "./ManagerOrderCard"

export const NotTakedManagerOrderShow=({dataList})=>{
    return(<>
        {
            dataList.map((item,i)=>{ 
              if(dataList[i].name===''){
                   
              }else{
              return(
               <>
               <ManagerOrderCard data={item}/>
               </>
              ) 
              }
             })
        }
      
      </>)
} 