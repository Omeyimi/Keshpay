import styled from 'styled-components/native';
import {
  Container,
  PressableContainer,
} from '../../components/container/container.component';
import Arrow from 'react-native-vector-icons/Ionicons';
import {colors} from '../../infrastructure/theme/colors';
import {Text} from '../../components/typography/text.component';
import {fonts, fontWeights} from '../../infrastructure/theme/fonts';
import {lineHeights} from '../../infrastructure/theme/spacing';
import {Image} from 'react-native';
import {VerificationIcon} from '../../assets/svg/Icons';

export const CardContainer = styled(PressableContainer)`
  padding-vertical: 10px;
  padding-horizontal: 4%;
  background: ${colors.white};
  flex-direction: row;
  justify-content: space-between;
  gap: 8px;
`;

export const ProfileImageWrapper = styled(PressableContainer)`
  width: 50;
  height: 50;
  position: relative;
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
