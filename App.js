import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState, useEffect } from 'react';
import ToolsScreen from './screens/ToolsScreen';
import GuideScreen from './screens/GuideScreen';
import SettingsScreen from './screens/SettingsScreen';
import axios from "axios";
const Tab = createBottomTabNavigator();


export default function App() {
  let countryData;

  useEffect(() => {
    const initialAPICalls = async () => {
      countryData = await axios.get('http://192.168.1.73:3000/countrydata');

      const [] = await Promise.all([]);
    }

    initialAPICalls();
  }, []);


  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Tools"
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#F95738',
            tabBarInactiveTintColor: '#0D3B66',
            tabBarLabelStyle: {
              fontSize: 18,
            },
            tabBarStyle: {
              backgroundColor: '#FAF0CA',
            },
          }}
        >
          <Tab.Screen name="Tools" component={ToolsScreen} country />
          <Tab.Screen name="Guide" component={GuideScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} countryData={countryData} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
