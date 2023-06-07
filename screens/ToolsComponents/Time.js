import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from "axios";

export default function Time() {
  const [homeTime, setHomeTime] = useState('');
  const [awayTime, setAwayTime] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post('http://192.168.1.73:3000/time', { home: 'America/Denver', away: 'America/Panama' });
        const isoTimes = response.data;

        const homeTime = new Date(isoTimes.homeTime).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        });
        const awayTime = new Date(isoTimes.awayTime).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        });
        setHomeTime(homeTime);
        setAwayTime(awayTime);
      } catch (error) {
        console.error('Error fetching times:', error);
      }
    })();
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