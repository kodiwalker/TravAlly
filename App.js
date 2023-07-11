import { IP } from '@env';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState, useEffect } from 'react';
import { StatusBar, Image, View, StyleSheet } from 'react-native';
import ToolsScreen from './screens/ToolsScreen';
import GuideScreen from './screens/GuideScreen';
import SettingsScreen from './screens/SettingsScreen';
import PlacesScreen from "./screens/PlacesScreen";
import axios from "axios";
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from './Context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Tab = createBottomTabNavigator();
import * as ScreenOrientation from 'expo-screen-orientation';

export default function App() {
  const [countryData, setCountryData] = useState();
  const [homeTZ, setHomeTZ] = useState('America/New_York');
  const [awayTZ, setAwayTZ] = useState('America/Cancun');
  const [homeCurrency, setHomeCurrency] = useState('USD');
  const [awayCurrency, setAwayCurrency] = useState('MXN');
  const [homeLang, setHomeLang] = useState('en');
  const [awayLang, setAwayLang] = useState('es');
  const [homeCountry, setHomeCountry] = useState('United States');
  const [awayCountry, setAwayCountry] = useState('Mexico');
  const [homeCountryCode, setHomeCountryCode] = useState('US');
  const [awayCountryCode, setAwayCountryCode] = useState('MX');
  const [homeRate, setHomeRate] = useState();
  const [awayRate, setAwayRate] = useState();
  const [homeFlag, setHomeFlag] = useState();
  const [awayFlag, setAwayFlag] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

    const initialAPICalls = async () => {
      const countryRes = await axios.get(`https://kodiwalker.dev/countrydata`);
      setCountryData(countryRes.data);

      // Load settings from storage
      setHomeTZ(await AsyncStorage.getItem('homeTZ') || 'America/New_York');
      setAwayTZ(await AsyncStorage.getItem('awayTZ') || 'America/Cancun');
      setHomeCurrency(await AsyncStorage.getItem('homeCurrency') || 'USD');
      setAwayCurrency(await AsyncStorage.getItem('awayCurrency') || 'MXN');
      setHomeLang(await AsyncStorage.getItem('homeLang') || 'en');
      setAwayLang(await AsyncStorage.getItem('awayLang') || 'es');
      setHomeCountry(await AsyncStorage.getItem('homeCountry') || 'United States');
      setAwayCountry(await AsyncStorage.getItem('awayCountry') || 'Mexico');
      setHomeCountryCode(await AsyncStorage.getItem('homeCountryCode') || 'US');
      setAwayCountryCode(await AsyncStorage.getItem('awayCountryCode') || 'MX');
    };
    initialAPICalls();
    setIsLoading(false);
  }, []);



  return !isLoading ?
    <>
      <StatusBar barStyle="dark-content" />
      <AppContext.Provider value={{ homeTZ, setHomeTZ, awayTZ, setAwayTZ, homeCountry, setHomeCountry, awayCountry, setAwayCountry, homeCountryCode, setHomeCountryCode, awayCountryCode, setAwayCountryCode, homeCurrency, setHomeCurrency, awayCurrency, setAwayCurrency, homeRate, setHomeRate, awayRate, setAwayRate, homeLang, setHomeLang, awayLang, setAwayLang, homeFlag, setHomeFlag, awayFlag, setAwayFlag, countryData, isLoading }}>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Tools"
            screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: '#264653',
              tabBarInactiveTintColor: '#2A9D8F',
              tabBarStyle: {
                backgroundColor: 'transparent',
                paddingBottom: hp('1.5%'),
                borderTopColor: 'transparent',
                shadowOpacity: 0,
              },
              tabBarItemStyle: {
                justifyContent: 'center',
                alignItems: 'center',
                maxWidth: 300,
                height: 50
              },
              tabBarShowLabel: false,
            }}
          >
            <Tab.Screen name="Tools" component={ToolsScreen}
              options={{
                tabBarIcon: ({ color }) => (
                  <Entypo name="tools" color={color} size={42} />
                )
              }}
            />

            <Tab.Screen name="Guide" component={GuideScreen}
              options={{
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="assistant" size={42} color={color} />
                )
              }}
            />

            <Tab.Screen name="Places" component={PlacesScreen}
              options={{
                tabBarIcon: ({ color }) => (
                  <Entypo name="location" size={42} color={color} />
                )
              }}
            />

            <Tab.Screen name="Settings" component={SettingsScreen}
              options={{
                tabBarIcon: ({ color }) => (
                  <Ionicons name="ios-settings-sharp" size={42} color={color} />
                )
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </AppContext.Provider>
    </>
    :
    <View style={styles.container}>
      <Image source={require('./assets/TravAlly-Splash.png')} style={styles.image} />
    </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
});

