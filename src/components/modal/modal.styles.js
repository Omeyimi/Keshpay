import styled from 'styled-components/native';
import {Modal} from 'react-native-paper';
import {colors} from '../../infrastructure/theme/colors';
import {fontWeights} from '../../infrastructure/theme/fonts';
import {Container} from '../container/container.component';
import {Text} from '../typography/text.component';
import Icon from 'react-native-vector-icons/Ionicons';

export const ModalContainer = styled(Container)`
  /* max-height: 260; */
  height: auto;
  /* background: ${colors.white}; */
  border-top-left-radius: 17px;
  border-top-right-radius: 17px;
  border-bottom-left-radius: 17px;
  border-bottom-right-radius: 17px;
  background-color: red;
`;

export const Wrapper = styled(Container)``;

export const ModalTitle = styled(Text)`
  font-weight: ${fontWeights.semiBold};
  color: ${colors.primary};
  text-align: center;
`;

export const ModalText = styled(Text)`
  font-weight: ${fontWeights.semiBold};
  color: ${colors.black.strong};
  text-align: center;
`;

export const ButtonWrapper = styled.TouchableOpacity``;

export const ButtonText1 = styled(Text)`
  font-weight: ${fontWeights.bold};
  color: ${colors.primary};
`;
export const ButtonText2 = styled(Text)`
  font-weight: ${fontWeights.bold};
  color: ${colors.iconColor};
`;
