
import '../../../utils/styles/vertical-menu.css'
import { CustomerEmailCard } from './CustomerEmailCard'

export const CustomerEmailList=({dataList})=>{
    console.log(dataList)
    return(<>
    <br/>
   <main>
        {
            dataList.map((item,i)=>{ 
              return(
               <>
              <div className="section">
                 <CustomerEmailCard data={item}/>
              </div>
               </>
              ) 
             })
        }
      </main>
      </>)
}