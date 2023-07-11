import { IP } from '@env';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import 'moment-timezone';
import axios from "axios";
import { AppContext } from "../../Context";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Time() {
  const { homeTZ, awayTZ } = useContext(AppContext);
  const [homeTime, setHomeTime] = useState('');
  const [awayTime, setAwayTime] = useState('');
  const intervalIdRef = useRef(null);
  const timeoutIdRef = useRef(null);

  const convertTimeZoneString = (str) => {
    const parts = str.split('/');
    return parts.slice(1).join('/').replace(/_/g, ' ');
  }

  useEffect(() => {
    const fetchTimes = async () => {
      try {
        const response = await axios.post(`https://kodiwalker.dev/time`, { home: homeTZ, away: awayTZ });
        const isoTimes = response.data;

        const homeTime = moment(isoTimes.homeTime).format('h:mm A');
        const awayTime = moment(isoTimes.awayTime).format('h:mm A');


        setHomeTime(homeTime);
        setAwayTime(awayTime);
      } catch (error) {
        console.error('Error fetching times:', error.message);
      }
    };

    fetchTimes();

    const millisecondsToNextMinute = 60 * 1000 - Date.now() % (60 * 1000);
    timeoutIdRef.current = setTimeout(() => {
      fetchTimes();
      intervalIdRef.current = setInterval(fetchTimes, 60 * 1000); // update every minute
    }, millisecondsToNextMinute);

    // Clean up on unmount
    return () => {
      clearTimeout(timeoutIdRef.current);
      clearInterval(intervalIdRef.current);
    };
  }, [homeTZ, awayTZ]);


  return (
    <>
      <Text style={styles.heading}>Time</Text>

      <View style={styles.times}>

        <View style={styles.timeContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.timeText}>{homeTime}</Text>
          </View>
          <Text style={styles.timeZoneText}>{convertTimeZoneString(homeTZ)}</Text>
        </View>

        {/* <Octicons name="arrow-both" size={28} color={be} style={{ paddingBottom: 20 }} /> */}

        <View style={styles.timeContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.timeText}>{awayTime}</Text>
          </View>
          <Text style={styles.timeZoneText}>{convertTimeZoneString(awayTZ)}</Text>
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
    paddingTop: hp('1%'),
    paddingBottom: hp('1%'),
  },
  times: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    paddingBottom: hp('1%')
  },
  timeText: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    color: db,
  },
  textContainer: {
    backgroundColor: be,
    borderRadius: 10,
    padding: 5,
    marginBottom: hp('1%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeContainer: {
    alignItems: 'center'
  },
  timeZoneText: {
    color: be,
    fontWeight: 'bold',
    fontSize: wp('4%'),
    paddingBottom: hp('1%')
  }
});