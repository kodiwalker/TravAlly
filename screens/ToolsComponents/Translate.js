import { IP } from '@env';
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TextInput, StyleSheet, Button } from 'react-native';
import axios from "axios";
import { AppContext } from "../../Context";
import iso6391 from 'iso-639-1';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Translate() {
  const { homeLang, awayLang } = useContext(AppContext);
  const [focus, setFocus] = React.useState({});
  const [inputs, setInputs] = useState({
    home: '',
    away: ''
  });

  useEffect(() => {
    setInputs({
      away: '',
      home: ''
    })
  }, [homeLang, awayLang])

  const handleHomeChange = text => {
    setInputs({
      ...inputs,
      home: text
    })
  }

  const handleAwayChange = text => {
    setInputs({
      ...inputs,
      away: text
    })
  }

  const handleHomeTranslate = async () => {
    setInputs({
      ...inputs,
      away: 'Translating...'
    })
    try {
      const translated = await axios.post(`https://kodiwalker.dev/translate`, { text: inputs.home, target: awayLang }, { timeout: 3000 })

      setInputs({
        ...inputs,
        away: translated.data
      })
    } catch (e) {
      setInputs({
        home: inputs.home,
        away: inputs.away
      })
    }
  }

  const handleAwayTranslate = async () => {
    setInputs({
      ...inputs,
      home: 'Translating...'
    })
    try {
      const translated = await axios.post(`https://kodiwalker.dev/translate`, { text: inputs.away, target: homeLang }, { timeout: 3000 })

      setInputs({
        ...inputs,
        home: translated.data
      })
    } catch (e) {
      setInputs({
        ...inputs,
        home: 'Failed to translate. Please check your submission and try again.'
      })
    }
  }

  const handleSpeech = async () => {
    const isSpeaking = await Speech.isSpeakingAsync();

    if (isSpeaking) {
      Speech.stop();
    } else {
      Speech.speak(inputs.away, { language: awayLang });
    }
  };


  const getPickerStyle = (id) => ({
    backgroundColor: be,
    color: db,
    width: wp('77%'),
    height: hp('8%'),
    borderRadius: 8,
    fontSize: wp('5%'),
    textAlign: 'center',
    borderWidth: 3,
    borderColor: focus[id] ? '#2A9D8F' : 'white',
  });

  return (
    <>
      <Text style={styles.heading}>Language</Text>

      <View style={styles.homeField}>
        <AntDesign name="back" size={wp('8%')} style={{ color: be, transform: [{ rotate: '-90deg' }] }} />

        <View style={styles.inputContainer}>
          <Text style={{ fontSize: wp('4%'), fontWeight: 'bold', color: be, marginBottom: 5 }}>{iso6391.getName(homeLang)}</Text>

          <TextInput style={getPickerStyle('picker1')} maxLength={300} multiline={true} onSubmitEditing={handleHomeTranslate} returnKeyType='done' blurOnSubmit={true} value={inputs.home} onChangeText={handleHomeChange}
            onFocus={() => setFocus(prev => ({ ...prev, picker1: true }))}
            onBlur={() => setFocus(prev => ({ ...prev, picker1: false }))}
          ></TextInput>
        </View>
      </View>

      <View style={styles.awayField}>
        <View style={styles.inputContainer}>
          <TextInput style={getPickerStyle('picker2')} maxLength={300} multiline={true} onSubmitEditing={handleAwayTranslate} returnKeyType='done' blurOnSubmit={true} value={inputs.away} onChangeText={handleAwayChange} autoCorrect={false}
            onFocus={() => setFocus(prev => ({ ...prev, picker2: true }))}
            onBlur={() => setFocus(prev => ({ ...prev, picker2: false }))}
          ></TextInput>

          <Text style={{ fontSize: wp('4%'), fontWeight: 'bold', color: be, marginTop: 5 }}>{iso6391.getName(awayLang)}</Text>
        </View>

        <View>
          <AntDesign name="back" size={wp('8%')} style={{ color: be, transform: [{ rotate: '90deg' }] }} />
          <MaterialCommunityIcons name="text-to-speech" size={wp('8%')} color={bl} onPress={handleSpeech} />
        </View>

      </View>
    </>
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
    paddingLeft: wp('2.5%'),
    paddingTop: hp('1%'),
  },
  inputContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  homeField: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  awayField: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingBottom: hp('1%'),
    paddingTop: hp('1%')
  }
});