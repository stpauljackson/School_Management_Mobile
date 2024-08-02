import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import Home from '../screens/Home';
import Attendance from '../screens/Attendance';
import UploadMarks from '../screens/UploadMarks';
import SelectTest from '../screens/SelectTest';
import Announcements from '../screens/Announcements';
import AddStudentMarks from '../screens/AddStudentMarks';
import Calendar from '../screens/Calendar';
import Assignments from '../screens/Assignments';
import AllAssignments from '../screens/AllAssignments';
import Notifications from '../screens/Notifications';
import Classes from '../screens/Classes';
import Students from '../screens/Students';
import UserDetails from '../screens/UserDetails';
import Users from '../screens/Users';
import DashBoard from '../screens/DashBoard';
import DailyPlanner from '../screens/DailyPlanner';
import Examination from '../screens/Examination';
import AddExaminations from '../screens/AddExaminations';
export default function StackNavigator() {
  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Attendance" component={Attendance} />
        <Stack.Screen name="Upload Marks" component={UploadMarks} />
        <Stack.Screen name="Select Test" component={SelectTest} />
        <Stack.Screen name="Announcements" component={Announcements} />
        <Stack.Screen name="Add Marks" component={AddStudentMarks} />
        <Stack.Screen name="Classes" component={Classes} />
        <Stack.Screen name="Calendar" component={Calendar} />
        <Stack.Screen name="Assignments" component={Assignments} />
        <Stack.Screen name="Daily Planner" component={DailyPlanner} />
        <Stack.Screen name="Examinations" component={Examination} />
        <Stack.Screen
          name="All Assignments"
          component={AllAssignments}
          options={({route}) => ({
            headerTitle: route.params?.headerTitle || 'All Assignments',
          })}
        />
        <Stack.Screen name="Notifications" component={Notifications}
        tabBarStyle={{ display: 'none' }}
        options={{ tabBarStyle: { display: 'none' } }} />
        <Stack.Screen
          name="Add Classes"
          component={Students}
          options={({route}) => ({
            headerTitle:
              'Class ' + route.params?.class + ' ' + route.params?.section,
          })}
        />
        <Stack.Screen
          name="User Details"
          component={UserDetails}
          options={({route}) => ({
            headerTitle: route.params?.name || 'User Details',
          })}
        />
        <Stack.Screen
          name="Users"
          component={Users}
          options={({route}) => ({headerTitle: route.params?.title || 'Users'})}
        />
        <Stack.Screen name="Dashboard" component={DashBoard} />
      </Stack.Navigator>
  );
}
