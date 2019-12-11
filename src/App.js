import React, { useState } from 'react'

function App(props) {
  const [count, setCount] = useState(1)
  return <div>
    <h1>Fanny, {props.title}</h1>
    <h3>Count is {count}</h3>
    <button onClick={() => setCount(count+1)}>Try Click Me</button>
  </div>
}

export default <App title="Learn React SSR, Awesome!"></App>