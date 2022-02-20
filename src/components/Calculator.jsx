import { useState } from 'react'

const Calculator = () => {

  // States
  const [prevOps, setPrevOps] = useState('')
  const [input, setInput] = useState('0')

  // Listen for user click on button
  document.onmouseup = (event) => {

    function disableBtns(bool) {
      document.querySelector('.keypad').childNodes.forEach(button => {
        button.disabled = bool
      })
    }

    // Display length limit to 20 digits
    if (input.length > 20) {
      // Digit limit met warning
      disableBtns(true)

      // Remove warning
      setTimeout(() => {
        disableBtns(false)
      }, 1000)
      return
    }

    const target = event.target.value
    const isSign = /[\/x\-+]/.test(input)

    switch (target) {
      case 'AC':
        setInput('0')
        setPrevOps('')
        return  // Don't setPrevOps again

      case '0':
        // Don't add leading zeros in prevOps after sign
        if (isSign) {
          setInput(target)
          return
        }
        setInput(input+target)
        setPrevOps(prevOps+target)
        break;

      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        if (input === '0') {
          setInput(target)          // Don't display leading zeros
          setPrevOps(prevOps+target)
        } else {
          if (/\d+/.test(input)) {
            setInput(input+target)
            setPrevOps(prevOps+target)
          } else {
            setInput(target)        // Prevent multiple operation sign
            setPrevOps(prevOps+target)
          }
        }
        break;

      case '-':
        if (/\d[\/x+]$/.test(prevOps)) {
          setInput(target)
          setPrevOps(prevOps+target)
          return
        }
      case '/':
      case 'x':
      case '+':
        // Prevent repeating sign
        if (isSign) {
          setInput(target)
          setPrevOps(prevOps.slice(0, prevOps.length - 1) + target)
          return
        }
        setInput(target)
        setPrevOps(prevOps+target)

        break;

      case '.':
        // Display leading zero if this is the first input
        if (!prevOps) {
          setInput('0.')
          setPrevOps('0.')
          return
        }

        // Add zero before decimal immediately after sign
        if (isSign) {
          setInput('0.')
          setPrevOps(prevOps+'0.')
          return
        }

        // Prevent multiple dot within number
        if (!input.includes('.')) {
          setInput(input+'.')
          setPrevOps(prevOps+'.')
          return
        }
        return

      case '=':
        if (prevOps.includes('=')) {
          return
        }

        try {
          const total = Math.round(eval(prevOps.replace(/x/g, '*').match(/^-?\d.*/)[0]) * 10000) / 10000

          setInput(total)
          setPrevOps(prevOps+'='+total)
        } catch (e) {
          console.log('Expression ending with a sign')
        }
        return

      default:
        return
    }

    // Reset screen if equal sign is present
    if (prevOps.includes('=')) {
      setInput(target)
      setPrevOps(target)
    }
  }

  return (
    <div className="calculator">
      <div className="screen">
        <p id="prevOps">{prevOps}</p>
        <p id="display">{input}</p>
      </div>
      <div className="keypad">
        <button id="clear" value="AC">AC</button>
        <button id="divide" className="operation" value="/">/</button>
        <button id="multiply" className="operation" value="x">x</button>
        <button id="seven" className="number" value="7">7</button>
        <button id="eight" className="number" value="8">8</button>
        <button id="nine" className="number" value="9">9</button>
        <button id="subtract" className="operation" value="-">-</button>
        <button id="four" className="number" value="4">4</button>
        <button id="five" className="number" value="5">5</button>
        <button id="six" className="number" value="6">6</button>
        <button id="add" className="operation" value="+">+</button>
        <button id="one" className="number" value="1">1</button>
        <button id="two" className="number" value="2">2</button>
        <button id="three" className="number" value="3">3</button>
        <button id="equals" value="=">=</button>
        <button id="zero" className="number" value="0">0</button>
        <button id="decimal" className="number" value=".">.</button>
      </div>
    </div>
  )
}

export default Calculator
