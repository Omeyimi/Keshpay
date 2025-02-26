import React from 'react';
import {Spacer} from '../spacer/spacer.component';
// import { useNavigation } from "@react-navigation/native";
import {
  HeaderCover,
  LeftSide,
  ProfileImageWrapper,
  VerificationIconStyledWrapper,
  VerificationIconStyled,
  ProfileImage,
  InfoSection,
  Name,
  Title,
  MenuIconWrapper,
  HeaderTextWrapper,
  WelcomeText,
  RightSide,
  ContentContainer,
} from './header.styles';
import {
  LeftArrow,
  Menu,
  BottomArrow,
  UserPlus,
  MagnifyingGlass,
} from '../../assets/svg/Icons';
import ProfileImg from '../../assets/images/profile.png';
import ButtonContainer from '../button/button.component';
import IconButton from '../iconButton/iconButton.component';

export const Header = ({
  svg,
  text,
  grade,
  paddingHorizontal,
  paddingHorizontalBig,
  position,
  showModal,
  selected,
  navigation,
  profile,
  userHeader,
  title,
  name,
}) => {
  // const navigation = useNavigation();
  return (
    <HeaderCover
      flexDirection="row"
      paddingHorizontalBig={paddingHorizontalBig ? '4%' : null}
      position={position}>
      <LeftSide flexDirection="row" width="auto" justifyContent="flex-start">
        {svg == 'menu' ? (
          <MenuIconWrapper
            onPress={() => {
              /*navigation.toggleDrawer()*/
            }}>
            <Menu
              onPress={() => {
                /*navigation.toggleDrawer()*/
              }}
            />
          </MenuIconWrapper>
        ) : svg == 'previous' ? (
          <MenuIconWrapper
            onPress={() => {
              navigation.goBack();
            }}>
            <LeftArrow
              onPress={() => {
                /*navigation.goBack()*/
              }}
            />
          </MenuIconWrapper>
        ) : (
          <HeaderTextWrapper>
            <WelcomeText variant="button">Hi, Adeola </WelcomeText>
            {/* <UserNameText variant="title">leonard victor</UserNameText> */}
          </HeaderTextWrapper>
        )}

        {profile || userHeader ? (
          <ProfileImageWrapper>
            <VerificationIconStyledWrapper>
              <VerificationIconStyled />
            </VerificationIconStyledWrapper>

            <ProfileImage source={ProfileImg} />
          </ProfileImageWrapper>
        ) : null}

        {userHeader ? (
          <InfoSection>
            <Title variant="caption" numberOfLines={1}>
              {title ? title : 'Send to'}
            </Title>
            <Name variant={'body'} numberOfLines={1}>
              {name ? name : 'Jason Evans'}
            </Name>
          </InfoSection>
        ) : null}
      </LeftSide>

      <RightSide>
        {profile ? (
          <>
            <IconButton
              icon={
                <UserPlus
                  onPress={() => {
                    /*navigation.goBack()*/
                  }}
                />
              }
            />

            <IconButton icon={<MagnifyingGlass onPress={() => {}} />} />
          </>
        ) : null}
      </RightSide>
    </HeaderCover>
  );
};

Header.defaultProps = {
  text: 'Header',
};
