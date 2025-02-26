import React, {useState, useEffect, useMemo, useCallback, useRef} from 'react';
import {Header} from '../../components/header/header.component';
import {
  View,
  SectionList,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {colors} from '../../infrastructure/theme/colors';
import {
  PageContainer,
  ContentContainer,
  Wrapper,
  ModalWrapper,
  MapInfoContainer,
  ContainerHandle,
  EmptyContainer,
  EmptyTitleText,
  EmptyBodyText,
} from './recent.styles';
import {Spacer} from '../../components/spacer/spacer.component';
import {ModalComponent} from '../../components/modal/modal.component';
import {SearchBar} from '../../components/searchBar/searchBar.component';
import {HorizontalCard} from '../../components/horizontalCard/horizontalCard.component';
import {CardListHeader} from '../../components/cardListHeader/cardListHeader.component';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {
  FlatListContainer,
  PressableContainer,
} from '../../components/container/container.component';

import HausaLanguageImage from '../../assets/images/HausaLanguage.png';
import {StandardUserCard} from '../../components/standardUserCard/standardUserCard.component';

const Recent = ({navigation}) => {
  const recentTransactionCardData = [
    {
      id: 1,
      image: HausaLanguageImage,
      firstGradientColor: '#0af',
      secondGradientColor: '#0af',
      thirdGradientColor: 'transparent',
      headerText: 'Hausa Language',
      discountPercentage: '25%',
      description:
        'Lorem ipsum dolor sit amet consectetur. Ut pellentesque sit amet',
    },
    {
      id: 2,
      image: HausaLanguageImage,
      firstGradientColor: '#0af',
      secondGradientColor: '#0af',
      thirdGradientColor: 'transparent',
      headerText: 'Hausa Language',
      discountPercentage: '25%',
      description:
        'Lorem ipsum dolor sit amet consectetur. Ut pellentesque sit amet',
    },
    {
      id: 3,
      image: HausaLanguageImage,
      firstGradientColor: '#0af',
      secondGradientColor: '#0af',
      thirdGradientColor: 'transparent',
      headerText: 'Hausa Language',
      discountPercentage: '25%',
      description:
        'Lorem ipsum dolor sit amet consectetur. Ut pellentesque sit amet',
    },
    {
      id: 4,
      image: HausaLanguageImage,
      firstGradientColor: '#0af',
      secondGradientColor: '#0af',
      thirdGradientColor: 'transparent',
      headerText: 'Hausa Language',
      discountPercentage: '25%',
      description:
        'Lorem ipsum dolor sit amet consectetur. Ut pellentesque sit amet',
    },
  ];

  const EmptyState = () => (
    <EmptyContainer>
      <Icon
        name="magnifying-glass"
        color={colors.black.soft}
        size={40}
        style={styles.emptyIcon}
      />

      <EmptyTitleText variant="body">
        Search for anyone on Keshpay
      </EmptyTitleText>
      <EmptyBodyText variant="button">
        No contact details required, simply enter their name to check if they're
        on Keshpay.
      </EmptyBodyText>
    </EmptyContainer>
  );

  return (
    <PageContainer>
      <ContentContainer>
        <Wrapper>
          <ContainerHandle />
        </Wrapper>

        <MapInfoContainer paddingHorizontalBig>
          <PressableContainer
            onPress={() => {
              navigation.navigate('Search');
            }}>
            <Wrapper pointerEvents="box-only">
              <SearchBar placeholder="Search by name or @Username" />
            </Wrapper>
          </PressableContainer>

          <Wrapper>
            <CardListHeader title={'Recents'} />
            <FlatListContainer
              data={recentTransactionCardData}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={() => (
                <Spacer size="large" position="right" />
              )}
              ListEmptyComponent={<EmptyState />}
              style={{width: '100%'}}
              paddingEnd={16}
              horizontal={true}
              showHorizontalscrollIndicator={false}
              renderItem={({item}) => <StandardUserCard />}
            />
            <Spacer size="large" position="top" />

            <HorizontalCard
              variant={'messageBtn'}
              title={'Pay People Not on KeshPay'}
              subTitle={'Send Via Message'}
            />
          </Wrapper>
        </MapInfoContainer>
      </ContentContainer>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  emptyIcon: {
    // width: 100,
    // height: 100,
    marginBottom: 15,
  },

  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'blue',
  },
});

export default Recent;
