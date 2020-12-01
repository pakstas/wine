import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Section, Button, InputField } from "../../components";
import { AuthContext } from "../../context/AuthContext";
import * as S from "./Register.style";

function registerUser(data, setNotification, history) {
  fetch("http://localhost:8080/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      res.json();
    })
    .then((fdata) => {
      setNotification(fdata.msg || "Error");
    })
    .catch((err) => setNotification(err.message));
}

function Register() {
  const [notification, setNotification] = useState(false);
  const [success, setSuccess] = useState(true);
  const [data, setData] = useState({ email: "", password: "" });
  // const auth = useContext(AuthContext);
  const history = useHistory();

  return (
    <Section>
      {notification && <S.NotifyWarn>{notification}</S.NotifyWarn>}
      <h2>Register</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setNotification(false);
          registerUser(data, setNotification, history);
        }}
      >
        {/* TODO: change type of input. */}
        <InputField
          type="email"
          placeholder="Email"
          handleChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <InputField
          type="text"
          placeholder="Password"
          handleChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <Button type="submit">Register</Button>
      </form>
    </Section>
  );
}

export default Register;
