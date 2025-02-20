import React from 'react';
import {Spacer} from '../spacer/spacer.component';
import {
  ButtonContainerWrapper,
  ButtonWrapper,
  ButtonText,
} from './button.styles';

const ButtonContainer = ({
  backgroundColor = '#00AAFF',
  color = '#fff',
  text = 'Register',
  rightIcon,
  leftIcon,
  onPress,
  width,
  height,paddingHorizontal,
  borderRadius,
  textTransform,
  fontSizeVariant,
  fontWeight
}) => {
  return (
    <ButtonContainerWrapper
      onPress={onPress ? () => onPress() : null}
      width={width}
      borderRadius={borderRadius}>
      <ButtonWrapper
        height={height}
        paddingHorizontal={paddingHorizontal}
        width={width ? width : '100%'}
        flexDirection="row"
        style={{backgroundColor}}
        onPress={() => console.log('onPress')}>
        {leftIcon ? leftIcon : null}
        {leftIcon ? <Spacer position="left" size="medium" /> : null}
        <ButtonText
          fontWeight={fontWeight}
          textTransform={textTransform}
          color={color}
          variant={fontSizeVariant ? fontSizeVariant : 'smallBody'}>
          {text}
        </ButtonText>
        {rightIcon ? <Spacer position="right" size="medium" /> : null}
        {rightIcon ? rightIcon : null}
      </ButtonWrapper>
    </ButtonContainerWrapper>
  );
};
export default ButtonContainer;
