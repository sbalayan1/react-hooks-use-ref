import { makeRandomNumber } from "../utils";
import {useRef, useEffect, useState} from 'react'

function Ticker() {
  const [price, setPrice] = useState(0)
  const [color, setColor] = useState('black')
  const prevPrice = useRef(price)
  const elementRef = useRef()

  useEffect(() => {
    let priceAction = setInterval(() => {
      let randomNumber = makeRandomNumber(price)
      setPrice(randomNumber)

      if (randomNumber > prevPrice.current) {
        setColor('green')
      } else if (randomNumber < prevPrice.current) {
        setColor('red')
      } else {
        setColor('black')
      }
  
      prevPrice.current = randomNumber
    }, 1000)

    return function cleanup() {
      clearInterval(priceAction)
    }
  }, [])

  let handleClick = () => {
    if (elementRef.current.textContent === 'TickerMaster') {
      elementRef.current.textContent = 'Oh no you changed me!!'
    } else {
      elementRef.current.textContent = 'TickerMaster'
    }
  }

  return (
      <div>
          <h1 ref={elementRef}>TickerMaster</h1>
          <h2 style={{ color: color }} onClick={handleClick}>Price: ${price}</h2>
      </div>
  );
}

export default Ticker;
