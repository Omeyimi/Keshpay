import React, {useState} from 'react';
import {TouchableWithoutFeedback, Modal, Button} from 'react-native';

import {Picker} from '@react-native-picker/picker';
import {PickerInputContainer} from './pickerInput.component';
import {colors} from '../../infrastructure/theme/colors';

export const AppPicker = ({
  label = 'Select Value',
  width = '100%',
  _array = [{label: '', value: ''}],
  selectedValue,
  setSelectedValue,
  containerWidth,
}) => {
  const [modal, setModal] = useState(false);

  const picker = {
    width: width,
    height: 23,
    color: colors.black.strong,
    marginTop: 8,
    // marginLeft: -5
  };
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModal(true)}>
        <PickerInputContainer width={containerWidth} label={label}>
          <Picker
            style={picker}
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }
            itemStyle={{fontWeight: '700', fontSize: 15}}>
            {_array.map(v => (
              <Picker.Item key={v.value} label={v.label} value={v.label} />
            ))}
          </Picker>
        </PickerInputContainer>
      </TouchableWithoutFeedback>
      <Modal visible={modal} animationType="slide">
        <Button title="Close" onPress={() => setModal(false)} />
      </Modal>
    </>
  );
};
