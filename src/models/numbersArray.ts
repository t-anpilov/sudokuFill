type NumArray = Array<number>[]

type ResultOfCalculation = {  
  finalArray: NumArray,
  isUnResolved: boolean
}

enum comparingArrays {
  rows, 
  columns
}

let NumbersArray: NumArray = []

const MaxIterations: number = 100

const setNumber = () => {    
    let random = 1 - 0.5 + Math.random() * (9);
    return Math.round(random);
}

const putNumber = (array: Array<number>) : void => {

  for (let i=0; array.length < 9; i++) {
    let nextValue = setNumber()
    if (!array.includes(nextValue) ) {
      array.push(nextValue)
    } else {
      continue
    }
  }
}

const putNumberComparedToOneLine = (prevArrays: NumArray, condition: comparingArrays) => {
  let nextArray: Array<number> = [] 
  
  for (let i=0; i<3; i++) {
    
    for (let j=0; j<3; j++) {
      
      let maxCount: number = 0
      let isUnchecked: boolean = true
      for (let n=0; isUnchecked; n++) {
        
        let nextValue = setNumber()
        maxCount++        
        if (!nextArray.includes(nextValue) && !prevArrays[j].includes(nextValue)) {
          isUnchecked = false
          if (condition === 0) {
            nextArray[i+j*3] = nextValue
          } else if (condition === 1){
            nextArray[j+i*3] = nextValue
          }
          
        } else if (maxCount<MaxIterations) {
          continue
        } else {          
          return false      
        }       
      }    
    }    
  } 

  return nextArray
}

const putNumberComparedToBoth = (rows: NumArray, columns: NumArray, order: number, lastSquares:boolean) => {
  let nextArray: Array<number> = []  

  for (let i=0; i<3; i++) {
    
    for (let j=0; j<3; j++) {
      
      let isUnchecked: boolean = true
      let maxCount: number = 0
      for (let n=0; isUnchecked; n++) {
        let nextValue = setNumber()
        let lines:number =  lastSquares ? 3 : 0
        maxCount++
        
        if (
          !nextArray.includes(nextValue) 
          && !columns[j+3*(order+1)].includes(nextValue) 
          && !rows[i+3+lines].includes(nextValue)
        ) {
          isUnchecked = false
          nextArray[j+i*3] = nextValue
        } else if (maxCount<MaxIterations) {
          continue
        }  else {
          return false                
        }     
      }    
    }    
  }

  return nextArray
}

function fillField() {

    let resultArray: NumArray = []
    let condition = false

    let rowArrays: NumArray = []
    let columnArrays: NumArray = [] 

    let squareArray: Array<number> = []
    for (let i=0; i<9; i++) {            
      putNumber(squareArray) 
    }

    resultArray.push(squareArray)     

    for (let j=0; j<3; j++) {
      let newLineArray: number[] = []
      let newColumnArray: number[] = []
      for (let k=0; k<3; k++) {
        newLineArray.push(squareArray[j*3+k])
        newColumnArray.push(squareArray[j+k*3])
      }
      rowArrays.push(newLineArray)
      columnArrays.push(newColumnArray)
    }
    
    for (let n=0; n<2; n++) {
      
      let newArray: Array<number> = []
      let isNotReady = true
      for (let m=0; isNotReady; m++) {
        let result = putNumberComparedToOneLine(rowArrays, 0)
        if (result && Array.isArray(result)) {
          newArray = result
          isNotReady = false
        } else {
          console.log('oops')
          continue          
        }
      }
         
      resultArray.push(newArray)

      for (let j=0; j<3; j++) {      
        let newColumnArray: number[] = []
        for (let k=0; k<3; k++) {
          rowArrays[j].push(newArray[k+j*3])
          newColumnArray.push(newArray[j+k*3])
        }      
        columnArrays.push(newColumnArray)
      }
    }  

    let arrayN4: Array<number> = [] 
    let isNotReady = true
      for (let m=0; isNotReady; m++) {
        let result = putNumberComparedToOneLine(columnArrays, 1)
        if (result && Array.isArray(result)) {
          arrayN4 = result
          isNotReady = false
        } else {
          console.log('oops')
          continue          
        }
      }    
    
    resultArray.push(arrayN4)

    for (let j=0; j<3; j++) {            
      let newLineArray: number[] = []
      for (let k=0; k<3; k++) { 
        newLineArray.push(arrayN4[k+j*3 ])      
        columnArrays[j].push(arrayN4[j+k*3])        
      }      
      rowArrays.push(newLineArray)
    }

    for (let n=0; n<2; n++) {
      
      let newArray: Array<number> = []   

      let isNotReady = true
      let maxCount: number = 0
      for (let m=0; isNotReady; m++) {
        maxCount++
        let result = putNumberComparedToBoth(rowArrays, columnArrays, n, false)
        if (result && Array.isArray(result)) {
          newArray = result
          isNotReady = false
        } else if (maxCount<MaxIterations) {          
          continue          
        } else {
          console.log('repeat')
          condition = true
          break
        }
      }

      resultArray.push(newArray)

      for (let j=0; j<3; j++) { 
        for (let k=0; k<3; k++) {
          rowArrays[j+3].push(newArray[k+j*3])
          columnArrays[j+3*(n+1)].push(newArray[j+k*3])
        }
      }
    }    
    
    let arrayN7: Array<number> = [] 
    isNotReady = true
    let maxCount: number = 0
      for (let m=0; isNotReady; m++) {
        maxCount++
        let result = putNumberComparedToOneLine(columnArrays, 1)
        if (result && Array.isArray(result)) {
          arrayN7 = result
          isNotReady = false
        } else if (maxCount<MaxIterations) {          
          continue          
        } else {
          console.log('repeat')
          condition = true
          break
        }
      }    
    
    resultArray.push(arrayN7)    

    for (let j=0; j<3; j++) {            
      let newLineArray: number[] = []
      for (let k=0; k<3; k++) { 
        newLineArray.push(arrayN7[k+j*3 ])      
        columnArrays[j].push(arrayN7[j+k*3])        
      }      
      rowArrays.push(newLineArray)
    }


    for (let n=0; n<2; n++) {
      
      let newArray: Array<number> = []   

      let isNotReady = true
      let maxCount: number = 0
      for (let m=0; isNotReady; m++) {
        maxCount++
        let result = putNumberComparedToBoth(rowArrays, columnArrays, n, true)
        if (result && Array.isArray(result)) {
          newArray = result
          isNotReady = false
        } else if (maxCount<MaxIterations) {          
          continue          
        } else {
          console.log('repeat')
          condition = true
          break
        }
      }

      resultArray.push(newArray)

      for (let j=0; j<3; j++) { 
        for (let k=0; k<3; k++) {
          rowArrays[j+6].push(newArray[k+j*3])
          columnArrays[j+3*(n+1)].push(newArray[j+k*3])
        }
      }
    }
    
    console.log(rowArrays)
    console.log(columnArrays) 

    //for (let n=0; n<3; n++) {
     // resultArray.push(arrayN7) } 
    
     const CurrentResult: ResultOfCalculation = {
      finalArray: resultArray,
      isUnResolved: condition
     }
     return CurrentResult
      
    //checkLines(linesArray, conditionLine)    
   //}     
}

const Result: ResultOfCalculation = {  
  finalArray: [],
  isUnResolved: true
}

for (let n=0; Result.isUnResolved; n++) {  
  let someResult: ResultOfCalculation = fillField()
  Object.assign(Result, someResult)   
}

NumbersArray = [...Result.finalArray]

export default NumbersArray