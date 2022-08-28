import { CustomerOrderCard } from "./CustomerOrderCard"

export const CustomerOrderShow=({dataList})=>{
    return(<>
        {
            dataList.map((item,i)=>{ 
              if(dataList[i].name===''){
                console.log('undefined') 
              }else{
              return(
               <>
               <CustomerOrderCard data={item}/>
               </>
              ) 
              }
             })
        }
      
      </>)
}