import styled from "styled-components/native";
import { Text } from "../typography/text.component";
import {
  fonts,
  fontWeights,
  fontSizes,
} from "../../infrastructure/theme/fonts";
import { Container } from "../container/container.component";
import { colors } from "../../infrastructure/theme/colors";

export const ButtonContainerWrapper = styled.TouchableOpacity`
  width: ${(props) => (props.width ? props.width : "100%")};
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : "12px"};
  overflow: hidden;
`;
export const ButtonWrapper = styled(Container)`
  align-items: center;
  display: flex;
  justify-content: center;
  height: ${props => (props.height ? props.height : '56px')};
  background: #fafafa;
  padding-horizontal: ${props => (props.paddingHorizontal ? props.paddingHorizontal : "0px")};
`;

export const ButtonText = styled(Text)`
  font-weight: ${props =>
    props.fontWeight ? props.fontWeight : fontWeights.medium};
  color: ${props => (props.color ? props.color : colors.white)};
  text-transform: ${props =>
    props.textTransform ? props.textTransform : 'capitalize'};
`;
    