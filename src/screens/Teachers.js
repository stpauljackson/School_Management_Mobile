import {View, Text,FlatList} from 'react-native';
import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';

import {getUsersByClassOrSchoolEndpoint} from '../api/api';
import Loader from '../components/Loader';
import UserListCard from '../components/UserListCard';

export default function Teachers({navigation}) {
    const {schoolId} = useSelector(state => state.Auth.userData);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post(getUsersByClassOrSchoolEndpoint, {
        type: 'teacher',
        schoolId,
      });
      setTeachers(response.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <View>
      <FlatList
        data={teachers}
        keyExtractor={item => item.id}
        renderItem={({item,index}) => (
            <UserListCard item={item} index={index} navigation={navigation} />
        )}
      />
    </View>
  );
}
