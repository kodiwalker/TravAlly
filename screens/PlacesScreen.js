import React, { useContext } from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, View, Text, StyleSheet } from 'react-native';
import { AppContext } from "../Context";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function PlacesScreen() {

  return (
    <KeyboardAvoidingView style={styles.outer} behavior="position">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>

          <View style={styles.titleCard}>
            <Text style={styles.titleText}>Top Places</Text>
          </View>

          <View style={styles.mainContainer}>
            <View style={styles.homeCard}>
              <Text style={styles.heading}>Coming Soon</Text>
            </View>
          </View>

        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const bl = '#2A9D8F';
const db = '#264653';
const be = 'white';
const or = '#E76F51';

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: be,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: hp('5%')
  },
  container: {
    flex: 1,
    width: wp('100%'),
    backgroundColor: be,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: hp('5%')
  },
  titleCard: {
    backgroundColor: be,
    height: hp('10%'),
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('100%'),
  },
  titleText: {
    color: db,
    fontSize: wp('10%')
  },
  homeCard: {
    backgroundColor: db,
    width: wp('90%'),
    height: hp('25%'),
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: hp('1%'),
    borderRadius: wp('2%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: wp('3%'),
    },
    shadowOpacity: 0.31,
    shadowRadius: wp('3%'),
  },
  heading: {
    color: be,
    fontSize: wp('7%'),
    fontWeight: 200,
    letterSpacing: wp('3%'),
    paddingLeft: wp('2.5%'),
    paddingTop: hp('0.5%')
  },
  mainContainer: {
    height: hp('50%')
  }
});
