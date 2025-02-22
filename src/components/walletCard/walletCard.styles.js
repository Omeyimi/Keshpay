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

import {
  VisibilityIcon,
  OptionIcon,
  CarotDownIcon,
} from '../../assets/svg/Icons';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const WalletCardContainer = styled(Container)`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #fff;
  width: 100%;
  border-radius: 14px;
  padding-vertical: 20px;
  padding-horizontal: 20px;
`;

export const LeftSection = styled(Container)`
  align-items: flex-start;
  gap: 6px;
  /* background-color: aqua; */
  width: max-content;
 
`;

export const CurrencyExchangeDropDown = styled(Container)`
  width: max-content;
`;

export const WalletBalanceVisibilityWrapper = styled(Container)`
  flex-direction: row;
  align-items: center;
  gap: 8px;
 z-index:-1;
`;

export const WalletBalanceTitle = styled(Text)`
  color: #a3a3a3;
  font-weight: ${fontWeights.regular};
  text-transform: capitalize;
  width: max-content;
`;

export const VisibilityIconStyled = styled(VisibilityIcon)`
  background-color: ${colors.primary};
  line-height: ${lineHeights.title};
`;

export const WalletBalanceWrapper = styled(Container)`
  flex-direction: row;
  gap: 5px;
  z-index: -1;
`;

export const WalletBalanceText = styled(Text)`
  color: #1f2223;
  font-weight: ${fontWeights.bold};
  text-transform: capitalize;
  width: max-content;
  /* background-color: pink; */
`;

export const USDCWalletBalanceWrapper = styled(Container)`
  width: max-content;
  z-index: -1;
`;

export const USDCWalletBalanceText = styled(Text)`
  color: #2c75c9;
  font-weight: ${fontWeights.medium};
  text-transform: capitalize;
  width: max-content;
`;

export const RightSection = styled(PressableContainer)`
  background-color: transparent;
  width: 20px;
  height: 20px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
`;

export const MultiPurposeCardContainer = styled(PressableContainer)`
  border-radius: ${props => (props.topic ? 0 : props.course ? '8px' : '8px')};
  overflow: ${props => (props.topic ? 'visible' : 'hidden')};
  height: ${props => (props.topic || props.course ? 'auto' : '170px')};
  max-height: ${props => (props.course ? 'auto' : width / '2.2')};
  max-width: ${width / '2.2'};
  justify-content: space-between;
  width: ${props => (props.course ? width / '2.2' : '49%')};
  background-color: ${props => (props.course ? '#F5F5F5' : '#fff')};
  elevation: ${props => (props.topic ? 0 : props.course ? 0 : 2)};
  padding: ${props => (props.course ? '10px' : 0)};
  margin-bottom: 15px;
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

export const InfoSection = styled(Container)`
  width: 100%;
  height: ${props => (props.topic || props.course ? 'auto' : '100%')};
  padding-vertical: ${props =>
    props.topic ? '10px' : props.course ? '5px' : '15px'};
  justify-content: ${props => (props.topic ? ' space-around' : 'flex-end')};
  /* background: green; */
`;

export const CardInfoContainer = styled(Container)`
  height: auto;
  /* background:blue; */
`;

export const HeaderText = styled(Text)`
  color: ${colors.white};
  font-weight: ${fontWeights.bold};
  text-transform: capitalize;
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
