import styled from "styled-components/native";
import { Text } from "../../components/typography/text.component";
import { colors } from "../../infrastructure/theme/colors";
import { fontWeights, fontSizes } from "../../infrastructure/theme/fonts";

export const NotificationCardContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  height: 116px;
  margin-top: 100px;
  padding: 10px 15px;
  background-color: #f1f1f1;
  overflow: hidden;
`;

export const ImageWrap = styled.View`
height: 72px;
width: 89px;
`;

export const Imaged = styled.Image`
 resize-mode: cover;
 width: 100%;
 height: 100%;
`;

export const OrderWrap = styled.View`
  flex-direction: column;
  align-items: flex-end;
  flex: .95
`;

export const NotificationText = styled(Text)`
font-size: 13px;
color: ${(props) => props.color || colors.black.strong};
font-weight: ${(props) => props.fontWeight || 600};
`;

export const TimeContent = styled.View`
margin-top: 8px;
`;