import React from "react"

const Cell: React.FC<{key: string, value: number}>  = (props) => {
    return (
      <div className="cell">
        <div className="cellNumber">{props.value}</div>
      </div>
    )
  }
  
  export default Cell

  //{Math.round(10*Math.random())