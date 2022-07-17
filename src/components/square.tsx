import React from "react"
import Cell from "./cell"

export interface SquareItems {
  cells: Array<{id: string, value: number}>
}

const Square: React.FC<SquareItems>  = (props) => {
    
          
    return (
      <div className="square">
        {props.cells.map((item) => {            
            return <Cell key={item.id} value={item.value}/>
          }
        )} 
      </div>
    )
}
      
  
export default Square