import styled from 'styled-components/native';
import {Text} from '../typography/text.component';
import {fonts, fontWeights, fontSizes} from '../../infrastructure/theme/fonts';
import {PressableContainer} from '../container/container.component';
import {colors} from '../../infrastructure/theme/colors';

export const IconButtonWrapper = styled(PressableContainer)`
  width: ${props => (props.size == 'big' ? 60 : 40)};
  height: ${props => (props.size == 'big' ? 60 : 40)};
  border-radius: ${props => (props.size == 'big' ? '60px' : '30px')};
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : '#fff'};
  overflow: hidden;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
