import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, StyleSheet } from 'react-native';
import testImg from '../../assets/favicon.png';

export default function Currency() {

  const handleConvert = () => {

  }


  return (
    <>
      <View style={styles.inputContainer}>
        <Image source={testImg}></Image>
        <TextInput style={styles.input} keyboardType="numeric" maxLength={12}></TextInput>
      </View>

      <View style={styles.inputContainer}>
        <TextInput style={styles.input} keyboardType="numeric" maxLength={12}></TextInput>
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