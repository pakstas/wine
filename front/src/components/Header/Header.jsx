import React from "react";
import * as S from "./Header.style";
import imgLogo from "../../assets/demo.png";

function Header() {
  return (
    <S.Header>
      <S.StyledLink to="/">
        <S.Logo src={imgLogo} alt="Demo Logo" />
      </S.StyledLink>
      <S.Actions>
        <S.StyledLink to="/">Home</S.StyledLink>
        <S.StyledLink to="/about">About</S.StyledLink>
      </S.Actions>
    </S.Header>
  );
}

export default Header;
