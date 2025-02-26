import styled from 'styled-components/native';
import {theme} from '../../infrastructure/theme';

const defaultTextStyles = (/*theme*/) => `
  /*font-family: ${theme.fonts.body};*/
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.text.strong};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;
const title = (/*theme*/) => `
  font-size: ${theme.fontSizes.title};
`;

const smallTitle = (/*theme*/) => `
font-size: ${theme.fontSizes.smallTitle};
`;

const body = (/*theme*/) => `
font-size: ${theme.fontSizes.body};
`;

const smallBody = (/*theme*/) => `
  font-size: ${theme.fontSizes.smallBody};
`;
const small = (/*theme*/) => `
font-size: ${theme.fontSizes.small};
`;

const verySmall = (/*theme*/) => `
  font-size: ${theme.fontSizes.verySmall};
`;

const hint = (/*theme*/) => `
  font-size: ${theme.fontSizes.body};
  color: ${theme.colors.black.light};
`;

const smallHint = (/*theme*/) => `
  font-size: ${theme.fontSizes.caption};
  color: ${theme.colors.black.light};
`;

const error = (/*theme*/) => `
  color: ${theme.colors.red.strong};
`;

const caption = (/*theme*/) => `
  font-size: ${theme.fontSizes.caption};
  font-weight: ${theme.fontWeights.medium};
`;
const button = (/*theme*/) => `
  font-size: ${theme.fontSizes.button};
  font-weight: ${theme.fontWeights.medium};
`;

const label = (/*theme*/) => `
  /*font-family: ${theme.fonts.heading};*/
  font-size: ${theme.fontSizes.body};
  font-weight: ${theme.fontWeights.medium};
`;
const h3 = (/*theme*/) => `
  /*font-family: ${theme.fonts.heading};*/
  font-size: ${theme.fontSizes.h3};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.blue.strong};
`;
const h4 = (/*theme*/) => `
  /*font-family: ${theme.fonts.heading};*/
  font-size: ${theme.fontSizes.h4};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.blue.strong};
`;
const h5 = (/*theme*/) => `
  /*font-family: ${theme.fonts.heading};*/
  font-size: ${theme.fontSizes.h5};
  font-weight: ${theme.fontWeights.bold};
`;

const link = (/*theme*/) => `
 /* font-family: ${theme.fonts.body};*/
  font-size: ${theme.fontSizes.caption};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.link.strong};
`;

const variants = {
  verySmall,
  small,
  caption,
  button,
  smallBody,
  body,
  smallTitle,
  title,
  h5,
  h4,
  h3,
  label,
  error,
  hint,
  smallHint,
  link,
};

export const Text = styled.Text`
  ${({theme}) => defaultTextStyles(theme)};
  ${({variant, theme}) => variants[variant](theme)};
`;

Text.defaultProps = {
  variant: 'body',
};
