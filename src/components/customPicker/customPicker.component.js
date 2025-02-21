import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {
  PickerContainer,
  DropdownHeader,
  DropdownList,
  DropdownItem,
  SelectedText,
  Arrow,
  ItemText,
  FlatListContainerStyled,
} from './customPicker.styles';

const CurrencyDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const currencies = [
    {code: 'USD', name: 'United States Dollar', icon: '🇺🇸'},
    {code: 'EUR', name: 'Euro', icon: '🇪🇺'},
    {code: 'GBP', name: 'British Pound', icon: '🇬🇧'},
  ];

   const renderItem = ({item}) => (
     <DropdownItem
       onPress={() => {
         setSelectedCurrency(item.code);
         setIsOpen(false);
       }}>
       <ItemText variant="button" numberOfLines={1}>
         {item.icon} {item.name}
       </ItemText>
     </DropdownItem>
   );

  return (
    <PickerContainer>
      <DropdownHeader onPress={() => setIsOpen(!isOpen)}>
        <SelectedText variant="caption" numberOfLines={1}>
          {currencies.find(c => c.code === selectedCurrency)?.icon}
          {'  '}
          {selectedCurrency}
        </SelectedText>

        <Arrow variant="button" numberOfLines={1}>
          {isOpen ? '▲' : '▼'}
        </Arrow>
      </DropdownHeader>

      {isOpen && (
        <FlatListContainerStyled
          background={'#fff'}
          data={currencies}
          renderItem={renderItem}
          keyExtractor={item => item.code}
        />
      )}
    </PickerContainer>
  );
};



export default CurrencyDropdown;
