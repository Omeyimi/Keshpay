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
import TextInputContainer from '../../components/textInput2/textInput.component';

export const PageContainer = styled(Container)`
  flex: 0.9;
  min-height: max-content;
  justify-content: flex-end;
  background-color: #fff;
  border-top-left-radius: 20;
  border-top-right-radius: 20;
  padding-bottom: 20px;
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
  /* background-color: green; */
  position: ${props => (props.position ? props.position : 'relative')};
  top: ${props => (props.top ? '8.5%' : 0)};
  margin: ${props => (props.margin ? props.margin : '10px 0')};
`;

export const MapInfoContainer = styled(Container)`
  /* background: red; */
  flex: 1;
  justify-content: space-between;
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

// export const EmptyTitleText = styled(Text)`
//   color: ${colors.black.strong};
//   font-weight: ${fontWeights.semiBold};
//   text-transform: capitalize;
//   text-align: center;
// `;

// export const EmptyBodyText = styled(Text)`
//   color: #999999;
//   font-weight: ${fontWeights.regular};
//   text-transform: capitalize;
//   line-height: ${lineHeights.copy};
//   text-align: center;
// `;

// export const HeaderText = styled(Text)`
//   color: ${colors.primary};
//   font-weight: ${fontWeights.semiBold};
//   text-align: center;
//   padding-top: 5%;
// `;

export const BalanceText = styled(Text)`
  color: #666666;
  font-weight: ${fontWeights.regular};
`;

export const AmountContainer = styled(Container)``;

export const AmountText = styled(Text)`
  color: #000;
  font-weight: ${fontWeights.bold};
`;

export const CurrencySelector = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
  background-color: #f5f5f5;
  border-radius: 20px;
`;

export const CurrencyFlag = styled(Text)`
  font-size: 16px;
  margin-right: 8px;
`;

export const CurrencyText = styled(Text)`
  font-size: 16px;
  font-weight: 500;
`;

export const Keypad = styled(Container)`
  /* flex: 1; */
  /* background-color: indigo; */
  /* gap: 20px; */
  /* margin-top: 32px; */
`;

export const KeypadRow = styled(Container)`
  flex-direction: row;
  justify-content: space-between;
  /* background-color: blue; */
`;

export const KeypadButton = styled.TouchableOpacity`
  width: 33%;
  height: 65px;
  justify-content: center;
  /* background-color: pink; */
  align-items: center;
`;

export const KeypadText = styled(Text)`
  font-weight: ${fontWeights.bold};
  color: #000;
`;

export const NoteContainer = styled(Container)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  /* background-color: #f5f5f5;*/
  background-color: blue;
  /* gap: 5px; */
`;

export const NoteInput = styled(TextInputContainer)`
  flex: 1;
  font-size: 16px;
  color: #666;
  border-radius: 12px;
`;

// export const SendButton = styled`
//   width: 48px;
//   height: 48px;
//   border-radius: 24px;
//   background-color: #0066ff;
//   justify-content: center;
//   align-items: center;
//   margin-left: 12px;
// `;
