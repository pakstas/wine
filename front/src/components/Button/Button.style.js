import styled from "styled-components";

export const Button = styled.button`
  outline: none;
  background: ${(props) => (props.color === "primary" ? "#fff" : "#000")};
  color: ${(props) => (props.color === "primary" ? "#000" : "#fff")};
  border: 1px solid #000;
  padding: 0.5em 2em;
  border-radius: 0.4em;
  cursor: pointer;
  &:hover {
    background: ${(props) => (props.color === "primary" ? "#000" : "#fff")};
    color: ${(props) => (props.color === "primary" ? "#fff" : "#000")};
  }
`;
