import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Keyboard, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import { AppContext } from "../Context";
import RNPickerSelect from 'react-native-picker-select';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
  const { setHomeTZ, setAwayTZ, homeTZ, awayTZ, setHomeCurrency, setAwayCurrency, setHomeLang, setAwayLang, countryData, setAwayCountry, setHomeCountry, homeCountryCode, setHomeCountryCode, awayCountryCode, setAwayCountryCode } = useContext(AppContext);

  const [homeTimezone, setHomeTimezone] = useState(homeTZ);
  const [awayTimezone, setAwayTimezone] = useState(awayTZ);
  const [home, setHome] = useState(homeCountryCode);
  const [away, setAway] = useState(awayCountryCode);
  const [focus, setFocus] = React.useState({});

  useEffect(() => {
    const loadState = async () => {
      setHomeTZ(await AsyncStorage.getItem('homeTZ') || 'America/New_York');
      setHomeTimezone(await AsyncStorage.getItem('homeTZ') || 'America/New_York');
      setAwayTZ(await AsyncStorage.getItem('awayTZ') || 'America/Cancun');
      setAwayTimezone(await AsyncStorage.getItem('awayTZ') || 'America/Cancun');
      setHome(await AsyncStorage.getItem('homeCountryCode') || 'US');
      setHomeCountryCode(await AsyncStorage.getItem('homeCountryCode') || 'US');
      setAwayCountryCode(await AsyncStorage.getItem('awayCountryCode') || 'MX');
      setAway(await AsyncStorage.getItem('awayCountryCode') || 'MX');
    }

    loadState();
  }, []);


  if (!countryData) {
    return <Text>Loading...</Text>
  }
  const countryItems = Object.keys(countryData).map(key => ({
    label: countryData[key].name,
    value: key,
  })).sort((a, b) => a.label.localeCompare(b.label));

  let homeTimezoneItems = [];
  if (homeCountryCode) {
    homeTimezoneItems = countryData[homeCountryCode].timezones.map(tz => ({
      label: tz.name,
      value: tz.name,
    })).sort((a, b) => a.label.localeCompare(b.label));
  }

  let awayTimezoneItems = [];
  if (awayCountryCode) {
    awayTimezoneItems = countryData[awayCountryCode].timezones.map(tz => ({
      label: tz.name,
      value: tz.name,
    })).sort((a, b) => a.label.localeCompare(b.label));
  }

  const handleHomeCountryCodeChange = async (value) => {
    setHomeCountryCode(value);
    setHome(value);
    setHomeCountry(countryData[value].name);
    setHomeLang(countryData[value].language);
    setHomeCurrency(countryData[value].currency);

    await AsyncStorage.setItem('homeCountryCode', value);
    await AsyncStorage.setItem('home', value);
    await AsyncStorage.setItem('homeCountry', countryData[value].name);
    await AsyncStorage.setItem('homeLang', countryData[value].language);
    await AsyncStorage.setItem('homeCurrency', countryData[value].currency);
  }

  const handleHomeTimezoneChange = async (value) => {
    setHomeTimezone(value);
    setHomeTZ(value);

    await AsyncStorage.setItem('homeTimezone', value);
    await AsyncStorage.setItem('homeTZ', value);
  }

  const handleAwayCountryCodeChange = async (value) => {
    setAwayCountryCode(value);
    setAway(value);
    setAwayCountry(countryData[value].name);
    setAwayLang(countryData[value].language);
    setAwayCurrency(countryData[value].currency);

    await AsyncStorage.setItem('awayCountryCode', value);
    await AsyncStorage.setItem('away', value);
    await AsyncStorage.setItem('awayCountry', countryData[value].name);
    await AsyncStorage.setItem('awayLang', countryData[value].language);
    await AsyncStorage.setItem('awayCurrency', countryData[value].currency);
  }

  const handleAwayTimezoneChange = async (value) => {
    setAwayTimezone(value);
    setAwayTZ(value);

    await AsyncStorage.setItem('awayTimezone', value);
    await AsyncStorage.setItem('awayTZ', value);
  }



  const getPickerStyle = (id) => ({
    inputIOS: {
      textAlign: 'center',
      fontSize: wp('7%'),
      backgroundColor: be,
      width: wp('85%'),
      height: hp('5.5%'),
      borderRadius: 8,
      alignSelf: 'center',
      borderWidth: 3,
      borderColor: focus[id] ? '#2A9D8F' : 'white',
    }
  });

  return (
    <KeyboardAvoidingView style={styles.outer} behavior="position">
      <SafeAreaView style={styles.outer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>

            <View style={styles.settingsCard}>
              <Text style={styles.settingsText}>Settings</Text>
            </View>

            <View style={styles.homeCard}>
              <Text style={styles.heading}>Home</Text>

              <Text style={styles.labelText}>Country</Text>
              <RNPickerSelect
                onOpen={() => setFocus(prev => ({ ...prev, picker1: true }))}
                onClose={() => setFocus(prev => ({ ...prev, picker1: false }))}
                style={getPickerStyle('picker1')}
                items={countryItems ? countryItems : [{ label: 'Please restart app', value: 'error' }]}
                onValueChange={handleHomeCountryCodeChange}
                value={home}
                placeholder={{}}
              />

              <Text style={styles.labelText}>Timezone</Text>
              <RNPickerSelect
                onOpen={() => setFocus(prev => ({ ...prev, picker2: true }))}
                onClose={() => setFocus(prev => ({ ...prev, picker2: false }))}
                style={getPickerStyle('picker2')}
                items={homeTimezoneItems}
                onValueChange={handleHomeTimezoneChange}
                value={homeTimezone}
                disabled={!homeCountryCode}
                placeholder={{}}
              />
            </View>

            <View style={styles.awayCard}>
              <Text style={styles.heading}>Away</Text>

              <Text style={styles.labelText}>Country</Text>
              <RNPickerSelect
                onOpen={() => setFocus(prev => ({ ...prev, picker3: true }))}
                onClose={() => setFocus(prev => ({ ...prev, picker3: false }))}
                style={getPickerStyle('picker3')}
                items={countryItems ? countryItems : [{ label: 'Please restart app', value: 'error' }]}
                onValueChange={handleAwayCountryCodeChange}
                value={away}
                placeholder={{}}
              />

              <Text style={styles.labelText}>Timezone</Text>
              <RNPickerSelect
                onOpen={() => setFocus(prev => ({ ...prev, picker4: true }))}
                onClose={() => setFocus(prev => ({ ...prev, picker4: false }))}
                style={getPickerStyle('picker4')}
                items={awayTimezoneItems}
                onValueChange={handleAwayTimezoneChange}
                value={awayTimezone}
                disabled={!awayCountryCode}
                placeholder={{}}
              />
            </View>

            {/* <View style={styles.accountCard}>
            <Text style={styles.heading}>Account</Text>
          </View> */}

          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}



const bl = '#2A9D8F';
const db = '#264653';
const be = 'white';
const or = '#E76F51';

const styles = StyleSheet.create({
  heading: {
    color: be,
    fontSize: wp('7%'),
    fontWeight: 200,
    letterSpacing: 8,
    paddingTop: hp('1%'),
  },
  outer: {
    flexGrow: 1,
    backgroundColor: be,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: be,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: hp('15%'),
  },
  settingsCard: {
    backgroundColor: be,
    height: hp('10%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsText: {
    color: db,
    fontSize: wp('9%'),
  },
  homeCard: {
    backgroundColor: db,
    width: wp('90%'),
    height: hp('25%'),
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: hp('1%'),
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.31,
    shadowRadius: 12,
  },
  awayCard: {
    backgroundColor: db,
    width: wp('90%'),
    height: hp('25%'),
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.31,
    shadowRadius: 12,
  },
  accountCard: {
    backgroundColor: db,
    width: wp('90%'),
    height: hp('20%'),
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.31,
    shadowRadius: 12,
  },
  labelText: {
    color: be,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    paddingLeft: wp('3%'),
    paddingBottom: hp('1%'),
    paddingTop: hp('1%'),
    fontSize: wp('3%'),
  },
  text: {
    color: be,
  },
});