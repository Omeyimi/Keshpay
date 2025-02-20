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
} from './multiPurposeCard.styles';
import CardBg from '../../assets/images/Crunchies.png';
import {colors} from '../../infrastructure/theme/colors';
import {PlayIcon} from '../../assets/svg/Icons';
import CardImage1 from '../../assets/images/CardImage1.png';

export const MultiPurposeCard = ({
  image,
  firstGradientColor = 'blue',
  secondGradientColor = 'blue',
  thirdGradientColor = 'blue',
  headerText,
  subject,
  topic,
  course,
  onPress
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
        <CardBackgroundImage
          course={course}
          topic={topic}
          source={image ? image : CardImage1}
        />
        {topic && (
          <PlayIconWrapper>
            <PlayIcon width={20} height={20} />
          </PlayIconWrapper>
        )}
      </ImageSection>

      {course || topic ? (
        <InfoSection height="auto" topic={topic} course={course}>
          <CardInfoContainer
            // background="blue"
            alignItems="flex-start">
            {topic ? (
              <Wrapper alignItems="flex-start">
                <SubjectText variant="button" numberOfLines={1}>
                  {subject ? subject : 'Hausa Language'}
                </SubjectText>
              </Wrapper>
            ) : null}
            <Spacer size="small" position="top" />
            <Wrapper alignItems="flex-start" >
              <TopicText variant="smallBody" numberOfLines={2}>
                {topic
                  ? topic
                  : 'principles of the lorem the dooos a '}
              </TopicText>
            </Wrapper>
            {course ? <Spacer size="medium" position="top" /> : null}
            {course ? (
              <ButtonWrapper>
                <DurationText variant="caption" numberOfLines={1}>
                  {course ? course : '5 Mins'}
                </DurationText>
              </ButtonWrapper>
            ) : null}
          </CardInfoContainer>
        </InfoSection>
      ) : (
        <LinearGradientBackground
          colors={[firstGradientColor, secondGradientColor, thirdGradientColor]}
          start={{x: 0.1, y: 1.3}}
          end={{x: 0.1, y: 0.1}}>
          <InfoSection height="auto" paddingVertical={'15px'}>
            <CardInfoContainer
              paddingHorizontalBig
              justifyContent="space-between"
              alignItems="flex-start">
              <Wrapper alignItems="flex-start">
                <HeaderText variant="body" numberOfLines={1}>
                  {headerText ? headerText : 'Hausa Language'}
                </HeaderText>
              </Wrapper>
            </CardInfoContainer>
          </InfoSection>
        </LinearGradientBackground>
      )}
    </MultiPurposeCardContainer>
  );
};

MultiPurposeCard.defaultProps = {
  image: CardBg,
  firstGradientColor: 'rgba(0,0,0,0.8)',
  secondGradientColor: 'rgba(0,0,0,0.6)',
  thirdGradientColor: colors.primary,
};
