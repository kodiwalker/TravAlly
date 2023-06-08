import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TextInput, StyleSheet } from 'react-native';
import axios from "axios";
import { AppContext } from "../../Context";
import { Octicons } from '@expo/vector-icons';

export default function Currency() {
  const { homeCurrency, awayCurrency, homeFlag, setHomeFlag, awayFlag, setAwayFlag } = useContext(AppContext);
  const [homeRate, setHomeRate] = useState();
  const [awayRate, setAwayRate] = useState();
  const [inputs, setInputs] = useState({
    home: '',
    away: ''
  });

  useEffect(() => {

    const getRates = async () => {
      const ratesRes = await axios.post('http://192.168.1.73:3000/convert', { home: homeCurrency, away: awayCurrency }, { timeout: 3000 });
      setHomeRate(ratesRes.data.homeRateData.conversion_rate);
      setAwayRate(ratesRes.data.awayRateData.conversion_rate);
      setAwayFlag(ratesRes.data.homeRateData.target_data.flag_url);
      setHomeFlag(ratesRes.data.awayRateData.target_data.flag_url);
    }
    getRates();

  }, [homeCurrency, awayCurrency])

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
      <Text style={styles.heading}>Currency</Text>


      <View style={styles.inputContainer}>

        <View style={styles.bottom}>
          <Image source={{ uri: homeFlag }} style={{ width: 20, height: 20 }} resizeMode="contain"></Image>
          <TextInput style={styles.input} keyboardType="numeric" maxLength={10} textAlign='center' value={inputs.home} onChangeText={handleHomeConvert}></TextInput>

          <Octicons name="arrow-both" size={28} color={db} />

          <TextInput style={styles.input} keyboardType="numeric" maxLength={12} textAlign='center' value={inputs.away} onChangeText={handleAwayConvert}></TextInput>
          <Image source={{ uri: awayFlag }} style={{ width: 20, height: 20 }} resizeMode="contain"></Image>
        </View>

      </View>

      <View style={styles.top}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: be }}>{homeCurrency}</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: be }}>{awayCurrency}</Text>
      </View>
    </>
  )
}

const bl = '#2A9D8F';
const db = '#264653';
const be = '#F4F1DE';
const or = '#E76F51';

const styles = StyleSheet.create({
  heading: {
    color: be,
    fontSize: 28,
    fontWeight: 200,
    letterSpacing: 10,
    paddingLeft: 10,
    paddingTop: 5
  },
  inputContainer: {
    width: '89%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: be,
    borderRadius: 8,
  },
  bottom: {
    flexDirection: 'row',
    width: '89%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: be,
    borderRadius: 8
  },
  top: {
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  input: {
    color: db,
    width: 100,
    height: 40,
    borderRadius: 8,
    fontSize: 18
  }
});