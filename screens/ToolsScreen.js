import React, { useContext } from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Time from './ToolsComponents/Time';
import Currency from './ToolsComponents/Currency'
import Translate from './ToolsComponents/Translate';
import { AppContext } from "../Context";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function ToolsScreen() {
  const { homeCountry, awayCountry, isLoading } = useContext(AppContext);

  return isLoading ?

    <KeyboardAvoidingView style={styles.outer} behavior="position">
      <SafeAreaView style={styles.outer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.timeCard}>
              {/* <Time /> */}
            </View>

            <View style={styles.currencyCard}>
              {/* <Currency /> */}
            </View>

            <View style={styles.translateCard}>
              {/* <Translate /> */}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
    :

    <KeyboardAvoidingView style={styles.outer} behavior="position">
      <SafeAreaView style={styles.outer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.timeCard}>
              <Time />
            </View>

            <View style={styles.currencyCard}>
              <Currency />
            </View>

            <View style={styles.translateCard}>
              <Translate />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>

}

const bl = '#2A9D8F';
const db = '#264653';
const be = 'white';
const or = '#E76F51';

const styles = StyleSheet.create({
  outer: {
    flexGrow: 1,
    backgroundColor: be,
    alignItems: 'center',
  },
  container: {
    flexGrow: 1,
    backgroundColor: be,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: hp('2%')
  },
  timeCard: {
    backgroundColor: db,
    width: wp('90%'),
    height: hp('18%'),
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
  translateCard: {
    backgroundColor: db,
    width: wp('90%'),
    height: hp('32%'),
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
    width: wp('90%'),
    height: hp('18%'),
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
});
