import React from 'react'
import Field from './components/field'

const App: React.FC  = () => {

  const items = []
  for (let i=0; i<9; i++) {  
    items.push({id: i.toString()})
  }

  return (
    <div className="App">
      <Field squares = {items} /> 
    </div>
  )
}

export default App
