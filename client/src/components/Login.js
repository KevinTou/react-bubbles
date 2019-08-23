import React, { useState, useEffect } from "react";
import axios from "axios";

const Login = props => {
  // This would usually be empty strings but for the sake of saving time,
  // the user credentials were hard-coded (as well as the fact that it is the only user)
  const initialLogin = {
    username: "Lambda School",
    password: "i<3Lambd4",
  };

  const [login, setLogin] = useState(initialLogin);
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const handleChange = e => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/login", login)
      .then(res => {
        // console.log("login details: ", res.data);
        // We do not need to JSON.stringify because the data is not an object
        localStorage.setItem("token", res.data.payload);
        props.history.push("/bubbles");
        setLogin(initialLogin);
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Login</legend>
          <label htmlFor="username">
            Username:
            <input
              type="text"
              name="username"
              id="username"
              value={login.username}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              id="password"
              value={login.password}
              onChange={handleChange}
            />
          </label>
          <button>Login</button>
        </fieldset>
      </form>
    </>
  );
};

export default Login;
