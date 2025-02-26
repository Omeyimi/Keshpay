import React, {useState} from 'react';
import styled from 'styled-components/native';
import {StatusBar, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;



const BalanceText = styled.Text`
  color: #666;
  font-size: 16px;
  text-align: center;
  margin-top: 24px;
`;

const AmountContainer = styled.View`
  align-items: center;
  margin-top: 16px;
`;

const AmountText = styled.Text`
  font-size: 48px;
  font-weight: bold;
`;

const CurrencySelector = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
  background-color: #f5f5f5;
  border-radius: 20px;
  margin-top: 16px;
`;

const CurrencyFlag = styled.Text`
  font-size: 16px;
  margin-right: 8px;
`;

const CurrencyText = styled.Text`
  font-size: 16px;
  font-weight: 500;
`;

const Keypad = styled.View`
  flex: 1;
  padding: 24px;
  margin-top: 32px;
`;

const KeypadRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 32px;
`;

const KeypadButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
`;

const KeypadText = styled.Text`
  font-size: 25px;
  font-weight: 800;
  color:#000,
`;

const NoteContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 16px;
  padding: 12px 16px;
  background-color: #f5f5f5;
  border-radius: 12px;
`;

const NoteInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: #666;
`;

const SendButton = styled.TouchableOpacity`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: #0066ff;
  justify-content: center;
  align-items: center;
  margin-left: 12px;
`;

export default function TransferScreen() {
  const [amount, setAmount] = useState('640');
  const [note, setNote] = useState('');

  const handleNumberPress = (num) => {
    if (amount === '0') {
      setAmount(num);
    } else {
      setAmount(amount + num);
    }
  };

  const handleDeletePress = () => {
    setAmount(amount.slice(0, -1) || '0');
  };

  const handleDecimalPress = () => {
    if (!amount.includes('.')) {
      setAmount(amount + '.');
    }
  };

  return (
    <Container>
     

      <BalanceText>Balance: $48,256.00</BalanceText>

      <AmountContainer>
        <AmountText>£{amount}</AmountText>
        <CurrencySelector>
          <CurrencyFlag>🇬🇧</CurrencyFlag>
          <CurrencyText>GBP</CurrencyText>
          <Icon
            name="chevron-down"
            size={16}
            color="#666"
            style={{marginLeft: 8}}
          />
        </CurrencySelector>
      </AmountContainer>

      <Keypad>
        <KeypadRow>
          {['1', '2', '3'].map(num => (
            <KeypadButton key={num} onPress={() => handleNumberPress(num)}>
              <KeypadText>{num}</KeypadText>
            </KeypadButton>
          ))}
        </KeypadRow>
        <KeypadRow>
          {['4', '5', '6'].map(num => (
            <KeypadButton key={num} onPress={() => handleNumberPress(num)}>
              <KeypadText>{num}</KeypadText>
            </KeypadButton>
          ))}
        </KeypadRow>
        <KeypadRow>
          {['7', '8', '9'].map(num => (
            <KeypadButton key={num} onPress={() => handleNumberPress(num)}>
              <KeypadText>{num}</KeypadText>
            </KeypadButton>
          ))}
        </KeypadRow>
        <KeypadRow>
          <KeypadButton onPress={handleDecimalPress}>
            <KeypadText>.</KeypadText>
          </KeypadButton>
          <KeypadButton onPress={() => handleNumberPress('0')}>
            <KeypadText>0</KeypadText>
          </KeypadButton>
          <KeypadButton onPress={handleDeletePress}>
            <Icon name="delete" size={24} color="#000" />
          </KeypadButton>
        </KeypadRow>
      </Keypad>

      <NoteContainer>
        <NoteInput
          placeholder="Add a note"
          value={note}
          onChangeText={setNote}
          placeholderTextColor="#666"
        />
        <SendButton>
          <Icon name="send" size={24} color="white" />
        </SendButton>
      </NoteContainer>
    </Container>
  );
}
