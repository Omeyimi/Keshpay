import React from "react";
import {
  HeaderCover,
  UserImage,
  HeaderText,
  LeftSide,
  RightSide,
} from "./header.styles";
import CardImage1 from '../../assets/images/Crunchies.png';


function HeaderContainer({svg, text = 'Shopping Cart', source = CardImage1}) {
  return (
    <HeaderCover>
      <LeftSide>
       
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
