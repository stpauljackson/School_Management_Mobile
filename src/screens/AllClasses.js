import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableNativeFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';

import {getClassesEndpoint} from '../api/api';
import Loader from '../components/Loader';
import Accordion from '../components/Accordian';

function convertArray(Array) {
    const result = {};
    Array.forEach(obj => {
      if (result[obj.class]) {
        result[obj.class].sections.push({ id: obj.id, section: obj.section });
      } else {
        result[obj.class] = { class: obj.class, sections: [{ id: obj.id, section: obj.section }] };
      }
    });
    return Object.values(result);
  }

export default function AllClasses({navigation}) {
  const userData = useSelector(state => state?.Auth?.userData);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchClasses = async () => {
    setLoading(true);
    const payload = {
      schoolId: userData.schoolId,
    };
    try {
      const response = await axios.post(getClassesEndpoint, payload);
      const convertedArray = convertArray(response.data);
      setClasses(convertedArray);
      return;
    } catch (error) {
      console.error('Error fetching classes:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log('classes',classes);
    fetchClasses();
  }, []);
  if (loading) return <Loader />;
  if (classes.length === 0) return <Text>No classes found</Text>;

  return (
    <View style={styles.container}>
        <Accordion data={classes} navigation={navigation}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    padding:10
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'col',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  title: {
    fontSize: 32,
    alignSelf: 'center',
  },
  bubble: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
