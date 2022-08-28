
import '../../../utils/styles/vertical-menu.css'
import { ManagerEmailCard } from './ManagerEmailCard'

export const ManagerEmailList=({dataList})=>{
    console.log(dataList)
    return(<>
    <br/>
   <main>
        {
            dataList.map((item,i)=>{ 
              return(
               <>
              <div className="section">
                 <ManagerEmailCard data={item}/>
              </div>
               </>
              ) 
             })
        }
      </main>
      </>)
}