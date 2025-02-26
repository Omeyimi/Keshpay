import styled from "styled-components/native";
import { Text } from "../../components/typography/text.component";
import { fonts, fontWeights, fontSizes } from "../../infrastructure/theme/fonts";

export const TextInputContainerWrap = styled.View`
  flex-direction: column;
  justify-content: center;
  margin: 5px 0;
  width: ${(props)=> props.width || "90%"};
`;

export const TextInputLabel = styled(Text)`
  font-weight: ${fontWeights.bold};
  font-size: ${fontSizes.body};
  line-height: 26px;
  margin: 0 10px;
  color: #000;
`;

export const TextInputStyled = styled.View`
  border-color: #BEC5D1;
  border-width: 1px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0 0;
  padding: 0px 13px 0px 5px;
  width: 100%;
  height: 48px;
  background: #fafafa;
  border-radius: 12px;
`;
