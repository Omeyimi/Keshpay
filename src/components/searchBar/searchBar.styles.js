import styled from 'styled-components/native';
import {Searchbar} from 'react-native-paper';
import {TouchableOpacity, View} from 'react-native';
import {Container} from '../container/container.component';
import Icons from 'react-native-vector-icons/Entypo';

export const SearchBarContainer = styled.TouchableOpacity`
  width: 100%;
  height: 52px;
  /* background-color:pink; */
`;

export const SearchBarWrapper = styled(Container)`
  width: 100%;
`;
export const StyledSearchbar = styled(Searchbar)`
  background-color: #f2f4f7;
  elevation: 5;
  width: ${props => (props.sort ? '87%' : '100%')};
  border-radius: 12px;
  height: 52px;
`;
export const IconContainer = styled.TouchableOpacity`
  height: 50px;
  width: ${props => (props.width ? props.width : '52px')};
  align-items: center;
  justify-content: center;
  display: flex;
  border-radius: 14px;
  background-color: ${props =>
    props.background ? props.background : '#00AAFF'};
`;

export const BargeContainer = styled.View`
  position: absolute;
  top: 5px;
  height: 25px;
  width: 25px;
  right: -2px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 50px;
`;
