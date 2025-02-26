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
} from './search.style';
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
import CardImage1 from '../../assets/images/CardImage1.png';
import {MultiPurposeCard} from '../../components/multiPurposeCard/multiPurposeCard.component';
import {StandardUserCard} from '../../components/standardUserCard/standardUserCard.component';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {MapButtonBanner} from '../../components/mapButtonBanner/mapButtonBanner.component';

const Search = ({navigation}) => {
  const [activateSearch, setActivateSearch] = useState(false);
  const [submitSearch, setSubmitSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false); // State to track focus
  // ref

  const searchBarRef = useRef(null); // Ref for the Searchbar
  // Focus the Searchbar when the screen mounts
  useEffect(() => {
    if (searchBarRef.current) {
      searchBarRef.current.focus();
    }
  }, []);

  // callbacks
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  const snapPoints = useMemo(() => ['25%', '50%', '75%', '85%'], []);
  const handleCloseBottomSheet = () => bottomSheetRef.current.close();
  const handleOpenBottomSheet = () => bottomSheetRef.current.expand();

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

  const loadMoreData = [
    // Add more items to be loaded
    {
      key: 1,
      image: CardImage1,
      firstGradientColor: '#0af',
      secondGradientColor: '#0af',
      thirdGradientColor: 'transparent',
      headerText: 'first time subscription',
      discountPercentage: '25%',
      description:
        'Lorem ipsum dolor sit amet consectetur. Ut pellentesque sit amet',
    },
    {
      key: 2,
      image: CardImage1,
      firstGradientColor: '#3DAF49',
      secondGradientColor: '#3DAF49',
      thirdGradientColor: 'transparent',
      headerText: 'first time subscription',
      discountPercentage: '45%',
      description:
        'Lorem ipsum dolor sit amet consectetur. Ut pellentesque sit amet',
    },
    {
      key: 3,
      image: CardImage1,
      firstGradientColor: '#7D29EA',
      secondGradientColor: '#7D29EA',
      thirdGradientColor: 'transparent',
      headerText: 'first time subscription',
      discountPercentage: '55%',
      description:
        'Lorem ipsum dolor sit amet consectetur. Ut pellentesque sit amet',
    },
    {
      key: 4,
      image: CardImage1,
      firstGradientColor: '#7D29EA',
      secondGradientColor: '#7D29EA',
      thirdGradientColor: 'transparent',
      headerText: 'first time subscription',
      discountPercentage: '55%',
      description:
        'Lorem ipsum dolor sit amet consectetur. Ut pellentesque sit amet',
    },
    {
      key: 5,
      image: CardImage1,
      firstGradientColor: '#0af',
      secondGradientColor: '#0af',
      thirdGradientColor: 'transparent',
      headerText: 'first time subscription',
      discountPercentage: '25%',
      description:
        'Lorem ipsum dolor sit amet consectetur. Ut pellentesque sit amet',
    },
    {
      key: 6,
      image: CardImage1,
      firstGradientColor: '#3DAF49',
      secondGradientColor: '#3DAF49',
      thirdGradientColor: 'transparent',
      headerText: 'first time subscription',
      discountPercentage: '45%',
      description:
        'Lorem ipsum dolor sit amet consectetur. Ut pellentesque sit amet',
    },
    {
      key: 7,
      image: CardImage1,
      firstGradientColor: '#7D29EA',
      secondGradientColor: '#7D29EA',
      thirdGradientColor: 'transparent',
      headerText: 'first time subscription',
      discountPercentage: '55%',
      description:
        'Lorem ipsum dolor sit amet consectetur. Ut pellentesque sit amet',
    },
    {
      key: 8,
      image: CardImage1,
      firstGradientColor: '#7D29EA',
      secondGradientColor: '#7D29EA',
      thirdGradientColor: 'transparent',
      headerText: 'first time subscription',
      discountPercentage: '55%',
      description:
        'Lorem ipsum dolor sit amet consectetur. Ut pellentesque sit amet',
    },
    // Add more items as needed
  ];

  const renderSectionHeader = ({section}) => (
    <CardListHeader title={section.title} />
  );

  const renderItem = ({item}) => {
    return (
      <RowContainer>
        <Item
          item={item}
          onPress={() => navigation.navigate('AnotherComponent')}
        />
        {item.empty ? null : (
          <Item
            item={item}
            onPress={() => navigation.navigate('AnotherComponent')}
          />
        )}
      </RowContainer>
    );
  };

  const sections = [
    {
      title: 'Your Contacts',
      data: [
        {id: '1', name: 'Item 1'},
        {id: '2', name: 'Item 2'},
      ],
    },
    {
      title: 'Not in your contacts',
      data: [
        {id: '4', name: 'Item 4'},
        {id: '5', name: 'Item 5'},
        {id: '6', name: 'Item 6'},
      ],
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
          <SearchBar
            placeholder="Search by name or @Username"
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            // onFocus={() => setIsFocused(true)} // Set isFocused to true on focus
            onBlur={() => setIsFocused(false)} // Set isFocused to false on blur
            ref={searchBarRef}
          />

          <Wrapper>
            {searchQuery.length > 0 ? (
              <SectionList
                sections={sections}
                style={{
                  width: '100%',
                }}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                  <HorizontalCard
                    variant={'userCard'}
                    title={'Ayomide Eze'}
                    subTitle={'@Ayomide'}
                    onPress={() => navigation.navigate('CalculateTransaction')}
                  />
                )}
                renderSectionHeader={({section}) => (
                  <CardListHeader title={section.title} />
                )}
                onEndReachedThreshold={0.1}
                SectionSeparatorComponent={() => (
                  <Spacer size="small" position="top" />
                )}
                stickySectionHeadersEnabled={false}
              />
            ) : (
              <EmptyState />
            )}
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

export default Search;
