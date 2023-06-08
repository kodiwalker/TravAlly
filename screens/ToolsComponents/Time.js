import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import 'moment-timezone';
import axios from "axios";
import { AppContext } from "../../Context";

export default function Time() {
  const { homeTZ, awayTZ } = useContext(AppContext);
  const [homeTime, setHomeTime] = useState('');
  const [awayTime, setAwayTime] = useState('');
  const intervalIdRef = useRef(null);
  const timeoutIdRef = useRef(null);


  useEffect(() => {
    const fetchTimes = async () => {
      try {
        const response = await axios.post('http://192.168.1.73:3000/time', { home: homeTZ, away: awayTZ });
        const isoTimes = response.data;

        const homeTime = moment(isoTimes.homeTime).format('h:mm A');
        const awayTime = moment(isoTimes.awayTime).format('h:mm A');


        setHomeTime(homeTime);
        setAwayTime(awayTime);
      } catch (error) {
        console.error('Error fetching times:', error);
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
          <Text style={{ color: be, fontWeight: 'bold' }}>{homeTZ}</Text>
        </View>

        <View style={styles.timeContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.timeText}>{awayTime}</Text>
          </View>
          <Text style={{ color: be, fontWeight: 'bold' }}>{awayTZ}</Text>
        </View>

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
  times: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%'
  },
  timeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: db,
  },
  textContainer: {
    backgroundColor: be,
    borderRadius: 10,
    padding: 5,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeContainer: {
    alignItems: 'center'
  }
});