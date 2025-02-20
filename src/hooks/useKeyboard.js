import { useState, useEffect } from "react";
import { Keyboard } from "react-native";

const useKeyboardForFlex = (flexInit, flexFinal) => {
  const [flexStatus, setFlexStatus] = useState(flexInit);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () =>
      setFlexStatus(flexFinal)
    );
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () =>
      setFlexStatus(flexInit)
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return flexStatus;
};

export default useKeyboardForFlex;
