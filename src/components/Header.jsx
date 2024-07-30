import React from "react";
import "./Header.css";


const Header = () => {
  return (
    <div className="main-head">
        <div className="second-div">
        <img
        className="logo"
        src="https://lh6.ggpht.com/aiY9J8YK8Lzr7hMC7nZWlZGiBn8TF_PY7NVNy5U1i5g4zG8yEPzEZTJK2WwbWJUogg"
        alt="logo"
      ></img>
      <h1 className="task">TaskMaster</h1>
      <ul className="ul-head">
        <li className="li-home">Home</li>
        <li className="li-about">About</li>
      </ul>
        </div>
    </div>
  );
};

export default Header;
