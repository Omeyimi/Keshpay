import styled from 'styled-components/native';
import {Text} from '../../components/typography/text.component';
import {TouchableOpacity} from 'react-native';
import {
  Container,
  PressableContainer,
  FlatListContainer,
} from '../container/container.component';
import {colors} from '../../infrastructure/theme/colors';
import {fonts, fontWeights} from '../../infrastructure/theme/fonts';

export const PickerContainer = styled(Container)`
  width: max-content;
  /* position: relative; */
`;

export const DropdownHeader = styled(PressableContainer)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 5px;
  padding-horizontal: 10px;
  border-color: ${colors.black.strong};
  border-radius: 20px;
  gap: 4px;
  background-color: ${colors.bg.grey};
`;

export const DropdownItem = styled(PressableContainer)`
  padding-right: 10px;
  padding-left: 10px;
  padding-bottom: 4px;
  padding-top: 4px;
  width: max-content;
`;

export const SelectedText = styled(Text)`
  color: ${colors.black.strong};
  font-weight: ${fontWeights.bold};
`;

export const Arrow = styled(Text)``;

export const ItemText = styled(Text)`
  width: max-content;
`;

export const FlatListContainerStyled = styled(FlatListContainer)`
  background-color: #ffff;
  top: 40;
  left: 0%;
  width: 100%;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
 elevation: 5;
  /* border-width: 1px; */
  overflow: hidden;
  position: absolute;
  background-color: ${colors.bg.grey};
  z-index: 1000;
`;

// `;export const Container = styled(Container)``;
