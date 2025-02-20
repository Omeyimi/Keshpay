import React from 'react';
import {Spacer} from '../spacer/spacer.component';
// import { useNavigation } from "@react-navigation/native";
import {
  HeaderCover,
  LeftSide,
  MenuIconWrapper,
  HeaderTextWrapper,
  WelcomeText,
  UserNameText,
  HeaderText,
  UserImage,
  RightSide,
  GradeName,
} from './header.styles';
import {LeftArrow, Menu, BottomArrow} from '../../assets/svg/Icons';

export const Header = ({
  svg,
  text,
  grade,
  paddingHorizontal,
  position,
  showModal,
  selected,
  navigation
}) => {
  // const navigation = useNavigation();
  return (
    <HeaderCover
      flexDirection="row"
      paddingHorizontal={paddingHorizontal}
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
              navigation.goBack()
            }}>
            <LeftArrow
              onPress={() => {
                /*navigation.goBack()*/
              }}
            />
          </MenuIconWrapper>
        ) : (
          <HeaderTextWrapper>
            <WelcomeText variant="button">welcome back 👋</WelcomeText>
            <UserNameText variant="title">leonard victor</UserNameText>
          </HeaderTextWrapper>
        )}
      </LeftSide>

      {grade ? (
        <RightSide
          onPress={() => {
            showModal ? showModal() : null;
            console.log('Clicking!!');
          }}>
          <GradeName variant="button">{selected ? selected : 'SS 2'}</GradeName>
          <BottomArrow
            onPress={() => {
              /*navigation.goBack()*/
            }}
          />
        </RightSide>
      ) : null}
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
