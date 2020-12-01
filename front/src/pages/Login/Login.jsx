import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Section, Button, InputField } from "../../components";
import { AuthContext } from "../../context/AuthContext";
import * as S from "./Login.style";

function signUser(data, auth, setNotification, history) {
  fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((fdata) => {
      if (fdata.token) {
        auth.updateToken(fdata.token);
        history.push("/");
      } else {
        setNotification(fdata.msg || "Error");
      }
    })
    .catch((err) => setNotification(err.message));
}

function Login() {
  const [notification, setNotification] = useState(false);
  const [data, setData] = useState({ username: "", password: "" });
  const auth = useContext(AuthContext);
  const history = useHistory();

  return (
    <Section>
      {notification && <S.NotifyWarn>{notification}</S.NotifyWarn>}
      <h2>Login</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setNotification(false);
          signUser(data, auth, setNotification, history);
        }}
      >
        <InputField
          type="email"
          placeholder="Email"
          handleChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <InputField
          type="password"
          placeholder="Password"
          handleChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <Button type="submit">Login</Button>
      </form>
    </Section>
  );
}

export default Login;
