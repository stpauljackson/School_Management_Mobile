import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import {useSelector} from 'react-redux';
import { getDashboardEndpoint } from '../api/api';
import DashboardCard from '../components/DashboardCard';
export default function DashBoard() {
  const [data, setData] = useState([]);
  const {schoolId} = useSelector(state => state.Auth.userData);

  const fetchData = async () => {
    try {
      const response = await axios.post(getDashboardEndpoint,{schoolId: schoolId});
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{flex: 1,justifyContent: 'start', alignItems: 'center',flexDirection:'column',width:'100%'}}>
    <View style={{height:100,width:'100%'}} >
    <DashboardCard iconName="home" name="Board" value={data?.board} />
    </View>
      
      <View style={{height:100,width:'100%',flexDirection:'row'}} >
      
      <DashboardCard iconName="home" name="Total Students" value={data?.no_of_students} />
      <DashboardCard iconName="home" name="Total Teachers" value={data?.no_of_teachers} />
      </View>
     <View style={{height:100,width:'100%',flexDirection:'row'}} >
      <DashboardCard iconName="home" name="Total Employees" value={data?.no_of_employees} />
      </View>
    </View>
  );
}
