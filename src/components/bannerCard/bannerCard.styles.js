import styled from 'styled-components/native';
import {ImageBackground, Image} from 'react-native';
import {Container, PressableContainer, ScrollViewContainer} from '../container/container.component';
import {Text} from '../typography/text.component';
import {colors} from '../../infrastructure/theme/colors';
import { fontWeights} from '../../infrastructure/theme/fonts';
import {lineHeights} from '../../infrastructure/theme/spacing';
import Icon from 'react-native-vector-icons/FontAwesome';
import Love from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

export const BannerCardContainer = styled(PressableContainer)`
  border-radius: 16px;
  overflow: hidden;
  height: 150px;
  flex-direction: row-reverse;
  justify-content: space-between;
  width: 280px;
  background: #fff;
  elevation: 2;
`;
export const Wrapper = styled(Container)``;

export const ImageSection = styled(Container)`
  width: 50%;
  height: 100%;
`;
export const CardBackgroundImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

export const LinearGradientBackground = styled(LinearGradient)`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
`;
export const InfoSection = styled(Container)`
  width: 70%;
  height: 100%;
`;

export const CardInfoContainer = styled(Container)`
  flex: 1;
`;

export const HeaderText = styled(Text)`
  color: ${colors.white};
  font-weight: ${fontWeights.medium};
  text-transform: capitalize;
`;
export const DiscountTextBold = styled(Text)`
  color: ${colors.white};
  font-weight: ${fontWeights.bold};
  text-transform: capitalize;
`;
export const DiscountText = styled(Text)`
  color: ${colors.white};
  font-weight: ${fontWeights.bold};
  text-transform: capitalize;
`;
export const DescriptionText = styled(Text)`
  color: ${colors.white};
  font-weight: ${fontWeights.medium};
  text-transform: capitalize;
`;
export const RatingStar = styled(Icon)`
  color: ${colors.primary};
  line-height: ${lineHeights.title};
`;

export const AddressAndRatingContainer = styled(Container)``;
export const AddressText = styled(Text)`
  color: ${colors.white};
`;
export const RatingNumber = styled(Text)`
  color: ${colors.white};
`;
