import React, { useState, useContext } from "react";
import { Section, InputField, Button } from "../../components";
import { AuthContext } from "../../context/AuthContext";

function AddType(data, auth) {
  fetch("http://localhost:8080/addtype", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + auth.token,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => alert(data.msg || "Erroras"))
    .catch((err) => alert(err.message));
}

function WineTypeAdd() {
  const [data, setData] = useState({});
  const auth = useContext(AuthContext);

  return (
    <>
      <Section>Add Wine Type</Section>
      <Section>
        <form
          onSubmit={(e) => {
            AddType(data, auth);
            e.preventDefault();
          }}
        >
          <InputField
            type="text"
            placeholder="Name"
            handleChange={(e) => setData({ ...data, name: e.target.value })}
          />
          <InputField
            type="text"
            placeholder="Region"
            handleChange={(e) => setData({ ...data, region: e.target.value })}
          />
          <InputField
            type="dropdown"
            options={[
              { id: 0, name: "Select" },
              { id: 1, name: "Red", value: "red" },
              { id: 2, name: "White", value: "white" },
            ]}
            handleChange={(e) => setData({ ...data, type: e.target.value })}
          />
          <InputField
            type="year"
            handleChange={(e) => setData({ ...data, year: e.target.value })}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Section>
    </>
  );
}

export default WineTypeAdd;
