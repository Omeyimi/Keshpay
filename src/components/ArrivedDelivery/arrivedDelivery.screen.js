import React, { useState, useEffect } from "react";
import { SafeArea } from "../../components/utility/safe-area.component";
import { Header } from "../../components/header/header.component";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../infrastructure/theme/colors";
import {
  PageContainer,
  ContentContainer,
  Wrapper,
  ModalWrapper,
  MapInfoContainer,
  ContainerHandle,
  HeaderText,
  CardText,
  HorizontalTable,
  LeftSection,
  RightSection,
  BigText,
  SubText,
} from "./arrivedDelivery.style";
import { Spacer } from "../../components/spacer/spacer.component";
import ButtonContainer from "../../components/button/button.component";
import CartIcon from "react-native-vector-icons/FontAwesome";
import TextInputContainer from "../../components/textInput/textInput.component";
import { CheckboxComponent } from "../../components/checkBox/checkBox.component";
import { Map } from "../../components/map/map.component";
import DeliveryManagementCard from "../../components/deliveryManagementCard/index.component";
import Profile from "../../assets/profile.png";
import { Menu } from "../../assets/Icons";
import { MapButtonBanner } from "../../components/mapButtonBanner/mapButtonBanner.component";
import { ModalComponent } from "../../components/modal/modal.component";
import navigationTheme from "../../infrastructure/theme/navigation-theme";

const ArrivedDelivery = ({ navigation }) => {
  const [confirmDeliveryModal, setconfirmDeliveryModal] = useState(false);

  const showModal = () => {
    setconfirmDeliveryModal(true);
  };
  const hideModal = () => setconfirmDeliveryModal(false);

  const confirmDelivery = true;

  return (
    <SafeArea showStatusBar={true}>
      <PageContainer height="100%">
        <ContentContainer>
          <Map />
          <Header
            text={null}
            paddingHorizontal
            position="absolute"
            source={Profile}
            svg="menu"
          />
          <Wrapper paddingHorizontal position="absolute" top margin={0}>
            <MapButtonBanner
              bannerText="Arrived at Delivery"
              textColor={colors.green.strong}
            />
          </Wrapper>

          <ModalWrapper
            paddingHorizontal
            confirmDeliveryModal={confirmDeliveryModal}
          >
            <ModalComponent
              confirmDeliveryModal={confirmDeliveryModal}
              showModal={showModal}
              hideModal={hideModal}
              confirmDelivery={confirmDelivery}
              onPress={() => {
                navigation.navigate("SubmitSuccessful1");
              }}
            />
          </ModalWrapper>

          <MapInfoContainer paddingHorizontal>
            <Wrapper>
              <ContainerHandle />
            </Wrapper>

            <Wrapper>
              <LeftSection>
                <BigText variant="smallBody">Delivery Location</BigText>
                <Spacer size="small" position="top" />
                <SubText variant="caption">
                  145 Abia polytechnic street, off Aba Owerii Road, Abia,
                  Nigeria
                </SubText>
              </LeftSection>
              <Spacer size="large" position="top" />
            </Wrapper>
            <>
              <BigText variant="smallBody">Deliver to</BigText>
              <DeliveryManagementCard
                DeliveryAgentTitle={false}
                OrderDetailsSection={false}
              />
            </>

            <Wrapper>
              <ButtonContainer
                text="Dish Delivered"
                onPress={() => {
                  showModal();
                }}
              />
              <Spacer size="medium" position="top" />
              <ButtonContainer
                backgroundColor={colors.bg.darkOrange}
                color={colors.primary}
                text="Cancel"
                onPress={() => {
                  navigation.navigate("HomeNavigator");
                }}
              />
            </Wrapper>
          </MapInfoContainer>
        </ContentContainer>
      </PageContainer>
    </SafeArea>
  );
};

export default ArrivedDelivery;
