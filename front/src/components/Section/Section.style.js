import styled from "styled-components";

export const Section = styled.section`
  background: ${(props) => props.background};
`;

export const Container = styled.div`
  max-width: 768px;
  margin: 0 auto;
  padding: 1em 2em;
`;
