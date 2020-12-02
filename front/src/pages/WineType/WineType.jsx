import React, { useState, useEffect, useContext } from "react";
import { Section } from "../../components";
import { AuthContext } from "../../context/AuthContext";
import * as S from "./WineType.style";

function WineType() {
  const [types, setTypes] = useState();
  const auth = useContext(AuthContext);

  useEffect(() => {
    fetch("http://localhost:8080/winetype", {
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTypes(data);
      })
      .catch((err) => console.log(err));
  }, [auth.token]);

  return (
    <>
      <Section>Wine Type</Section>
      <Section>
        <S.Table>
          <thead>
            <S.Tr>
              <S.Th>Name</S.Th>
              <S.Th>Region</S.Th>
              <S.Th>Type</S.Th>
              <S.Th>Year</S.Th>
            </S.Tr>
          </thead>
          <tbody>
            {types &&
              types.map((wine) => (
                <S.Tr key={wine.id}>
                  <S.Td>{wine.name}</S.Td>
                  <S.Td>{wine.type}</S.Td>
                  <S.Td>{wine.year}</S.Td>
                  <S.Td>{wine.region}</S.Td>
                </S.Tr>
              ))}
          </tbody>
        </S.Table>
      </Section>
    </>
  );
}

export default WineType;
