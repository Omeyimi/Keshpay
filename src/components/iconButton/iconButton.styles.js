import styled from 'styled-components/native';
import {Text} from '../typography/text.component';
import {fonts, fontWeights, fontSizes} from '../../infrastructure/theme/fonts';
import {PressableContainer} from '../container/container.component';
import {colors} from '../../infrastructure/theme/colors';

export const IconButtonWrapper = styled(PressableContainer)`
  width: ${props => (props.size ? props.size : 40)};
  height: ${props => (props.size ? props.size : 40)};
  border-radius: ${props => (props.size ? "50%" : '40px')};
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : '#fff'};
  overflow: hidden;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
