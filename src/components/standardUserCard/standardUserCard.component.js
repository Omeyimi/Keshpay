import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {Spacer} from '../spacer/spacer.component';
import {
  MultiPurposeCardContainer,
  Wrapper,
  ImageSection,
  CardBackgroundImage,
  PlayIconWrapper,
  LinearGradientBackground,
  InfoSection,
  CardInfoContainer,
  HeaderText,
  SubjectText,
  TopicText,
  ButtonWrapper,
  DurationText,
} from './standardUserCard.styles';
import CardBg from '../../assets/images/Crunchies.png';
import {colors} from '../../infrastructure/theme/colors';
import {PlayIcon} from '../../assets/svg/Icons';
import CardImage1 from '../../assets/images/profile.png';

export const StandardUserCard = ({
  image,
  firstGradientColor = 'blue',
  secondGradientColor = 'blue',
  thirdGradientColor = 'blue',
  headerText,
  subject,
  topic,
  course,
  onPress,
}) => {
  const StarData = [
    {name: 'star', key: 1},
    {name: 'star', key: 2},
    {name: 'star', key: 3},
    {name: 'star', key: 4},
    {name: 'star', key: 5},
  ];
  return (
    <MultiPurposeCardContainer
      onPress={() => {
        onPress();
      }}
      style
      topic={topic}
      course={course}>
      <ImageSection
        background="transparent"
        resizeMode="cover"
        course={course}
        topic={topic}>
        <CardBackgroundImage source={image ? image : CardImage1} />
      </ImageSection>
      <LinearGradientBackground
        colors={[firstGradientColor, secondGradientColor, thirdGradientColor]}
        start={{x: 0.1, y: 1.3}}
        end={{x: 0.1, y: 0.1}}>
        <InfoSection height="auto" paddingVertical={'15px'}>
          <CardInfoContainer
            paddingHorizontalBig
            justifyContent="center"
            alignItems="center">
            <Wrapper alignItems="center">
              <HeaderText variant="body" numberOfLines={1}>
                {headerText ? headerText : 'Jason Evans'}
              </HeaderText>
            </Wrapper>
          </CardInfoContainer>
        </InfoSection>
      </LinearGradientBackground>
    </MultiPurposeCardContainer>
  );
};

StandardUserCard.defaultProps = {
  image: CardBg,
  firstGradientColor: 'rgba(0,0,0,0.8)',
  secondGradientColor: 'rgba(0,0,0,0.5)',
  thirdGradientColor: 'transparent',
};
