import React, { useState } from "react";
import { axiosWithAuth } from "../axiosWithAuth";

const Login = props => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: ""
  });

  const submit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/login", userInfo)
      .then(res => {
        console.log("Login.js: We are in", res);
        localStorage.setItem("token", res.data.payload);
        props.history.push("/BubblePage");
      })
      .catch(err => console.log("Login.js: Try again", err.message));
  };

  const handleChange = e => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    });
  };
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <div>
        <form onSubmit={submit}>
          <input
            type="text"
            name="username"
            value={userInfo.username}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            value={userInfo.password}
            onChange={handleChange}
          />
          <button>Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
