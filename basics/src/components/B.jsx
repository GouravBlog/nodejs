import { useState, useEffect } from "react";
function B() {
  const [count, setCount] = useState(10);

  //   console.log("count", count);
  //   console.log("setCount", setCount);

  // ComponentDidMount
  useEffect(() => {
    console.log("Component Did Mount");
  }, []);

  //ComponentDidUpdate
  useEffect(() => {
    console.log("ComponentDid Update");
  }, [count]);

  //ComponentWillUnmount
  useEffect(() => {
    return () => {
      console.log("Component Will Unmount Call");
    };
  }, []);

  function inc() {
    setCount(count + 1);
  }

  function dec() {
    setCount(count - 1);
  }

  return (
    <>
      <h1>{count}</h1>
      <button onClick={inc}>inc</button>
      <button onClick={dec}>Dec</button>
    </>
  );
}

export default B;
