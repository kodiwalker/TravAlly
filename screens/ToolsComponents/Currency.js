import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, StyleSheet } from 'react-native';
import testImg from '../../assets/favicon.png';
import axios from "axios";

export default function Currency({ homeRate, awayRate }) {
  const [inputs, setInputs] = useState({
    home: '',
    away: ''
  });

  useEffect(() => {
    setInputs({
      home: '1',
      away: JSON.stringify(Math.floor(homeRate * 100) / 100)
    })
  }, [homeRate, awayRate])

  const handleHomeConvert = (text) => {
    if (isNaN(Number(text)) || Number(text) === 0) {
      setInputs({
        home: text,
        away: ''
      })
    } else {
      setInputs({
        home: text,
        away: JSON.stringify(Math.floor(Number(text) * homeRate * 100) / 100)
      })
    }
  }

  const handleAwayConvert = (text) => {
    if (isNaN(Number(text)) || Number(text) === 0) {
      setInputs({
        home: '',
        away: text
      })
    } else {
      setInputs({
        home: JSON.stringify(Math.floor(Number(text) * awayRate * 100) / 100),
        away: text
      })
    }
  }


  return (
    <>
      <View style={styles.inputContainer}>
        <Image source={testImg}></Image>
        <TextInput style={styles.input} keyboardType="numeric" maxLength={12} textAlign='center' value={inputs.home} onChangeText={handleHomeConvert}></TextInput>
      </View>

      <View style={styles.inputContainer}>
        <TextInput style={styles.input} keyboardType="numeric" maxLength={12} textAlign='center' value={inputs.away} onChangeText={handleAwayConvert}></TextInput>
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
    width: '50%',
    height: 40,
    borderRadius: 8,
    fontSize: 22
  }
});