import React, {useState, useEffect, useMemo, useCallback, useRef} from 'react';
import {Header} from '../../components/header/header.component';
import {
  View,
  SectionList,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {colors} from '../../infrastructure/theme/colors';
import {
  PageContainer,
  ContentContainer,
  Wrapper,
  ModalWrapper,
  MapInfoContainer,
  ContainerHandle,
  BalanceText,
  AmountContainer,
  AmountText,
  CurrencySelector,
  CurrencyFlag,
  CurrencyText,
  Keypad,
  KeypadRow,
  KeypadButton,
  KeypadText,
  NoteContainer,
  NoteInput,
  SendButton,
} from './calculateTransaction.styles';
import {Spacer} from '../../components/spacer/spacer.component';
import {ModalComponent} from '../../components/modal/modal.component';
import Icon from 'react-native-vector-icons/FontAwesome6';
import DotIcon from 'react-native-vector-icons/Octicons';
import FeatherIcons from 'react-native-vector-icons/Feather';
import Profile from '../../assets/images/profile.png';
import IconButton from '../../components/iconButton/iconButton.component';

const CalculateTransaction = ({navigation}) => {
  const [amount, setAmount] = useState('640');
  const [note, setNote] = useState('');

  const handleNumberPress = num => {
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
    <PageContainer>
      <ContentContainer>
        <Wrapper>
          <ContainerHandle />
        </Wrapper>

        <MapInfoContainer>
          <Header
            text={null}
            svg="previous"
            userHeader={true}
            paddingHorizontalBig
          />


          <Wrapper gap={'8'} paddingVertical={'25'} margin={0}>
            <BalanceText variant={'body'}>Balance: $48,256.00</BalanceText>

            <AmountContainer gap={'12'}>
              <AmountText variant={'h3'}>£{amount}</AmountText>
              <CurrencySelector>
                <CurrencyFlag>🇬🇧</CurrencyFlag>
                <CurrencyText variant={'body'}>GBP</CurrencyText>
                <Icon
                  name="chevron-down"
                  size={16}
                  color="#666"
                  style={{marginLeft: 8}}
                />
              </CurrencySelector>
            </AmountContainer>
          </Wrapper>

          <Keypad>
            <KeypadRow>
              {['1', '2', '3'].map(num => (
                <KeypadButton key={num} onPress={() => handleNumberPress(num)}>
                  <KeypadText variant={'h5'}>{num}</KeypadText>
                </KeypadButton>
              ))}
            </KeypadRow>
            <KeypadRow>
              {['4', '5', '6'].map(num => (
                <KeypadButton key={num} onPress={() => handleNumberPress(num)}>
                  <KeypadText variant={'h5'}>{num}</KeypadText>
                </KeypadButton>
              ))}
            </KeypadRow>
            <KeypadRow>
              {['7', '8', '9'].map(num => (
                <KeypadButton key={num} onPress={() => handleNumberPress(num)}>
                  <KeypadText variant={'h5'}>{num}</KeypadText>
                </KeypadButton>
              ))}
            </KeypadRow>
            <KeypadRow>
              <KeypadButton onPress={handleDecimalPress}>
                {/* <DotIcon name="dot-fill" size={20} color="#000" /> */}
                <KeypadText variant={'h4'}>.</KeypadText>
              </KeypadButton>
              <KeypadButton onPress={() => handleNumberPress('0')}>
                <KeypadText variant={'h5'}>0</KeypadText>
              </KeypadButton>
              <KeypadButton onPress={handleDeletePress}>
                <FeatherIcons name="delete" size={24} color="#000" />
              </KeypadButton>
            </KeypadRow>
          </Keypad>

          <NoteContainer paddingHorizontalBig>
            <NoteInput
              placeholder="Add a note"
              value={note}
              onChangeText={setNote}
              placeholderTextColor="#666"
            />

            
            {/* <SendButton> */}
            {/* <FeatherIcons name="send" size={24} color="white" />
              </SendButton> */}

            <IconButton
              backgroundColor={'#1474E1'}
              // color?: string | undefined;
              // activeColor: any;
              size={30}
              icon={<FeatherIcons name="send" size={24} color="white" />}
              onPress={() => {}}
            />
          </NoteContainer>
        </MapInfoContainer>
      </ContentContainer>
    </PageContainer>
  );
};

export default CalculateTransaction;
