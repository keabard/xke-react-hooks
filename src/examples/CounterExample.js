import React, {useState, useEffect, useLayoutEffect} from 'react';

function Counter() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(Number(window.localStorage.getItem('count')) || 0);
  
  const incrementCount = () => setCount(currentCount => currentCount + 1);

  useEffect(
    () => {
      window.localStorage.setItem('count', count);
    },
    [count]
  )

  return (
   <div>
     <button onClick={incrementCount}>
       {count}
     </button>
   </div>
 );
}

export default Counter;