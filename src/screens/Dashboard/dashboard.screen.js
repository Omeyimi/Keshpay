import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  SectionList,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import {Picker} from '@react-native-picker/picker'; // Import the Picker component from the new package

import {SafeArea} from '../../components/utility/safe-area.component';
import {
  Container,
  FlatListContainer,
  PressableContainer,
  ScrollViewContainer,
} from '../../components/container/container.component';
import {Header} from '../../components/header/header.component';
import {Ionicons} from '@expo/vector-icons';
import {colors} from '../../infrastructure/theme/colors';
import {
  PageContainer,
  ContentContainer,
  Wrapper,
  RowContainer,
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
} from './dashboard.styles';

import {Spacer} from '../../components/spacer/spacer.component';
import {SearchBar} from '../../components/searchBar/searchBar.component';
import ButtonContainer from '../../components/button/button.component';
import DeliveryManagementCard from '../../components/deliveryManagementCard/index.component';
import {BannerCard} from '../../components/bannerCard/bannerCard.component';
import Profile from '../../assets/images/profile.png';
import CardImage1 from '../../assets/images/CardImage1.png';
import {CardListHeader} from '../../components/cardListHeader/cardListHeader.component';
import {MultiPurposeCard} from '../../components/multiPurposeCard/multiPurposeCard.component';
import HausaLanguageImage from '../../assets/images/HausaLanguage.png';
import {ModalComponent} from '../../components/modal/modal.component';

const windowWidth = Dimensions.get('window').width;

// Dummy data for the sections
const initialData = [
  {
    title: 'Subjects',
    data: [
      {
        key: 1,
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
        key: 2,
        image: HausaLanguageImage,
        firstGradientColor: '#3DAF49',
        secondGradientColor: '#3DAF49',
        thirdGradientColor: 'transparent',
        headerText: 'Hausa Language',
        discountPercentage: '45%',
        description:
          'Lorem ipsum dolor sit amet consectetur. Ut pellentesque sit amet',
      },
      {
        key: 3,
        image: HausaLanguageImage,
        firstGradientColor: '#7D29EA',
        secondGradientColor: '#7D29EA',
        thirdGradientColor: 'transparent',
        headerText: 'Hausa Language',
        discountPercentage: '55%',
        description:
          'Lorem ipsum dolor sit amet consectetur. Ut pellentesque sit amet',
      },
      {
        key: 4,
        image: HausaLanguageImage,
        firstGradientColor: '#7D29EA',
        secondGradientColor: '#7D29EA',
        thirdGradientColor: 'transparent',
        headerText: 'Hausa Language',
        discountPercentage: '55%',
        description:
          'Lorem ipsum dolor sit amet consectetur. Ut pellentesque sit amet',
      },
      // Add more initial items if needed
    ],
  },
  {
    title: 'recommended for you',
    data: [
      {
        key: 1,
        image: HausaLanguageImage,
        subject: 'Englis Language',
        topic: 'use of Pronouns and grammer',
      },
      {
        key: 2,
        image: HausaLanguageImage,
        subject: 'Englis Language',
        topic: 'use of Pronouns and grammer',
      },
      {
        key: 3,
        image: HausaLanguageImage,
        subject: 'Englis Language',
        topic: 'use of Pronouns and grammer',
      },
      {
        key: 4,
        image: HausaLanguageImage,
        subject: 'Englis Language',
        topic: 'use of Pronouns and grammer',
      },

      // Add more initial items if needed
    ],
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
  const [homeModal, setHomeModal] = useState(false);
  const [confirmDeliveryModal, setconfirmDeliveryModal] = useState(false);
  const home = true;
  const showModal = () => setHomeModal(true);

  const hideModal = () => setHomeModal(false);
  const [selected, setSelected] = useState();

  const confirmDelivery = false;

  const BannerData = [
    {
      id: 1,
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
      id: 2,
      image: CardImage1,
      firstGradientColor: '#3DAF49',
      secondGradientColor: '#3DAF49',
      thirdGradientColor: 'transparent',
      headerText: 'first time subscription',
    },
    {
      id: 3,
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
      id: 4,
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
      id: 5,
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
      id: 6,
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
      id: 7,
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
      id: 8,
      image: CardImage1,
      firstGradientColor: '#7D29EA',
      secondGradientColor: '#7D29EA',
      thirdGradientColor: 'transparent',
      headerText: 'first time subscription',
      discountPercentage: '55%',
      description:
        'Lorem ipsum dolor sit amet consectetur. Ut pellentesque sit amet',
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

  const [data, setData] = useState(initialData);
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

  const Item = ({item, onPress}) => (
    <MultiPurposeCard
      image={item.image}
      onPress={() => {
        console.log('Hey');
        navigation.navigate('Courses');
      }}
      firstGradientColor={item.firstGradientColor}
      secondGradientColor={item.secondGradientColor}
      thirdGradientColor={item.thirdGradientColor}
      headerText={item.headerText}
      subject={item.subject}
      topic={item.topic}
      discountPercentage={item.discountPercentage}
      description={item.description}
    />
  );

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

  return (
    <PageContainer height="100%">
      <ContentContainer>
        <Header
          navigation={navigation}
          text={null}
          paddingHorizontal
          grade={true}
          showModal={showModal}
          selected={selected}
          // svg="previous"
        />
        <Spacer size="large" position="top" />
        <ModalWrapper paddingHorizontal homeModal={homeModal}>
          <ModalComponent
            homeModal={homeModal}
            hideModal={hideModal}
            home={true}
            selected={selected}
            setSelected={setSelected}
            confirmDelivery={confirmDelivery}
          />
        </ModalWrapper>
        <PressableContainer onPress={() => navigation.navigate('Search')}>
          <Wrapper paddingHorizontal pointerEvents="box-only">
            <SearchBar sort />
          </Wrapper>
        </PressableContainer>
        <Spacer size="large" position="top" />
        <Wrapper style={{paddingStart: 16}}>
          <FlatListContainer
            data={BannerData}
            keyExtractor={item => item.id}
            horizontal={true}
            paddingEnd={16}
            contentContainerStyle={{paddingEnd: 16}}
            ItemSeparatorComponent={() => (
              <Spacer size="large" position="right" />
            )}
            renderItem={({item}) => (
              <BannerCard
                image={item.image}
                onPress={() => {
                  console.log('Hey');
                }}
                firstGradientColor={item.firstGradientColor}
                secondGradientColor={item.secondGradientColor}
                thirdGradientColor={item.thirdGradientColor}
                headerText={item.headerText}
                discountPercentage={item.discountPercentage}
                description={item.description}
              />
            )}
          />
        </Wrapper>
        <Spacer size="large" position="top" />
        <SectionList
          sections={data}
          // style={{backgroundColor:"red",paddingHorizontal:"4%"}}
          keyExtractor={item => item.key}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
          ItemSeparatorComponent={() => (
            <Spacer size="large" position="right" />
          )}
          ListFooterComponent={isLoadingMore && <ActivityIndicator />}
          stickySectionHeadersEnabled={false}
          ListHeaderComponent={() => (
            <Wrapper>
              <ButtonContainer />
              <Spacer size="large" position="top" />
            </Wrapper>
          )}
        />
      </ContentContainer>
    </PageContainer>
  );
};

export default Dashboard;

// <ScrollViewContainer>
//   <PageContainer height="100%">
//     <ContentContainer>
//       <Header
//         text={null}
//         paddingHorizontal
//         grade={true}
//         // svg="previous"
//       />
//       <Spacer size="large" position="top" />
//       <Wrapper paddingHorizontal>
//         <SearchBar sort onPress={() => {}} />
//       </Wrapper>
//       <Spacer size="large" position="top" />
//       <Wrapper style={{paddingStart: 16}}>
//         <FlatListContainer
//           data={BannerData}
//           keyExtractor={item => item.id}
//           horizontal={true}
//           paddingEnd={16}
//           contentContainerStyle={{paddingEnd: 16}}
//           ItemSeparatorComponent={() => (
//             <Spacer size="large" position="right" />
//           )}
//           renderItem={({item}) => (
//             <BannerCard
//               image={item.image}
//               firstGradientColor={item.firstGradientColor}
//               secondGradientColor={item.secondGradientColor}
//               thirdGradientColor={item.thirdGradientColor}
//               headerText={item.headerText}
//               discountPercentage={item.discountPercentage}
//               description={item.description}
//             />
//           )}
//         />
//       </Wrapper>
//       <Spacer size="large" position="top" />
//       <Wrapper paddingHorizontal>
//         <ButtonContainer
//         // backgroundColor={}
//         // color={}
//         // text={}
//         // rightIcon={}
//         // leftIcon={}
//         // onPress={}
//         // width={}
//         // borderRadius={}
//         />
//       </Wrapper>
//       <Spacer size="large" position="top" />

//       <Wrapper>
//         <CardListHeader title="Subjects" />
//         <FlatListContainer
//           data={subjectData}
//           keyExtractor={item => item.id}
//           numColumns={2}
//           columnWrapperStyle={{justifyContent: 'space-between'}}
//           contentContainerStyle={{
//             width: '100%',
//             // padding: 10,
//           }}
//           ItemSeparatorComponent={() => (
//             <Spacer size="large" position="top" />
//           )}
//           renderItem={({item}) => (
//             <MultiPurposeCard
//               image={item.image}
//               firstGradientColor={item.firstGradientColor}
//               secondGradientColor={item.secondGradientColor}
//               thirdGradientColor={item.thirdGradientColor}
//               headerText={item.headerText}
//               discountPercentage={item.discountPercentage}
//               description={item.description}
//             />
//           )}
//         />
//       </Wrapper>
//       <Spacer size="large" position="top" />
//       <Wrapper>
//         <CardListHeader title="recommended for you" />
//         <FlatListContainer
//           data={subjectData}
//           keyExtractor={item => item.id}
//           numColumns={2}
//           columnWrapperStyle={{justifyContent: 'space-between'}}
//           contentContainerStyle={{
//             width: '100%',
//             // padding: 10,
//           }}
//           ItemSeparatorComponent={() => (
//             <Spacer size="large" position="top" />
//           )}
//           renderItem={({item}) => (
//             <MultiPurposeCard
//               image={item.image}
//               firstGradientColor={item.firstGradientColor}
//               secondGradientColor={item.secondGradientColor}
//               thirdGradientColor={item.thirdGradientColor}
//               headerText={item.headerText}
//               discountPercentage={item.discountPercentage}
//               description={item.description}
//             />
//           )}
//         />
//       </Wrapper>
//     </ContentContainer>
//   </PageContainer>
// </ScrollViewContainer>
