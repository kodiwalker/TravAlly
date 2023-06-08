import React, { useContext } from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, View, Text, StyleSheet } from 'react-native';
import Time from './ToolsComponents/Time';
import Currency from './ToolsComponents/Currency'
import Translate from './ToolsComponents/Translate';
import { AppContext } from "../Context";

export default function ToolsScreen() {
  const { homeCountry, awayCountry } = useContext(AppContext);

  return (
    <KeyboardAvoidingView style={styles.outer} behavior="position">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>

          <View style={styles.countriesCard}>
            <Text style={styles.countryText}>{homeCountry} | {awayCountry}</Text>
          </View>

          <View style={styles.timeCard}>
            <Time />
          </View>

          <View
            style={styles.currencyCard}>
            <Currency />
          </View>

          <View style={styles.translateCard}>
            <Translate />
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
  countriesCard: {
    backgroundColor: be,
    // width: '90%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderColor: bl,
  },
  countryText: {
    color: db,
    fontSize: 28
  },
  timeCard: {
    backgroundColor: db,
    width: 360,
    height: 120,
    justifyContent: 'center',
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
  translateCard: {
    backgroundColor: db,
    width: 360,
    height: 220,
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
  currencyCard: {
    backgroundColor: db,
    width: 360,
    height: 130,
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
  text: {
    color: be,
  }
});