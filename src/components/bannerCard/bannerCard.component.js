import React from 'react';
import {Spacer} from '../spacer/spacer.component';
import {
  BannerCardContainer,
  Wrapper,
  ImageSection,
  CardBackgroundImage,
  LinearGradientBackground,
  InfoSection,
  CardInfoContainer,
  HeaderText,
  DiscountTextBold,
  DiscountText,
  DescriptionText,
  RatingStar,
  AddressAndRatingContainer,
  AddressText,
  RatingNumber,
} from './bannerCard.styles';
import CardBg from '../../assets/images/Crunchies.png';
import {colors} from '../../infrastructure/theme/colors';

export const BannerCard = ({
  image,
  firstGradientColor = 'blue',
  secondGradientColor = 'blue',
  thirdGradientColor = 'blue',
  headerText,
  discountPercentage,
  description,
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
    <BannerCardContainer
      onPress={() => {
        onPress();
      }}>
      <ImageSection background="transparent" height={130}>
        <CardBackgroundImage source={image} resizeMode="stretch" />
      </ImageSection>

      <LinearGradientBackground
        colors={
          ('94deg',
          [firstGradientColor, secondGradientColor, thirdGradientColor])
        }
        start={{x: 0, y: 0}}
        end={{x: 0.8, y: 0}}>
        <InfoSection height="auto" paddingVertical={'20px'}>
          <CardInfoContainer
            paddingHorizontalBig
            justifyContent="space-between"
            alignItems="flex-start">
            <Wrapper alignItems="flex-start">
              <HeaderText variant="button" numberOfLines={1}>
                {headerText ? headerText : 'first time subscription'}
              </HeaderText>
            </Wrapper>
            <Wrapper
              flexDirection="row"
              justifyContent="flex-start"
              alignItems="baseline">
              <DiscountTextBold variant="h4" numberOfLines={1}>
                {discountPercentage ? discountPercentage : '25%'}
              </DiscountTextBold>
              <Spacer size="medium" position="right" />
              <DiscountText variant="body">Off</DiscountText>
            </Wrapper>
            <Wrapper alignItems="flex-start">
              <DescriptionText variant="caption" numberOfLines={2}>
                {description
                  ? description
                  : 'Lorem ipsum dolor sit amet consectetur. Ut pellentesque sit amet'}
              </DescriptionText>
            </Wrapper>
          </CardInfoContainer>
          <Spacer size="small" position="top" />
        </InfoSection>
      </LinearGradientBackground>
    </BannerCardContainer>
  );
};

BannerCard.defaultProps = {
  image: CardBg,
  firstGradientColor: 'rgba(0,0,0,0.8)',
  secondGradientColor: 'rgba(0,0,0,0.6)',
  thirdGradientColor: colors.primary,
  branchName: 'Faulks Branch',
  branchAddress: '162 old Glenridge St Fountain Aba, Abia State',
  rating: '4.9',
};
