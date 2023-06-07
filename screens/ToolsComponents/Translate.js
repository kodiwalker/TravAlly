import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, StyleSheet } from 'react-native';
import testImg from '../../assets/favicon.png';
import axios from "axios";



export default function Translate() {
  const [inputs, setInputs] = useState({
    home: '',
    away: ''
  });

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
      const translated = await axios.post('http://192.168.1.73:3000/translate', { text: inputs.home, target: 'es' })

      setInputs({
        ...inputs,
        away: translated.data
      })
    } catch (e) {
      setInputs({
        home: '',
        away: ''
      })
    }
  }

  const handleAwayTranslate = async () => {
    setInputs({
      ...inputs,
      home: 'Translating...'
    })
    try {
      const translated = await axios.post('http://192.168.1.73:3000/translate', { text: inputs.away, target: 'en' })

      setInputs({
        ...inputs,
        home: translated.data
      })
    } catch (e) {
      setInputs({
        home: '',
        away: ''
      })
    }
  }


  return (
    <>
      <View style={styles.inputContainer}>
        <Image source={testImg}></Image>

        <TextInput style={styles.input} maxLength={300} multiline={true} onSubmitEditing={handleHomeTranslate} returnKeyType='done' blurOnSubmit={true} value={inputs.home} onChangeText={handleHomeChange}></TextInput>

      </View>

      <View style={styles.inputContainer}>

        <TextInput style={styles.input} maxLength={300} multiline={true} onSubmitEditing={handleAwayTranslate} returnKeyType='done' blurOnSubmit={true} value={inputs.away} onChangeText={handleAwayChange}></TextInput>

        <Image source={testImg}></Image>
      </View>
    </>
  )
}

const bl = '#0D3B66';
const be = '#FAF0CA';
const ye = '#F4D35E';
const or = '#EE964B';
const re = '#F95738';

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    width: '95%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    backgroundColor: be,
    color: bl,
    width: '80%',
    height: 54,
    borderRadius: 8,
    fontSize: 18
  }
});