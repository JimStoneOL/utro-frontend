import { CustomerFurnitureProductDetailList } from "./CustomerFurnitureProductDetailList"


export const CustomerFurnitureDetailList=({dataList})=>{


    return(<>
        {
            dataList.map((item,i)=>{ 

              return(
               <>
               <CustomerFurnitureProductDetailList data={item}/>
               </>
              ) 
              
             })
        }
      
      </>)

}