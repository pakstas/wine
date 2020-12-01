import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.5em;
  height: 45px;
  font-size: 1.2em;
  border-radius: 5px;
  border: 1px solid #eee;
  &:focus {
    border: 1px solid #111;
    outline: none;
  }
`;

export const Select = styled.select`
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.5em;
  height: 45px;
  font-size: 1.2em;
  border-radius: 5px;
  border: 1px solid #eee;
  &:focus {
    border: 1px solid #111;
    outline: none;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  padding: 0.5em;
  font-size: 1.2em;
  border-radius: 5px;
  border: 1px solid #eee;
  &:focus {
    border: 1px solid #111;
    outline: none;
  }
`;
