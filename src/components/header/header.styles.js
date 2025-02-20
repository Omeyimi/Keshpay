import styled from 'styled-components/native';
import {Text} from '../../components/typography/text.component';
import {colors} from '../../infrastructure/theme/colors';
import {fontWeights, fontSizes} from '../../infrastructure/theme/fonts';
import {Container, PressableContainer} from '../container/container.component';

export const HeaderCover = styled(Container)`
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: auto;
  padding-vertical: 10px;
`;

export const LeftSide = styled(Container)``;

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
  font-weight: ${fontWeights.medium};
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
  justify-content: center;
  align-items: center;
  padding-horizontal: 15px;
  padding-vertical: 4px;
  gap: 4px;
  border-radius: 8px;
  border: 1px solid #d2d3d3;
  background: #f5f5f5;
`;
export const GradeName = styled(Text)`
  color: #1f2223;
  font-weight: ${fontWeights.semiBold};
  text-transform: uppercase;
`;
