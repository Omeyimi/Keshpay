import React from "react";
import {
  PickerInputStyle,
  PickerInputText,
  PickerInputChildren,
} from "./picker.styles";
import { Spacer } from "../../components/spacer/spacer.component";

export const PickerInputContainer = ({
  label,
  placeholder,
  children,
  width,
}) => {
  return (
    <PickerInputStyle width={width}>
      <Spacer position="bottom" size="medium">
        <PickerInputText>{label || placeholder}</PickerInputText>
      </Spacer>
      <PickerInputChildren>{children}</PickerInputChildren>
    </PickerInputStyle>
  );
};
