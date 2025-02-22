import React, { useState } from "react";
import { Spacer } from "../spacer/spacer.component";
import { colors } from "../../infrastructure/theme/colors";
import {
  MultiPurposeCardParentContainer,
  MultiPurposeCardContainer,
  ImageSection,
  CardImage,
  InfoSection,
  Wrapper,
  NotificationMessage,
  BoldMessage,
  TimeStampWrapper,
  TimeStamp,
} from "./notification-card.styles";
import Crunchies from "../../assets/images/Crunchies.png";

export const NotificationCard = ({ image, orderNumber, timeStamp }) => {
  return (
    <MultiPurposeCardParentContainer>
      <MultiPurposeCardContainer
        height={110}
        background={colors.white}
        flexDirection="row"
        justifyContent="space-between"
      >
        <ImageSection width="25%">
          <CardImage source={image} resizeMode="cover" />
        </ImageSection>
        <InfoSection width="72%">
          <Wrapper alignItems="flex-start">
            <NotificationMessage variant="caption">
              Your Order{" "}
              <BoldMessage variant="caption">{orderNumber}</BoldMessage> has
              been and confirmed, and will be delivered within 30 min. You can
              track delivery in{" "}
              <BoldMessage variant="caption">Orders</BoldMessage>.
            </NotificationMessage>
          </Wrapper>
          <Spacer size="medium" position="top" />
          <Wrapper alignItems="flex-end">
            <TimeStampWrapper width="auto">
              <TimeStamp variant="caption" numberOfLines={1}>
                {timeStamp}
              </TimeStamp>
            </TimeStampWrapper>
          </Wrapper>
        </InfoSection>
      </MultiPurposeCardContainer>
    </MultiPurposeCardParentContainer>
  );
};

NotificationCard.defaultProps = {
  image: Crunchies,
  orderNumber: "#CR845645",
  timeStamp: "Just Now",
};
