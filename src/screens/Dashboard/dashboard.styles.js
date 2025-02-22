import styled from 'styled-components/native';
import {Container} from '../../components/container/container.component';
import Arrow from 'react-native-vector-icons/Ionicons';
import {colors} from '../../infrastructure/theme/colors';
import {Text} from '../../components/typography/text.component';
import {fonts, fontWeights} from '../../infrastructure/theme/fonts';
import {lineHeights} from '../../infrastructure/theme/spacing';

export const PageContainer = styled(Container)`
  flex: 1;
  /* height: 200px; */
  background: ${colors.bg.grey};
`;

export const ContentContainer = styled(Container)`
  flex: 1;
`;

export const EmptyContainer = styled(Container)`
padding-vertical:20px;
`;

export const EmptyText = styled(Text)`
  color: ${colors.black.regular};
  font-weight: ${fontWeights.regular};
  text-transform: capitalize;
  text-align: center;
`;

export const ArrowIcon = styled(Arrow)`
  color: ${colors.primary};
`;
export const Wrapper = styled(Container)`
  height: auto;
`;

export const IconBtnContainer = styled(Container)`
  flex-direction: row;
  justify-content: space-around;
  /* background-color: pink; */
  align-items: center;
`;
export const IconButtonWrapper = styled(Container)`
  gap: 6px;
  width: max-content;
  /* background-color: blue; */
`;

export const ButtonTitle = styled(Text)`
  color: ${colors.black.regular};
  font-weight: ${fontWeights.regular};
  text-align: center;
`;

export const RowContainer = styled(Container)`
  height: auto;
  width: auto;
  flex-direction: row;
  justify-content: space-between;
`;

export const ModalWrapper = styled(Container)`
  position: absolute;
  justify-content: center;
  align-items: center;
  /* background: red; */
  display: ${props => (props.homeModal ? 'flex' : 'none')};
  z-index: ${props => (props.homeModal ? 3 : -1)};
  height: 100%;
`;
export const MapInfoContainer = styled(Container)`
  background: ${colors.white};
  position: absolute;
  bottom: 0;
  z-index: 1;
  height: auto;
  border-top-left-radius: 20;
  border-top-right-radius: 20;
  padding-bottom: 6.5%;
`;

export const ContainerHandle = styled(Container)`
  width: 20%;
  padding-vertical: 2px;
  background: ${colors.subHeaderShade.light};
  border-top-left-radius: 20;
  border-top-right-radius: 20;
  border-bottom-left-radius: 20;
  border-bottom-right-radius: 20;
`;

export const HeaderText = styled(Text)`
  color: ${colors.primary};
  font-weight: ${fontWeights.semiBold};
  text-align: center;
  padding-top: 5%;
`;
export const CardText = styled(Text)`
  color: ${colors.black.strong};
  font-weight: ${fontWeights.semiBold};
  text-align: center;
`;
export const HorizontalTable = styled(Container)``;

export const LeftSection = styled(Container)``;
export const RightSection = styled(Container)``;
export const BigText = styled(Text)`
  color: ${colors.iconColor};
  font-weight: ${fontWeights.semiBold};
`;

export const SubText = styled(Text)`
  color: ${colors.black.strong};
  font-weight: ${fontWeights.regular};
`;
