import { useState, useEffect } from "react";

function App(){
  const [count, setCount] = useState(0);

  useEffect(() =>{
    document.title = `Count: ${count}`;
  }, [count]);

  useEffect(() => {
    console.log("Component rendered");
  });

  useEffect(() => {
    console.log("Page loaded");
  }, []);

  useEffect(() => {
    console.log("Count changed");
  }, [count]);
  
  const increase = () =>{
    setCount((precount) => precount+1);
  }

  const decrease = () =>{
    setCount((precount) => precount-1);
  }

  const reset = () => {
    setCount(0);
  };

  return(
    <div className="page">
      <div className="card">
        <h1>Usestate</h1>
        <h2>{count}</h2>
        <div className="buttons">
          <button onClick={increase}>Increase</button>
          <button onClick={decrease}>Decrease</button>
          <button onClick={reset}>Reset</button>
        </div>
      </div>
    </div>

  );
}

export default App;