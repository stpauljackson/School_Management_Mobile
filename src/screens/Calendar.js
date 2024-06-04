import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CalendarList} from 'react-native-calendars';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {getCalendarEndpoint} from '../api/api';

const getMinDate = () => {
  const today = new Date();
  const currentMonth = today.getMonth() + 1;

  if (currentMonth <= 3) {
    const prevYear = today.getFullYear() - 1;
    return `${prevYear}-04-01`;
  } else {
    return `${today.getFullYear()}-04-01`;
  }
};

const getMaxDate = () => {
  const today = new Date();
  const currentMonth = today.getMonth() + 1;

  if (currentMonth <= 3) {
    return `${today.getFullYear()}-03-31`;
  } else {
    return `${today.getFullYear() + 1}-03-31`;
  }
};

const getCurrentDate = () => {
    const today = new Date();
    const currentDate = String(today.getDate()).padStart(2, '0');
    const currentMonth = String(today.getMonth() + 1).padStart(2, '0');
    const currentYear = today.getFullYear();
    const DateString = `${currentYear}-${currentMonth}-${currentDate}`;
    return DateString;
}

const MyCalendar = () => {
  const today = new Date().toISOString().split('T')[0];
  const userData = useSelector(state => state?.Auth?.userData);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(today);
  const [MarkedDate, setMarkedDate] = useState({});
  const transformCalendarData = data => {
    const transformedData = {};

    data.forEach(item => {
      const {date, halfday, holiday, day} = item;
      const selected = halfday === 'true' || holiday === 'true';
      const selectedColor = holiday === 'true' ? 'royalblue' : 'green';

      transformedData[date] = {selected, selectedColor, day};
    });

    return transformedData;
  };

  const fetchCalendarData = async school => {
    setLoading(true);
    try {
      const response = await axios.post(getCalendarEndpoint, {
        School: school,
      });

      const data = transformCalendarData(response.data);
      setMarkedDate(data);
    } catch (error) {
      console.error('Error fetching calendar data:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCalendarData(userData.schoolId);
  }, []);

  if (loading) return <Loader />;

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.date}>
          <Text style={{fontWeight: 'bold', color: 'green', fontSize: 18}}>
            {selectedDate}
          </Text>
        </View>
        {MarkedDate[selectedDate] && MarkedDate[selectedDate].day && (
          <View style={styles.day}>
            <Text
              style={{fontWeight: 'bold', color: 'royalblue', fontSize: 18}}>
              {MarkedDate[selectedDate].day}
            </Text>
          </View>
        )}
        
      </View>
      <CalendarList
        current={getCurrentDate()}
        pastScrollRange={24}
        futureScrollRange={24}
        horizontal={false}
        pagingEnabled={true}
        onDayPress={day => {
          setSelectedDate(day.dateString);
        }}
        markedDates={MarkedDate}
      />
      <View style={styles.legends}>
          <View style={styles.legendsContainer}>
            <View style={{...styles.dot,backgroundColor:'royalblue'}}></View>
            <Text style={styles.legendsLabel}>Holiday</Text>
          </View>
          <View style={styles.legendsContainer}>
            <View style={{...styles.dot,backgroundColor:'green'}}></View>
            <Text style={styles.legendsLabel}>Half-Day</Text>
          </View>
        </View>
    </View>
  );
};

export default MyCalendar;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    margin: 10,
  },
  date: {
    marginVertical: 5,
  },
  day: {
    marginVertical: 5,
  },
  legends: {
    position:'absolute',
    bottom: 0,
    backgroundColor:'white',
    width: '100%',
    height:50,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  legendsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendsLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  dot: {
    height: 10,
    width: 10,
    margin: 5,
    borderRadius: 10,
  },
});
