import styled from 'styled-components/native';
import {Container, PressableContainer} from '../container/container.component';
import Arrow from 'react-native-vector-icons/Ionicons';
import {colors} from '../../infrastructure/theme/colors';
import {Text} from '../typography/text.component';
import {fonts, fontWeights} from '../../infrastructure/theme/fonts';
import {lineHeights} from '../../infrastructure/theme/spacing';
import {Image} from 'react-native';
import {VerificationIcon} from '../../assets/svg/Icons';

export const CardContainer = styled(PressableContainer)`
  padding-vertical: ${props =>
    props.variant == 'messageBtn' ? '15px' : '10px'};
  padding-horizontal: ${props => (props.variant == 'userCard' ? '0' : '4%')};
  background: ${props =>
    props.variant == 'messageBtn'
      ? colors.bg.grey
      : props.variant == 'userCard'
      ? colors.white
      : colors.white};
  flex-direction: row;
  align-items: center;
  border-radius: ${props => (props.variant == 'messageBtn' ? '12px' : 0)};
  justify-content: space-between;
  gap: ${props => (props.variant == 'messageBtn' ? '15px' : '8px')};
`;

export const ProfileImageWrapper = styled(PressableContainer)`
  width: 50;
  height: 50;
  position: relative;
`;

export const Wrapper = styled(Container)`
  /* background-color: blue; */
  width: max-content;
  height: max-content;
`;

export const ProfileImage = styled(Image)`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  resize-mode: cover;
`;

export const VerificationIconStyledWrapper = styled(Container)`
  position: absolute;
  top: 0;
  left: 20px;
  z-index: 10;
`;

export const VerificationIconStyled = styled(VerificationIcon)``;

export const ContentContainer = styled(Container)`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;
export const InfoSection = styled(Container)`
  width: max-content;
  align-items: flex-start;
  gap: 2px;
`;

export const Name = styled(Text)`
  color: #001329;
  font-weight: ${fontWeights.semiBold};
  width: max-content;
`;

export const TransactionDate = styled(Text)`
  color: #a3a3a3;
  font-weight: ${fontWeights.regular};
  width: max-content;
`;

export const StatusWrapper = styled(Container)`
  width: max-content;
  align-items: flex-end;
`;

export const Amount = styled(Text)`
  color: #b82a14;
  font-weight: ${fontWeights.semiBold};
  width: max-content;
`;

export const Status = styled(Text)`
  color: #a3a3a3;
  font-weight: ${fontWeights.regular};
  width: max-content;
`;
