import React, {useState} from 'react';
import {Dimensions} from 'react-native';

import {RightIcon, MessageIcon} from '../../assets/svg/Icons';
import {
  Container,
  FlatListContainer,
  PressableContainer,
  ScrollViewContainer,
} from '../container/container.component';

import {
  CardContainer,
  ContentContainer,
  InfoSection,
  StatusWrapper,
  ProfileImageWrapper,
  VerificationIconStyledWrapper,
  VerificationIconStyled,
  ProfileImage,
  Name,
  TransactionDate,
  Amount,
  Status,
  Wrapper,
  IconBtnContainer,
  IconButtonWrapper,
  ButtonTitle,
} from './horizontalCard.styles';

import {Spacer} from '../spacer/spacer.component';
import CardImage1 from '../../assets/images/CardImage1.png';
import ProfileImg from '../../assets/images/profile.png';

const windowWidth = Dimensions.get('window').width;

export const HorizontalCard = ({variant, onPress, title, subTitle}) => {
  return (
    <CardContainer
      variant={variant}
      onPress={() => {
        onPress();
      }}>
      {variant == 'messageBtn' ? (
        <Wrapper>
          <MessageIcon />
        </Wrapper>
      ) : (
        <ProfileImageWrapper>
          <VerificationIconStyledWrapper>
            <VerificationIconStyled />
          </VerificationIconStyledWrapper>

          <ProfileImage source={ProfileImg} />
        </ProfileImageWrapper>
      )}

      <ContentContainer>
        <InfoSection>
          <Name variant={'body'} numberOfLines={1}>
            {title ? title : 'Jason Evans'}
          </Name>

          <TransactionDate variant="caption" numberOfLines={1}>
            {subTitle ? subTitle : 'Sent . 16th Feb 2025'}
          </TransactionDate>
        </InfoSection>
        {variant == 'messageBtn' || 'userCard' ? (
          <Wrapper>
            <RightIcon />
          </Wrapper>
        ) : (
          <StatusWrapper>
            <Amount variant="body" numberOfLines={1}>
              - $475
            </Amount>

            <Status variant="caption" numberOfLines={1}>
              Successful
            </Status>
          </StatusWrapper>
        )}
      </ContentContainer>
    </CardContainer>
  );
};
