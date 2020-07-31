/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Home from './src/screens/Home/Home';
import Find from './src/screens/Find/Find';
import CloudVillage from './src/screens/CloudVillage/CloudVillage';
import VideoScreen from './src/screens/VideoScreen/VideoScreen';
import Animated from 'react-native-reanimated';
import FeatherIcon from 'react-native-vector-icons/Feather';

function MyTabBar({state, descriptors, navigation, position}) {
  return (
    <View style={{flexDirection: 'row', paddingTop: 20}}>
      <FeatherIcon name="menu" size={30} color="#900" />
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        // modify inputRange for custom behavior
        const inputRange = state.routes.map((_, i) => i);
        const opacity = Animated.interpolate(position, {
          inputRange,
          outputRange: inputRange.map((i) => (i === index ? 1 : 0.5)),
        });

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1}}>
            <Animated.Text style={{opacity}}>{label}</Animated.Text>
          </TouchableOpacity>
        );
      })}
      <FeatherIcon name="search" size={30} color="#900" />
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
        <Tab.Screen name="我的" component={Home} />
        <Tab.Screen name="发现" component={Find} />
        <Tab.Screen name="云村" component={CloudVillage} />
        <Tab.Screen name="视频" component={VideoScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
