import React from 'react';
import {Spacer} from '../spacer/spacer.component';
import {
  IconButtonWrapper,
} from './iconButton.styles';

const IconButton = ({
  backgroundColor,
  color = '#fff',
  activeColor,
  icon,
  size,
  onPress,big
}) => {
  return (
    <IconButtonWrapper
      onPress={onPress ? () => onPress() : null}
      backgroundColor={backgroundColor}
      color={color}
      big={big}
      activeColor={activeColor}
      size={size ? size : null}>
      {icon ? icon : null}
    </IconButtonWrapper>
  );
};
export default IconButton;
