import styled from 'styled-components/native';
import {
  Container,
  ScrollViewContainer,
} from '../../components/container/container.component';
import Arrow from 'react-native-vector-icons/Ionicons';
import {colors} from '../../infrastructure/theme/colors';
import {Text} from '../../components/typography/text.component';
import {fonts, fontWeights} from '../../infrastructure/theme/fonts';
import {lineHeights} from '../../infrastructure/theme/spacing';

export const PageContainer = styled(Container)`
  flex: 0.8;
  justify-content: flex-end;
  background-color: #fff;
  border-top-left-radius: 20;
  border-top-right-radius: 20;
  margin-top: auto; 
`;
export const ArrowIcon = styled(Arrow)`
  color: ${colors.primary};
`;
export const ContentContainer = styled(Container)`
  flex: 1;
  width: 100%;
`;
export const Wrapper = styled(Container)`
  height: auto;
  position: ${props => (props.position ? props.position : 'relative')};
  top: ${props => (props.top ? '8.5%' : 0)};
  margin: ${props => (props.margin ? props.margin : '10px 0')};
`;

export const ModalWrapper = styled(Container)`
  position: absolute;
  justify-content: center;
  align-items: center;
  z-index: ${props =>
    (!props.confirmDelivery && props.confirmDeliveryModal) ||
    (props.homeModal && props.home)
      ? 3
      : 1};
  height: 100%;
`;
export const MapInfoContainer = styled(Container)`
  /* background: ${colors.white}; */
  /* position: absolute; */
  /* bottom: 0; */
  /* z-index: 1; */
  /* height: auto; */
  /* border-top-left-radius: 20;
  border-top-right-radius: 20; */
  /* padding-bottom: 6.5%; */
`;

export const ContainerHandle = styled(Container)`
  width: 15%;
  padding-vertical: 3px;
  background: ${colors.subHeaderShade.light};
  border-top-left-radius: 15;
  border-top-right-radius: 15;
  border-bottom-left-radius: 15;
  border-bottom-right-radius: 15;
`;

export const EmptyContainer = styled(Container)`
  padding-vertical: 20px;
  gap: 10px;
`;

export const EmptyTitleText = styled(Text)`
  color: ${colors.black.strong};
  font-weight: ${fontWeights.semiBold};
  text-transform: capitalize;
  text-align: center;
`;

export const EmptyBodyText = styled(Text)`
  color: #999999;
  font-weight: ${fontWeights.regular};
  text-transform: capitalize;
  line-height: ${lineHeights.copy};
  text-align: center;
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
