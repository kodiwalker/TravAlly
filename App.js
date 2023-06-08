import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState, useEffect } from 'react';
import ToolsScreen from './screens/ToolsScreen';
import GuideScreen from './screens/GuideScreen';
import SettingsScreen from './screens/SettingsScreen';
import axios from "axios";
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from './Context';
const Tab = createBottomTabNavigator();


export default function App() {
  const [countryData, setCountryData] = useState();
  const [homeTZ, setHomeTZ] = useState('America/Denver');
  const [awayTZ, setAwayTZ] = useState('America/Cancun');
  const [homeCurrency, setHomeCurrency] = useState('USD');
  const [awayCurrency, setAwayCurrency] = useState('MXN');
  const [homeRate, setHomeRate] = useState();
  const [awayRate, setAwayRate] = useState();
  const [homeFlag, setHomeFlag] = useState();
  const [awayFlag, setAwayFlag] = useState();
  const [homeLang, setHomeLang] = useState('en');
  const [awayLang, setAwayLang] = useState('es');
  const [homeCountry, setHomeCountry] = useState('United States');
  const [awayCountry, setAwayCountry] = useState('Mexico');

  useEffect(() => {
    // loadData();
    const initialAPICalls = async () => {

      const countryRes = await axios.get('http://192.168.1.73:3000/countrydata');
      setCountryData(countryRes.data);
    }

    initialAPICalls();
  }, []);


  return (
    <AppContext.Provider value={{ homeTZ, setHomeTZ, awayTZ, setAwayTZ, homeCountry, setHomeCountry, awayCountry, setAwayCountry, homeCurrency, setHomeCurrency, awayCurrency, setAwayCurrency, homeRate, setHomeRate, awayRate, setAwayRate, homeLang, setHomeLang, awayLang, setAwayLang, homeFlag, setHomeFlag, awayFlag, setAwayFlag, countryData }}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Tools"
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#264653',
            tabBarInactiveTintColor: '#2A9D8F',
            tabBarStyle: {
              backgroundColor: '#F4F1DE',
              paddingBottom: 5,
              borderTopColor: 'transparent',
              shadowOpacity: 0
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
  );
}
