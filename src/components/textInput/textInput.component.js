import React, { useState, useMemo, useEffect } from "react";

import Feather  from "react-native-vector-icons/Feather";
import { TextInput } from "react-native";

import { theme } from "../../infrastructure/theme";
import {
  TextInputContainerWrap,
  TextInputStyled,
  TextInputLabel,
} from "./textInput.styles";

const TextInputContainer = ({
  placeholder,
  textValue = "Cameron Williamson",
  slash,
  secure,
  label = "Email address",
  containerWidth,
}) => {
  const [value, setValue] = useState(textValue);

  // no re-rendering on "slash" toggle
  const user = useMemo(() => {
    return value;
  }, [value]);

  const [isPassword, revealPassword] = useState(true);

  // toggle password visibility
  const showPasscode = () => revealPassword((isPassword) => !isPassword);

  const styledInput = {
    fontSize: 16,
    color: "#BEC5D1",
    width: "80%",
    height: "100%",
    letterSpacing: 0.75,
  };

  return (
    <TextInputContainerWrap width={containerWidth}>
      <TextInputLabel>{label}</TextInputLabel>
      <TextInputStyled>
        <TextInput
          value={value}
          placeholderTextColor={theme.colors.black.light}
          style={styledInput}
          onChangeText={(value) => setValue(value)}
          autoFocus
          placeholder={placeholder}
          secureTextEntry={slash || (secure && isPassword)}
        />
        {slash && (
          <Feather
            onPress={showPasscode}
            name="eye-off"
            size={20}
            color={theme.colors.black.light}
          />
        )}
      </TextInputStyled>
    </TextInputContainerWrap>
  );
};

export default TextInputContainer;
