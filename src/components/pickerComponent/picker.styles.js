import styled from "styled-components";
import { colors } from "../../infrastructure/theme/colors";
import { fontWeights, fontSizes } from "../../infrastructure/theme/fonts";
import { Text } from "../typography/text.component";

export const PickerInputStyle = styled.View`
  flex-direction: column;
  justify-content: center;
  margin: 5px 0;
  width: ${(props)=> props.width || "90%"};
`;

export const PickerInputText = styled(Text)`
  font-weight: ${fontWeights.bold};
  font-size: ${fontSizes.body};
  line-height: 26px;
  margin: 0 10px;
  color: #000;
`;

export const PickerInputChildren = styled.View`
  border-color: #BEC5D1;
  border-width: 1px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 1px 0 0;
  padding: 0px 13px 0px 5px;
  width: 100%;
  height: 48px;
  background: #fafafa;
  border-radius: 12px;
`;

// PickerTextInputContainer
export const IconText = styled(Text)`
  color: ${colors.green.regular};
  font-size: ${fontSizes.caption};
  font-weight: 700;
`;

export const IconTextContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;