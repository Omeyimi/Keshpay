import React from "react";
import {
  ManagementCard,
  FlexComponent,
  TextContent,
  ManagementBtn,
  FlexContainer,
  ImageContainer,
  Imaged,
  DefaultWrap,
  PriceWrapper,
  NairaIcon,
  PriceFigure,
} from "./index.styles";
import { colors } from "../../infrastructure/theme/colors";
import Person from "../../assets/images/pdf.png";
import { fontWeights } from "../../infrastructure/theme/fonts";
import Phone from "react-native-vector-icons/Feather";
import { Platform, Linking, Alert, TouchableOpacity } from "react-native";
import { Spacer } from "../spacer/spacer.component";

const DeliveryManagementCard = ({
  DeliveryAgentTitle = true,
  UserInfoSection = true,
  OrderDetailsSection = true,
  picture = Person,
  total = 6400,
  progress = "On Delivery- Tracking",
  name = "Nico Marks",
  email = "matthewcabret@gmail.com",
  food = "Hot Dog Pie",
  invoiceNo = "#CR845645",
  date = "22-04-2021",
  time = "01:30PM",
  phoneNumber = "08033367388",
  bgColor,
  onPress
}) => {
  /**
   *
   * @param {*} phone refers to delivery agent's phone number
   * Link button to make a phone call
   */
  const makePhoneCall = (phone) => {
    let phoneNumber = phone;
    if (Platform.OS !== "android") {
      phoneNumber = `telprompt:${phone};`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          Alert.alert("Phone number is not available");
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <ManagementCard>
      {DeliveryAgentTitle ? (
        <>
          <Spacer size="large" position="top" />
          <FlexComponent>
            <TextContent>Delivery Agent</TextContent>
            <ManagementBtn onPress={onPress} bgColor={bgColor}>
              <TextContent
                fontSize="16px"
                color={colors.bg.white}
                fontWeight={fontWeights.bold}
              >
                {progress}
              </TextContent>
            </ManagementBtn>
          </FlexComponent>
        </>
      ) : null}
      {UserInfoSection ? (
        <FlexComponent>
          <FlexComponent>
            <ImageContainer>
              <Imaged source={picture} />
            </ImageContainer>
            <DefaultWrap>
              <TextContent
                lineHeights="26px"
                fontSize="16px"
                color={colors.black.strong}
                fontWeight={fontWeights.bold}
              >
                {name}
              </TextContent>
              <TextContent fontSize="12px">{email}</TextContent>
            </DefaultWrap>
          </FlexComponent>
          <TouchableOpacity onPress={() => makePhoneCall(+phoneNumber)} style={{ backgroundColor: colors.primary, padding: 4, borderRadius: 8}}>
            <Phone name="phone" size={15} color={colors.white} />
          </TouchableOpacity>
        </FlexComponent>
      ) : null}
      {OrderDetailsSection ? (
        <>
          <DefaultWrap>
            <FlexComponent>
              <TextContent>Order ID:</TextContent>
              <TextContent
                fontWeight={fontWeights.bold}
                color={colors.black.strong}
              >
                {invoiceNo} - {food}
              </TextContent>
            </FlexComponent>
            <FlexComponent>
              <TextContent>Order Date:</TextContent>
              <TextContent
                fontWeight={fontWeights.bold}
                color={colors.black.strong}
              >
                {date} - {time}
              </TextContent>
            </FlexComponent>
            <FlexComponent>
              <TextContent>Total</TextContent>
              <PriceWrapper flexDirection="row">
                <NairaIcon name="currency-ngn" size={9} />
                <PriceFigure variant="body" numberOfLines={1}>
                  {total}
                </PriceFigure>
              </PriceWrapper>
            </FlexComponent>
          </DefaultWrap>
          <Spacer size="large" position="top" />
        </>
      ) : null}
    </ManagementCard>
  );
};

export default DeliveryManagementCard;
