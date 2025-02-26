import styled from 'styled-components/native';
import {ImageBackground, Image, Dimensions} from 'react-native';
import {
  Container,
  PressableContainer,
  ScrollViewContainer,
} from '../container/container.component';
import {Text} from '../typography/text.component';
import {colors} from '../../infrastructure/theme/colors';
import {fonts, fontWeights} from '../../infrastructure/theme/fonts';
import {lineHeights} from '../../infrastructure/theme/spacing';
import Icon from 'react-native-vector-icons/FontAwesome';
import Love from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const MultiPurposeCardContainer = styled(PressableContainer)`
  border-radius: 8px;
  overflow: hidden;
  height: 170px;
  justify-content: center;
  width: ${width / '2.4'};
  /* background-color: ${props => (props.course ? '#F5F5F5' : '#fff')}; */
  padding: 0;
`;
export const Wrapper = styled(Container)``;

export const ImageSection = styled(Container)`
  width: 100%;
  border-radius: ${props => (props.topic || props.course ? '8px' : '0')};
  height: ${props => (props.topic ? '98px' : props.course ? '110px' : 'auto')};
  overflow: ${props => (props.topic || props.course ? 'hidden' : 'visible')};

  justify-content: center;
  align-items: center;
`;
export const CardBackgroundImage = styled(Image)`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

export const PlayIconWrapper = styled(Container)`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  position: absolute;
`;

export const LinearGradientBackground = styled(LinearGradient)`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
`;
export const InfoSection = styled(Container)`
  width: 100%;
  height: ${props => (props.topic || props.course ? 'auto' : '100%')};
  padding-vertical: ${props =>
    props.topic ? '10px' : props.course ? '5px' : '15px'};
  justify-content: ${props => (props.topic ? ' space-around' : 'flex-end')};
`;

export const CardInfoContainer = styled(Container)`
  height: auto;
`;

export const HeaderText = styled(Text)`
  color: ${colors.white};
  font-weight: ${fontWeights.medium};
  text-transform: capitalize;
  text-align: center;
`;
export const SubjectText = styled(Text)`
  color: #00aaff;
  font-weight: ${fontWeights.semiBold};
  text-transform: capitalize;
`;
export const DurationText = styled(Text)`
  color: #00aaff;
  font-weight: ${fontWeights.medium};
  text-transform: capitalize;
`;

export const ButtonWrapper = styled(Container)`
  background-color: rgba(0, 170, 255, 0.2);
  width: auto;
  border-radius: 3px;
  padding-vertical: 4px;
  padding-horizontal: 10px;
`;

export const TopicText = styled(Text)`
  color: #1f2223;
  font-weight: ${fontWeights.bold};
  text-transform: capitalize;
  min-height: 35px;
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
