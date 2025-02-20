import React from "react";
import {
  HeaderCover,
  UserImage,
  HeaderText,
  LeftSide,
  RightSide,
} from "./header.styles";
import CardImage1 from '../../assets/images/CardImage1.png';
import {LeftArrow, Menu, BottomArrow} from '../../assets/svg/Icons';

function HeaderContainer({svg, text = 'Shopping Cart', source = CardImage1}) {
  return (
    <HeaderCover>
      <LeftSide>
        <LeftArrow />
        <HeaderText>{text}</HeaderText>
      </LeftSide>
      {/* {source && ( */}
      <RightSide>
        <UserImage source={source} />
      </RightSide>
      {/* )} */}
    </HeaderCover>
  );
}

export default HeaderContainer;
