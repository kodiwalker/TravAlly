import React, { useContext } from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, View, Text, StyleSheet } from 'react-native';
import Time from './ToolsComponents/Time';
import Currency from './ToolsComponents/Currency'
import Translate from './ToolsComponents/Translate';
import { AppContext } from "../Context";

export default function GuideScreen() {

  return (
    <KeyboardAvoidingView style={styles.outer} behavior="position">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>

          <View style={styles.titleCard}>
            <Text style={styles.titleText}>Native Guide</Text>
          </View>

          <View style={styles.homeCard}>
            <Text style={styles.heading}>Coming Soon</Text>
          </View>

        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const bl = '#2A9D8F';
const db = '#264653';
const be = '#F4F1DE';
const or = '#E76F51';

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: be,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 45
  },
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: be,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 40
  },
  titleCard: {
    backgroundColor: be,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: db,
    fontSize: 36
  },
  homeCard: {
    backgroundColor: db,
    width: 360,
    height: 170,
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
  heading: {
    color: be,
    fontSize: 28,
    fontWeight: 200,
    letterSpacing: 10,
    paddingLeft: 10,
    paddingTop: 5
  },
});