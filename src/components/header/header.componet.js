import React from "react";
import {
  HeaderCover,
  UserImage,
  HeaderText,
  LeftSide,
  RightSide,
} from "./header.styles";

function HeaderContainer({ svg, text = "Shopping Cart", source }) {
  return (
    <HeaderCover>
      <LeftSide>
        {svg}
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
