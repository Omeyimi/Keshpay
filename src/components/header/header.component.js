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
  MenuIconWrapper,
  HeaderTextWrapper,
  WelcomeText,
  RightSide,
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
  profile = true,
}) => {
  // const navigation = useNavigation();
  return (
    <HeaderCover
      flexDirection="row"
      paddingHorizontalBig={paddingHorizontalBig}
      position={position}>
      <LeftSide flexDirection="row" width="auto" justifyContent="flex-start">
        {profile ? (
          <ProfileImageWrapper>
            <VerificationIconStyledWrapper>
              <VerificationIconStyled />
            </VerificationIconStyledWrapper>

            <ProfileImage source={ProfileImg} />
          </ProfileImageWrapper>
        ) : null}
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
      </LeftSide>

      <RightSide>
        <IconButton
          icon={
            <UserPlus
              onPress={() => {
                /*navigation.goBack()*/
              }}
            />
          }
        />

        <IconButton
          icon={
            <MagnifyingGlass
              onPress={() => {
                /*navigation.goBack()*/
              }}
            />
          }
        />
      </RightSide>
    </HeaderCover>
  );
};

Header.defaultProps = {
  text: 'Header',
};

// <HeaderCover
//   flexDirection="row"
//   paddingHorizontal={paddingHorizontal}
//   position={position}>
//   <LeftSide flexDirection="row" width="auto" justifyContent="flex-start">
//     {svg == 'menu' ? (
//       <MenuIconWrapper onPress={() => navigation.toggleDrawer()}>
//         <Menu onPress={() => navigation.toggleDrawer()} />
//       </MenuIconWrapper>
//     ) : svg == 'previous' ? (
//       <MenuIconWrapper onPress={() => navigation.goBack()}>
//         <Arrow onPress={() => navigation.goBack()} />
//       </MenuIconWrapper>
//     ) : null}
//     {svg && <Spacer size="medium" position="right" />}
//     {text ? <HeaderText variant="smallTitle">{text}</HeaderText> : null}
//   </LeftSide>
//   {source ? (
//     <RightSide
//       onTouchStart={() => {
//         navigation.navigate('CourierProfile');
//       }}>
//       <UserImage source={source} />
//     </RightSide>
//   ) : null}
// </HeaderCover>;
