import styled from "styled-components/native";
import { Image, TouchableOpacity } from "react-native";
import { Container } from "../container/container.component";
import { colors } from "../../infrastructure/theme/colors";
import IconForLocation from "react-native-vector-icons/MaterialIcons";
import IconForNaira from "react-native-vector-icons/MaterialCommunityIcons";
import { Text } from "../typography/text.component";
import { fontWeights } from "../../infrastructure/theme/fonts";
import { lineHeights } from "../../infrastructure/theme/spacing";
import IconForPlus from "react-native-vector-icons/AntDesign";
import IconForMinus from "react-native-vector-icons/AntDesign";

export const MultiPurposeCardParentContainer = styled(TouchableOpacity)`
  border-radius: 16px;
  overflow: hidden;
  background: ${({ background }) => (background ? background : colors.white)};
  elevation: ${(props) => (props.elevation ? props.elevation : 1)};
`;
export const MultiPurposeCardContainer = styled(Container)`
  padding-vertical: 15px;
  padding-horizontal: 3%;
  margin: 0 auto;
`;
export const ImageSection = styled(Container)``;
export const CardImage = styled.Image`
  width: 100%;
  height: 100%;
`;
export const InfoSection = styled(Container)``;

export const Wrapper = styled(Container)``;
export const NotificationMessage = styled(Text)`
  color: ${colors.black.strong};
  font-weight: ${fontWeights.semiBold};
`;
export const BoldMessage = styled(Text)`
  color: ${colors.black.strong};
  font-weight: ${fontWeights.bold};
`;
export const LocationIcon = styled(IconForLocation)`
  color: ${colors.primary};
`;

export const TimeStampWrapper = styled(Container)``;
export const TimeStamp = styled(Text)`
  color: ${colors.text.soft};
`;
