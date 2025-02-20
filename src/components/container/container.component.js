import React from 'react';
import styled from 'styled-components/native';
import {View, ScrollView, FlatList, Pressable} from 'react-native';

export const Container = styled.View`
  width: ${props => (props.width ? props.width : '100%')};
  min-height: ${props => (props.height ? props.height : 'auto')};
  flex-direction: ${props =>
    props.flexDirection ? props.flexDirection : 'column'};
  justify-content: ${props =>
    props.justifyContent ? props.justifyContent : 'flex-start'};
  align-items: ${props => (props.alignItems ? props.alignItems : 'center')};
  padding-horizontal: ${props =>
    props.paddingHorizontal ? '2.5%' : props.paddingHorizontalBig ? '4%' : '0'};
  padding-vertical: ${props =>
    props.paddingVertical ? props.paddingVertical : '0'};
  background: ${props => (props.background ? props.background : 'transparent')};
  flex-wrap: ${props => (props.flexWrap ? props.flexWrap : 'nowrap')};
  gap: ${props => (props.gap ? props.gap : 0)};
`;

export const ScrollViewContainer = styled.ScrollView`
  /* flex: 1; */
  height: auto;
  width: ${props => (props.width ? props.width : '100%')};
  padding-horizontal: ${props => (props.paddingHorizontal ? '4%' : '0')};
  background: ${props => (props.background ? props.background : 'transparent')};
`;

export const FlatListContainer = styled.FlatList`
  padding-vertical: 5;
  /* flex:1; */
  width: ${props => (props.width ? props.width : 'auto')};
  background: ${props => (props.background ? props.background : 'transparent')};
`;

export const PressableContainer = styled.Pressable`
  background-color: ${props => (props.bgColor ? props.bgColor : 'transparent')};
`;

ScrollViewContainer.defaultProps = {
  showsVerticalScrollIndicator: false,
};
0;
PressableContainer.defaultProps = {
  onPress: () => console.log('yes tess'),
  style: ({pressed}) => [
    {
      opacity: pressed ? 0.7 : 1,
    },
  ],
};

FlatListContainer.defaultProps = {
  showsHorizontalScrollIndicator: false,
  showsVerticalScrollIndicator: false,
};
