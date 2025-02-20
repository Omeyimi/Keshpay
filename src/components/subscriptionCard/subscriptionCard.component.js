import React, {useState} from 'react';
import {Spacer} from '../spacer/spacer.component';
import {
  SubscriptionCardContainer,
  Wrapper,
  CircleBorder,
  Circle,
  DurationInfoWrapper,
  DurationName,
  DurationInDays,
  DiscountedAmount,
  InitialAmount,
} from './subscriptionCard.styles';
import CardBg from '../../assets/images/Crunchies.png';
import {colors} from '../../infrastructure/theme/colors';
import {PlayIcon} from '../../assets/svg/Icons';
import CardImage1 from '../../assets/images/CardImage1.png';

export const SubscriptionCard = ({
  item,
  onPress,
  selectedCard,
  setSelectedCard,
}) => {
  const selectSubscription = id => {
    setSelectedCard(id);  
  };


  return (
    <SubscriptionCardContainer
      onPress={() => {
        selectSubscription(item.id);
      }}
      selectedCard={selectedCard}>
      <DurationInfoWrapper>
        <Wrapper>
          <CircleBorder selectedCard={selectedCard}>
            <Circle selectedCard={selectedCard} />
          </CircleBorder>
        </Wrapper>

        <Wrapper style={{marginLeft: 25}}>
          <DurationName variant="title">
            {item.duration ? item.duration : 'Monthly'}
          </DurationName>
          <DurationInDays variant="button">
            {item.durationInDays
              ? `valid for ${item.durationInDays} days`
              : 'valid for 30 days'}
          </DurationInDays>
        </Wrapper>
      </DurationInfoWrapper>
      <Wrapper>
        <DiscountedAmount variant="smallTitle">
          {item.discountedAmount ? item.discountedAmount : '#5,500.00'}
        </DiscountedAmount>
        <InitialAmount variant="button">
          {item.initialAmount ? item.initialAmount : '#7,500.00'}
        </InitialAmount>
      </Wrapper>
    </SubscriptionCardContainer>
  );
};
