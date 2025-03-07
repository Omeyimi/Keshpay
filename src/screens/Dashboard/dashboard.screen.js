import React, {useState, useEffect, useCallback, useMemo, useRef} from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import {
  AddIcon,
  SendIcon,
  RequestIcon,
  WithdrawIcon,
} from '../../assets/svg/Icons';
import {FlatListContainer} from '../../components/container/container.component';
import {Header} from '../../components/header/header.component';
import {colors} from '../../infrastructure/theme/colors';
import {
  PageContainer,
  ContentContainer,
  Wrapper,
  IconBtnContainer,
  IconButtonWrapper,
  ButtonTitle,
  EmptyContainer,
  EmptyText,
} from './dashboard.styles';

import {Spacer} from '../../components/spacer/spacer.component';
import CardImage1 from '../../assets/images/CardImage1.png';
import {CardListHeader} from '../../components/cardListHeader/cardListHeader.component';

import HausaLanguageImage from '../../assets/images/HausaLanguage.png';
import {ModalComponent} from '../../components/modal/modal.component';
import {WalletCard} from '../../components/walletCard/walletCard.component';
import IconButton from '../../components/iconButton/iconButton.component';

import {HorizontalCard} from '../../components/horizontalCard/horizontalCard.component';
import Icon from 'react-native-vector-icons/Entypo';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';

const windowWidth = Dimensions.get('window').width;

// Dummy data for the sections
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

const EmptyState = () => (
  <EmptyContainer>
    <Icon
      name="line-graph"
      color={colors.blue.strong}
      size={80}
      style={styles.emptyIcon}
    />
    <EmptyText variant="body" numberOfLines={1}>
      No data available
    </EmptyText>
  </EmptyContainer>
);

const getUpdatedData = (currentData, additionalData) => {
  return currentData.map(section => {
    if (section.title === 'Subjects') {
      return {
        ...section,
        data: [...section.data, ...additionalData],
      };
    }
    return section;
  });
};

const Dashboard = ({navigation}) => {
  const showModal = () => setHomeModal(true);

  const hideModal = () => setHomeModal(false);
  const [selected, setSelected] = useState();

  // ref
  const bottomSheetRef = useRef(null);

  // callbacks
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  // const navigation = useNavigation();

  const confirmDelivery = false;

  const TransactionActions = [
    {
      id: 1,
      Icon: AddIcon,
      title: 'Add',
      backgroundColor: '#1474E1',
    },

    {
      id: 2,
      Icon: SendIcon,
      title: 'Send',
    },

    {
      id: 3,
      Icon: RequestIcon,
      title: 'Request',
    },

    {
      id: 4,
      Icon: WithdrawIcon,
      title: 'Withdraw',
    },
  ];

  const subjectData = [
    {
      key: 1,
      image: HausaLanguageImage,
      firstGradientColor: '#0af',
      secondGradientColor: '#0af',
      thirdGradientColor: 'transparent',
      headerText: 'Hausa Language',
    },

    {
      key: 2,
      image: HausaLanguageImage,
      firstGradientColor: '#3DAF49',
      secondGradientColor: '#3DAF49',
      thirdGradientColor: 'transparent',
      headerText: 'Hausa Language',
    },
    {
      key: 3,
      image: HausaLanguageImage,
      firstGradientColor: '#7D29EA',
      secondGradientColor: '#7D29EA',
      thirdGradientColor: 'transparent',
      headerText: 'Hausa Language',
    },
    {
      key: 4,
      image: HausaLanguageImage,
      firstGradientColor: '#7D29EA',
      secondGradientColor: '#7D29EA',
      thirdGradientColor: 'transparent',
      headerText: 'Hausa Language',
    },
  ];

  const snapPoints = useMemo(() => ['25%', '50%', '75%', '85%'], []);
  const handleCloseBottomSheet = () => bottomSheetRef.current.close();
  const handleOpenBottomSheet = () => bottomSheetRef.current.expand();

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const isEndReached = useRef(false);

  const handleEndReached = () => {
    if (!isEndReached.current) {
      setIsLoadingMore(true);
      setTimeout(() => {
        const updatedData = getUpdatedData(data, loadMoreData);
        setData(updatedData);
        setIsLoadingMore(false);
        isEndReached.current = true;
      }, 1500); // Simulating a delay for loading more data
    }
  };

  const renderSectionHeader = ({section}) => (
    <CardListHeader title={section.title} />
  );

  return (
    <PageContainer height="100%">
      <ContentContainer paddingHorizontalBig>
        <Header navigation={navigation} text={null} profile={true}/>
        <Spacer size="large" position="top" />
        <WalletCard
          onPress={() => {}}
          balanceVisible={true}
          walletBalanceWN={'$48,256'}
          walletBalanceDN={'00'}
          USDCBalance={'48,256.00'}
          topic={'English'}
        />
        <Spacer size="large" position="top" />
        <Spacer size="large" position="top" />

        <IconBtnContainer>
          {TransactionActions.map(
            ({Icon, id, title, backgroundColor, iconColor}) => (
              <IconButtonWrapper key={id}>
                <IconButton
                  icon={<Icon />}
                  backgroundColor={backgroundColor}
                  iconColor={iconColor}
                  size={'big'}
                  // onPress={handleOpenBottomSheet}
                  onPress={() => navigation.navigate('Recent')}
                />
                <ButtonTitle variant="caption" numberOfLines={1}>
                  {title}
                </ButtonTitle>
              </IconButtonWrapper>
            ),
          )}
        </IconBtnContainer>
        <Spacer size="large" position="top" />

        <CardListHeader seeAllText={'See all'} title={'Recent transactions'} />

        <Wrapper>
          <FlatListContainer
            data={recentTransactionCardData}
            keyExtractor={item => item.id}
            ListEmptyComponent={<EmptyState />}
            style={{width: '100%'}}
            contentContainerStyle={{
              borderRadius: 20,
              overflow: 'hidden',
            }}
            showsVerticalScrollIndicator={false}
            // ListHeaderComponent={() => (
            //   <CardListHeader
            //     seeAllText={'See all'}
            //     title={'Recent transactions'}
            //   />
            // )}
            renderItem={({item}) => <HorizontalCard />}
          />
        </Wrapper>
      </ContentContainer>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  emptyIcon: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },

  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
});

export default Dashboard;
