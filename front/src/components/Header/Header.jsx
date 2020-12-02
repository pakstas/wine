import React from "react";
import * as S from "./Header.style";
import imgLogo from "../../assets/demo.png";

function Header({ loggedIn, logout }) {
  return (
    <S.Header>
      <S.StyledLink to="/">
        <S.Logo src={imgLogo} alt="Demo Logo" />
      </S.StyledLink>
      <S.Actions>
        {!loggedIn && (
          <>
            <S.StyledLink to="/login">Login</S.StyledLink>
            <S.StyledLink to="/register">Register</S.StyledLink>
          </>
        )}
        {loggedIn && (
          <>
            <S.StyledLink to="/winetype">Wine Type</S.StyledLink>
            <S.StyledLink to="/winetypeadd">Add Type</S.StyledLink>
            <S.StyledLink to="/winelist">Wine List</S.StyledLink>
            <S.StyledLink to="/addwine">Add Wine</S.StyledLink>
            <S.StyledLink to="" onClick={logout}>
              Logout
            </S.StyledLink>
          </>
        )}
      </S.Actions>
    </S.Header>
  );
}

export default Header;
