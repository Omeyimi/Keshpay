import React, {useState, useEffect} from 'react';
import {
  ModalContainer,
  ModalTitle,
  ModalText,
  Wrapper,
  SelectableButtonWrapper,
  ButtonWrapper,
  ButtonText1,
  ButtonText2,
} from './modal.styles';
import ButtonContainer from '../button/button.component';
import {GroupedSpacer, Spacer} from '../spacer/spacer.component';
import {Modal, Portal, Text, Button, PaperProvider} from 'react-native-paper';
import {FlatListContainer} from '../container/container.component';

export const ModalComponent = ({
  home,
  confirmDelivery,
  homeModal,
  confirmDeliveryModal,
  showModal,
  hideModal,
  onPress,
  selected,
  setSelected,
}) => {
  const [dismiss, setDismiss] = React.useState(false);

  const containerStyle = {
    height: 'auto',
  };
  const data = [
    {
      key: 1,
      grade: 'KG 1',
    },
    {
      key: 2,
      grade: 'KG 2',
    },
    {
      key: 3,
      grade: 'KG 3',
    },
    {
      key: 4,
      grade: 'Grade 1',
    },
    {
      key: 5,
      grade: 'Grade 2',
    },
    {
      key: 6,
      grade: 'Grade 3',
    },
    {
      key: 7,
      grade: 'Grade 4',
    },
    {
      key: 8,
      grade: 'Grade 5',
    },
    {
      key: 9,
      grade: 'Grade 6',
    },
    {
      key: 10,
      grade: 'JS 1',
    },
    {
      key: 11,
      grade: 'JS 2',
    },
    {
      key: 12,
      grade: 'JS 3',
    },
    {
      key: 13,
      grade: 'SS 1',
    },
    {
      key: 14,
      grade: 'SS 2',
    },
    {
      key: 15,
      grade: 'SS 3',
    },
  ];

  const selectGrade = selectedGrade => {
    setSelected(selectedGrade);
  };

  return (
    <Portal>
      <Modal
        visible={homeModal}
        onDismiss={hideModal}
        style={{paddingHorizontal: '4%'}}
        contentContainerStyle={containerStyle}>
        <ModalContainer paddingHorizontal>
          <Wrapper
            paddingVertical={'40px'}
            justifyContent="space-between"
            paddingHorizontal>
            <ModalTitle variant="h5">choose grade ✍️</ModalTitle>

            <Spacer size="medium" position="top" />

            <Wrapper width="100%" paddingHorizontal={0}>
              <FlatListContainer
                width={'100%'}
                data={data}
                keyExtractor={item => item.key}
                numColumns={2}
                columnWrapperStyle={{
                  justifyContent: 'space-between',
                }}
                contentContainerStyle={
                  {
                    // width: '100%',
                  }
                }
                ItemSeparatorComponent={() => (
                  <Spacer size="large" position="top" />
                )}
                // contentContainerStyle={{paddingEnd: 16}}
                // ItemSeparatorComponent={() => (
                //   <Spacer size="large" position="right" />
                // )}
                renderItem={({item}) => (
                  <SelectableButtonWrapper>
                    <ButtonContainer
                      // fontSizeVariant=""
                      textTransform="uppercase"
                      backgroundColor={
                        selected === item.grade ? '#00AAFF' : '#F5F5F5'
                      }
                      color={selected === item.grade ? '#fff' : '#000'}
                      text={item.grade}
                      onPress={() => {
                        selectGrade ? selectGrade(item.grade) : null;
                      }}
                    />
                  </SelectableButtonWrapper>
                )}
              />
            </Wrapper>
            {/* <GroupedSpacer size="large" position="top" /> */}
            <GroupedSpacer size="large" position="top" />
            {home ? (
              <ButtonContainer
                text="Submit"
                onPress={() => {
                  onPress ? onPress() : null;
                  hideModal ? hideModal() : null;
                }}
              />
            ) : null}

        
          </Wrapper>
        </ModalContainer>
      </Modal>
    </Portal>
  );
};
