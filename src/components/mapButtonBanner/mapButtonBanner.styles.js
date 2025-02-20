import styled from "styled-components/native";
import { colors } from "../../infrastructure/theme/colors";
import { Container } from "../container/container.component";
import CheckIcon from "react-native-vector-icons/AntDesign";
import WarningIcon from "react-native-vector-icons/AntDesign";
import CancelIcon from "react-native-vector-icons/AntDesign";
import { Text } from "../typography/text.component";
import { fontWeights } from "../../infrastructure/theme/fonts";
import { TouchableOpacity } from "react-native";

export const MapButtonBannerContainer = styled(TouchableOpacity)`
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  justify-content: space-between;
  padding-vertical: 15px;
  width: 100%;
  display: flex;
  flex-direction: row;
  background: white;
`;

export const Wrapper = styled(Container)`
  height: auto;
`;

export const VerifiedIcon = styled(CheckIcon)``;
export const WaitingIcon = styled(WarningIcon)``;
export const BannerTitle = styled(Text)`
  color: ${(props) => (props.color ? props.color : colors.black.strong)};
  font-weight: ${fontWeights.semiBold};
`;
export const CloseIcon = styled(CancelIcon)``;
