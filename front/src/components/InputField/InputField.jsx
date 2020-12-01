import React from "react";
import * as S from "./InputField.style";

function InputField({ type, placeholder, options, handleChange }) {
  switch (type) {
    case "longtext":
      return <S.TextArea placeholder={placeholder} onChange={handleChange} />;
    case "number":
      return (
        <S.Input
          type="number"
          step="0.1"
          placeholder={placeholder}
          onChange={handleChange}
        />
      );
    case "password":
      return (
        <S.Input
          type="password"
          placeholder={placeholder}
          onChange={handleChange}
        />
      );
    case "dropdown":
      return (
        <S.Select onChange={handleChange} defaultValue>
          <option disabled value>
            {options[0].name}
          </option>
          {options.slice(1).map((option) => (
            <option key={option.id} value={option.value}>
              {option.name}
            </option>
          ))}
        </S.Select>
      );
    default:
      return (
        <S.Input
          type="text"
          placeholder={placeholder}
          onChange={handleChange}
        />
      );
  }
}

export default InputField;
