import styled from "styled-components";
import { Link } from "react-router-dom";

export const Logo = styled.img`
  max-height: 40px;
  max-width: 100%;
  filter: brightness(0);
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  background: #eee;
`;

export const Actions = styled.nav``;

export const StyledLink = styled(Link)`
  &:not(:last-child) {
    margin-right: 10px;
  }
  &:hover {
    text-decoration: underline;
  }
  text-decoration: none;
  color: #000;
`;
