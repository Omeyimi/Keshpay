import React from "react";
import {
  MapButtonBannerContainer,
  Wrapper,
  VerifiedIcon,
  WaitingIcon,
  BannerTitle,
  CloseIcon,
} from "./mapButtonBanner.styles";
import { Spacer } from "../../components/spacer/spacer.component";
import { colors } from "../../infrastructure/theme/colors";

export const MapButtonBanner = ({
  accountVerified,
  waitingVerification,
  close,
  bannerText,
  textColor,
  onPress,
}) => {
  return (
    <MapButtonBannerContainer
      onPress={() => {
        onPress ? onPress() : null;
      }}
    >
      <Wrapper width="15%">
        {accountVerified || waitingVerification ? (
          <VerifiedIcon
            name={
              accountVerified
                ? "checkcircle"
                : waitingVerification
                ? "warning"
                : null
            }
            size={20}
            color={
              accountVerified
                ? colors.green.strong
                : waitingVerification
                ? colors.red.strong
                : null
            }
          />
        ) : null}
      </Wrapper>
      <Wrapper width="65%">
        <BannerTitle variant="body" color={textColor}>
          {bannerText}
        </BannerTitle>
      </Wrapper>
      <Wrapper width="15%">
        {close ? (
          <CloseIcon name="close" size={20} color={colors.primary} />
        ) : null}
      </Wrapper>
    </MapButtonBannerContainer>
  );
};

// PaymentMethod.defaultProps = {};
