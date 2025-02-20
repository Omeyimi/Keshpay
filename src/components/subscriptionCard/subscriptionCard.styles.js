import styled from 'styled-components/native';
import {Container, PressableContainer} from '../container/container.component';
import {Text} from '../typography/text.component';
import {colors} from '../../infrastructure/theme/colors';
import {fontWeights} from '../../infrastructure/theme/fonts';

export const SubscriptionCardContainer = styled(PressableContainer)`
  border-radius: 12px;
  border-width: 1px;
  border-color: ${props => (props.selectedCard ? '#00aaff' : '#E5E5E5')};
  overflow: hidden;
  height: 100px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => (props.selectedCard ? '#F4F7FF' : '#F5F5F5')};
  padding: 20px;
`;
export const Wrapper = styled(Container)`
  width: auto;
  height: auto;
  align-items: flex-start;
`;

export const CircleBorder = styled(Container)`
  width: auto;
  border-width: 3px;
  border-color: ${props => (props.selectedCard ? '#00aaff' : '#8f9191')};
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;
export const Circle = styled(Container)`
  width: 14px;
  height: 14px;
  margin: 3px;
  border-radius: 16px;
  background: ${props => (props.selectedCard ? '#00aaff' : '#8f9191')};
`;

export const DurationInfoWrapper = styled(Container)`
  width: auto;
  height: auto;
  flex-direction: row;
  align-items: center;
  /* background:red; */
`;
export const DurationName = styled(Text)`
  color: #1f2223;
  font-weight: ${fontWeights.bold};
  text-transform: capitalize;
`;
export const DurationInDays = styled(Text)`
  color: #6a6c6c;
  font-weight: ${fontWeights.regular};
  text-transform: capitalize;
`;
export const AmountInfoWrapper = styled(Container)`
  width: auto;
  height: auto;
  align-items: flex-start;
  /* background: red; */
`;
export const DiscountedAmount = styled(Text)`
  color: #000;
  font-weight: ${fontWeights.bold};
  text-transform: capitalize;
`;
export const InitialAmount = styled(Text)`
  color: #6a6c6c;
  font-weight: ${fontWeights.medium};
  text-transform: capitalize;
  text-decoration: line-through;
`;
