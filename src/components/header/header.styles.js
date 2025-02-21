import styled from 'styled-components/native';
import {Text} from '../../components/typography/text.component';
import {Image} from 'react-native';
import {colors} from '../../infrastructure/theme/colors';
import {fontWeights, fontSizes} from '../../infrastructure/theme/fonts';
import {Container, PressableContainer} from '../container/container.component';
import {VerificationIcon} from '../../assets/svg/Icons';

export const HeaderCover = styled(Container)`
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: auto;
  padding-vertical: 10px;
`;

export const LeftSide = styled(Container)`
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

export const MenuIconWrapper = styled(PressableContainer)`
  border-radius: 26px;
  /* padding: 10px; */
`;
export const HeaderTextWrapper = styled(Container)`
  align-items: flex-start;
  width: auto;
`;

export const WelcomeText = styled(Text)`
  color: #444748;
  font-weight: ${fontWeights.bold};
  text-transform: capitalize;
`;
export const UserNameText = styled(Text)`
  color: #1f2223;
  font-weight: ${fontWeights.bold};
  text-transform: capitalize;
`;
export const RightSide = styled(PressableContainer)`
  width: auto;
  height: auto;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: 6px;
`;
