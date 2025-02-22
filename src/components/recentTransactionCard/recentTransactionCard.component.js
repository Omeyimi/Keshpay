import React, {useState} from 'react';
import {Dimensions} from 'react-native';

import {
  LeftArrow,
  Menu,
  BottomArrow,
  UserPlus,
  AddIcon,
  SendIcon,
  RequestIcon,
  WithdrawIcon,
} from '../../assets/svg/Icons';
import {
  Container,
  FlatListContainer,
  PressableContainer,
  ScrollViewContainer,
} from '../../components/container/container.component';

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
} from './recentTransactionCard.styles';

import {Spacer} from '../../components/spacer/spacer.component';
import CardImage1 from '../../assets/images/CardImage1.png';
import ProfileImg from '../../assets/images/profile.png';

const windowWidth = Dimensions.get('window').width;

const RecentTransactionCard = ({profile = true}) => {
  return (
    <CardContainer >
      {profile ? (
        <ProfileImageWrapper>
          <VerificationIconStyledWrapper>
            <VerificationIconStyled />
          </VerificationIconStyledWrapper>

          <ProfileImage source={ProfileImg} />
        </ProfileImageWrapper>
      ) : null}

      <ContentContainer>
        <InfoSection>
          <Name variant="body" numberOfLines={1}>
            Jason Evans
          </Name>

          <TransactionDate variant="caption" numberOfLines={1}>
            Sent . 16th Feb 2025
          </TransactionDate>
        </InfoSection>
        <StatusWrapper>
          <Amount variant="body" numberOfLines={1}>
            - $475
          </Amount>

          <Status variant="caption" numberOfLines={1}>
            Successful
          </Status>
        </StatusWrapper>
      </ContentContainer>
    </CardContainer>
  );
};

export default RecentTransactionCard;
