class Calculator{
    constructor(prevOperandTextElement, currentOperandTextElement){
        this.prevOperandTextElement = prevOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear()
    }
    clear(){
        this.prevOperand = ''
        this.currentOperand = ''
        this.operation = undefined
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    append(number){
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    chooseOperation(operation){
        if(this.currentOperand === '') return
        if(this.prevOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.prevOperand= this.currentOperand
        this.currentOperand = ''
        
    }
    compute(){
        let computation
        const prev = parseFloat(this.prevOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.prevOperand = ''
    
    }

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigit = parseFloat(stringNumber.split('.')[0])
        const decimalDigit = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigit)){
            integerDisplay = ''
        }else{
            integerDisplay = integerDigit.toLocaleString('en', {maximumFractionDigits:0}) //allowing no decimal value
        }

        if(decimalDigit != null){
            return `${integerDisplay}.${decimalDigit}`
        }else{
            return integerDisplay
        }
    }
    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)       
        if(this.operation != null){
            this.prevOperandTextElement.innerText = 
            `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`
        }else{
            this.prevOperandTextElement.innerText = ''
        }
        
    }


}

//Query all the elements with 
const numbersButton = document.querySelectorAll('[data-number]')
const operationsButton = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const prevOperandTextElement = document.querySelector('[data-prev-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

//create a new calculator class
const calc = new Calculator(prevOperandTextElement, currentOperandTextElement)

//create an action for all the numberBtns each time they are clicked
numbersButton.forEach(button => {
    button.addEventListener('click', ()=>{
        calc.append(button.innerText)
        calc.updateDisplay()
    })
})

operationsButton.forEach(button => {
    button.addEventListener('click', ()=>{
        calc.chooseOperation(button.innerText)
        calc.updateDisplay()
    })
})




allClearButton.addEventListener('click', button =>{
    calc.clear()
    calc.updateDisplay()
})

equalsButton.addEventListener('click', ()=>{
    calc.compute()
    calc.updateDisplay()
})

deleteButton.addEventListener('click', () =>{
    calc.delete()
    calc.updateDisplay()
})