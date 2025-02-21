import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {Spacer} from '../spacer/spacer.component';
import {
  WalletCardContainer,
  LeftSection,
  CurrencyExchangeDropDown,
  WalletBalanceVisibilityWrapper,
  VisibilityIconStyled,
  WalletBalanceTitle,
  WalletBalanceWrapper,
  WalletBalanceText,
  USDCWalletBalanceWrapper,
  USDCWalletBalanceText,
  RightSection,
} from './walletCard.styles';
import {
  // VisibilityIcon,
  OptionIcon,
  CarotDownIcon,
} from '../../assets/svg/Icons';
import CurrencyDropdown from '../customPicker/customPicker.component';


export const WalletCard = ({onPress}) => {




  return (
    <WalletCardContainer>
      <LeftSection>
        <CurrencyExchangeDropDown>
          <CurrencyDropdown />
        </CurrencyExchangeDropDown>

        <WalletBalanceVisibilityWrapper>
          <WalletBalanceTitle variant="button" numberOfLines={1}>
            Wallet Balance
          </WalletBalanceTitle>
          <VisibilityIconStyled />
        </WalletBalanceVisibilityWrapper>

        <WalletBalanceWrapper>
          <WalletBalanceText variant="h4" numberOfLines={1}>
            $48,256.00
          </WalletBalanceText>
        </WalletBalanceWrapper>

        <USDCWalletBalanceWrapper>
          <USDCWalletBalanceText variant="button" numberOfLines={1}>
            48,256.00 USDC
          </USDCWalletBalanceText>
        </USDCWalletBalanceWrapper>
      </LeftSection>
      <RightSection>
        <OptionIcon onPress={() => {}} />
      </RightSection>
    </WalletCardContainer>
  );
};
