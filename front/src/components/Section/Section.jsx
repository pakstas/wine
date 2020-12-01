import React from "react";
import * as S from "./Section.style";

function Section({ children, background, fullWidth }) {
  return (
    <S.Section background={background}>
      {!fullWidth && <S.Container>{children}</S.Container>}
      {fullWidth && children}
    </S.Section>
  );
}

export default Section;
