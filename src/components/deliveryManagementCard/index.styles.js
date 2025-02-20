import styled from "styled-components";
import { colors } from "../../infrastructure/theme/colors";
import { Text } from "../typography/text.component";
import { lineHeights } from "../../infrastructure/theme/spacing";
import { fontWeights } from "../../infrastructure/theme/fonts";
import IconForNaira from "react-native-vector-icons/MaterialCommunityIcons";


export const ManagementCard = styled.View`
  height: auto;
  background-color: ${colors.bg.white};
  border-radius: 20px;
  padding-horizontal:20px;
  width: 100%;
`;

export const FlexContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const FlexComponent = styled(FlexContainer)`
  margin: 3px 0px;
  justify-content: ${(props)=> props.justifyContent || "space-between"};
  align-items: ${(props) => props.alignItems || "center"};
`;

export const TextContent = styled(Text)`
  color: ${(props) => props.color || "#7F7F7F"};
  font-size: ${(props) => props.fontSize || "14px"};
  font-weight: ${(props) => props.fontWeight || 600};
  line-height: ${(props) => props.lineHeights || lineHeights.copy};
`;

export const ManagementBtn = styled.TouchableOpacity`
height: 34px;
padding:5px 15px;
background: ${props => props.bgColor || "#E4EC0099"};
border-radius: 10px;
align-items: center;
justify-content: center;
`;

export const DefaultWrap = styled.View``;

export const ImageContainer = styled.View`
  width: 93px;
  height: 93px;
  margin-right: 17px;
`;

export const Imaged = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: cover;
  border-radius: 100px;
`;

export const PriceWrapper = styled.View`
flex-direction: row;
justify-content: flex-start;
`;

export const PriceFigure = styled(Text)`
  color: ${(props)=> props.color || colors.black.strong};
  font-weight: ${fontWeights.bold};
`;
export const NairaIcon = styled(IconForNaira)`
  color: ${(props)=> props.color || colors.black.strong};
  line-height: ${lineHeights.copy};
  `;
