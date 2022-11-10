import React, { useEffect, useState } from "react";

const InputBar = (props) => {
  const [inputValue, setInputValue] = useState("");
  
  return <input onChange={(e) => setInputValue(e.target.value)} value={inputValue}
  onKeyPress={(e)=> {
    if (e.key==="Enter" && inputValue.trim() === "") {
      props.addTask({"label": e.target.value, "done":false})
    }
  }}/>;
};

export default InputBar;
