import styled from 'styled-components/native';
import {Container} from '../../components/container/container.component';
import {Text} from '../../components/typography/text.component';
import {colors} from '../../infrastructure/theme/colors';
import {fonts, fontWeights} from '../../infrastructure/theme/fonts';
import Icon from 'react-native-vector-icons/AntDesign';

export const CardListHeaderContainer = styled(Container)`
  /* background: ${colors.white}; */
`;
export const TitleSection = styled(Container)`
  width: 80%;
`;
export const Title = styled(Text)`
  color: #1f2223;
  font-weight: ${fontWeights.semiBold};
  text-transform: capitalize;
`;
export const SubTitle = styled(Text)`
  color: ${colors.text.soft};
`;
export const SeeAllSection = styled(Container)`
  width: 20%;
`;
export const SeeAllText = styled(Text)`
  color: ${colors.blue.strong};
  font-weight: ${fontWeights.semiBold};
`;
export const RightIcon = styled(Icon)`
  color: ${colors.primary};
`;
