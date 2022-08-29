import { TakedManagerOrderCard } from "./TakedManagerOrderCard"

export const TakedManagerOrderShow=({dataList})=>{
    return(<>
        {
            dataList.map((item,i)=>{ 
              if(dataList[i].name===''){
                   
              }else{
              return(
               <>
               <TakedManagerOrderCard data={item}/>
               </>
              ) 
              }
             })
        }
      
      </>)
} 