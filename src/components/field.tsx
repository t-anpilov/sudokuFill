import React from "react"
import Square, {SquareItems} from "./square"
import NumbersArray from "../models/numbersArray"

interface FieldItems {
  squares: {id: string}[]
}

const Field: React.FC<FieldItems>  = (props) => {
   
  const setItems = (array: number[]) => {
    const values = array
    const items: SquareItems = {cells:[]}
      for (let i=0; i<9; i++)  {
        let id = Math.ceil(10000*Math.random()).toString()
        items.cells.push({id: id, value: values[i]}) 
    } 
    return items.cells   
  }

  
  return (
      <div className="field">
        {           
          props.squares.map((item, index) => {               
              return <Square cells={setItems(NumbersArray[index])} key={item.id}/>                    
          })
        }        
        
      </div>
    )
  }
  
  export default Field