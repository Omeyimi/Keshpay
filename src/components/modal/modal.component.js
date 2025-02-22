import React, {useState, useEffect} from 'react';
import {
  ModalContainer,
  ModalTitle,
  ModalText,
  Wrapper,
  ButtonWrapper,
  ButtonText1,
  ButtonText2,
} from './modal.styles';
import ButtonContainer from '../button/button.component';
import {GroupedSpacer, Spacer} from '../spacer/spacer.component';
import {Modal, Portal, Text, Button, Provider} from 'react-native-paper';

export const ModalComponent = ({
  home,
  confirmDelivery,
  homeModal,
  confirmDeliveryModal,
  showModal,
  hideModal,
  onPress,
}) => {
  const [dismiss, setDismiss] = React.useState(false);

  const containerStyle = {
    height: 'auto',
  };

  return (
    <Provider>
      <Portal style={{width: '100%', height: '100%'}}>
        <Modal
          visible={home ? homeModal : confirmDeliveryModal}
          dismissable={false}
          style={{paddingHorizontal: '4%'}}
          contentContainerStyle={containerStyle}>
          <ModalContainer paddingHorizontal>
            <Wrapper
              paddingVertical={'40px'}
              justifyContent="space-between"
              paddingHorizontal>
              {confirmDelivery ? (
                <ModalTitle variant="h5">Confirmation</ModalTitle>
              ) : null}

              <Spacer size="large" position="top" />

              <ModalText variant="body">
                {home
                  ? 'Complete your profile and upload document for verification'
                  : confirmDelivery
                  ? 'Are you sure you have successfully delivered dish to the specified location?'
                  : null}
              </ModalText>

              <GroupedSpacer size="large" position="top" />
              <GroupedSpacer size="large" position="top" />
              {home ? (
                <ButtonContainer
                  text="Create"
                  onPress={() => {
                    onPress ? onPress() : null;
                    hideModal ? hideModal() : null;
                  }}
                />
              ) : null}

              {confirmDelivery ? (
                <Wrapper
                  flexDirection="row"
                  justifyContent="flex-end"
                  paddingHorizontal>
                  <ButtonWrapper
                    width="auto"
                    onPress={() => {
                      onPress ? onPress() : null;
                      hideModal ? hideModal() : null;
                    }}>
                    <ButtonText1>Yes Confirm</ButtonText1>
                  </ButtonWrapper>
                  <Spacer size="large" position="right" />
                  <ButtonWrapper
                    width="auto"
                    onPress={() => {
                      hideModal ? hideModal() : null;
                    }}>
                    <ButtonText2>No</ButtonText2>
                  </ButtonWrapper>
                </Wrapper>
              ) : null}
            </Wrapper>
          </ModalContainer>
        </Modal>
      </Portal>
    </Provider>
  );
};
