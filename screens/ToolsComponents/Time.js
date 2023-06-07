import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import 'moment-timezone';
import axios from "axios";

export default function Time({ homeTZ, awayTZ }) {
  const [homeTime, setHomeTime] = useState('');
  const [awayTime, setAwayTime] = useState('');
  const intervalIdRef = useRef(null);
  const timeoutIdRef = useRef(null);

  useEffect(() => {
    const fetchTimes = async () => {
      try {
        const response = await axios.post('http://192.168.1.73:3000/time', { home: homeTZ, away: awayTZ });
        const isoTimes = response.data;

        const homeTime = moment(isoTimes.homeTime).tz('America/Denver').format('h:mm A');
        const awayTime = moment(isoTimes.awayTime).tz('America/Panama').format('h:mm A');
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
  }, []); // when settings are changed


  return (
    <View style={styles.times}>
      <Text style={styles.timeText}>{homeTime}</Text>
      <Text style={styles.timeText}>{awayTime}</Text>
    </View>
  )
}

const bl = '#0D3B66';
const be = '#FAF0CA';
const ye = '#F4D35E';
const or = '#EE964B';
const re = '#F95738';

const styles = StyleSheet.create({
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
    color: or
  }
});