import React from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, View, Text, StyleSheet } from 'react-native';
import Time from './ToolsComponents/Time';
import Currency from './ToolsComponents/Currency'
import Translate from './ToolsComponents/Translate';

export default function ToolsScreen() {



  return (
    <KeyboardAvoidingView style={styles.outer} behavior="position">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>

          <View style={styles.greetingCard}>
            <Text style={styles.greetingText}>Good morning!</Text>
          </View>

          <View style={styles.timeCard}>
            <Time />
          </View>

          <Text>Currency Converter</Text>
          <View
            style={styles.currencyCard}>
            <Currency />
          </View>

          <Text>Translate</Text>
          <View style={styles.translateCard}>
            <Translate />
          </View>

        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const bl = '#0D3B66';
const be = '#FAF0CA';
const ye = '#F4D35E';
const or = '#EE964B';
const re = '#F95738';

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
    paddingBottom: 15
  },
  greetingCard: {
    backgroundColor: be,
    width: '90%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderColor: bl,
  },
  greetingText: {
    color: bl,
    fontSize: 36
  },
  timeCard: {
    backgroundColor: bl,
    width: 360,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  translateCard: {
    backgroundColor: bl,
    width: 360,
    height: 180,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 8,
  },
  currencyCard: {
    backgroundColor: bl,
    width: 360,
    height: 120,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 8,
  },
  text: {
    color: be,
  }
});