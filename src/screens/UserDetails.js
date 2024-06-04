import React, { useEffect } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

export default function UserDetails({route}) {
const userInfo = route?.params?.userInfo || useSelector(state => state?.Auth?.userData);;
  // Mapping of keys to labels
  const keyToLabel = {
    firstName: 'First Name',
    lastName: 'Last Name',
    address: 'Address',
    bloodGroup: 'Blood Group',
    boardRollNo: 'Board Roll No.',
    dateOfBirth: 'Date of Birth',
    email: 'Email',
    fatherEducation: 'Father Education',
    fatherIncome: 'Father Income',
    fatherMobileNumber: 'Father Mobile Number',
    fatherName: 'Father Name',
    fatherNationalId: 'Father National ID',
    fatherOccupation: 'Father Occupation',
    gender: 'Gender',
    identificationMark: 'Identification Mark',
    motherEducation: 'Mother Education',
    motherIncome: 'Mother Income',
    motherMobileNumber: 'Mother Mobile Number',
    motherName: 'Mother Name',
    motherNationalID: 'Mother National ID',
    motherOccupation: 'Mother Occupation',
    orphan: 'Orphan',
    phoneNumber: 'Phone Number',
    previouisSchool: 'Previous School',
    religion: 'Religion',
    studentGovtIdNo: 'Student Govt ID No.',
  };

  // Define the order in which you want to display the details
  const detailOrder = [
    'firstName',
    'lastName',
    'address',
    'bloodGroup',
    'boardRollNo',
    'dateOfBirth',
    'email',
    'fatherEducation',
    'fatherIncome',
    'fatherMobileNumber',
    'fatherName',
    'fatherNationalId',
    'fatherOccupation',
    'gender',
    'identificationMark',
    'motherEducation',
    'motherIncome',
    'motherMobileNumber',
    'motherName',
    'motherNationalID',
    'motherOccupation',
    'orphan',
    'phoneNumber',
    'previouisSchool',
    'religion',
    'studentGovtIdNo',
  ];

  // Function to render each detail with appropriate label
  const renderDetails = () => {
    return detailOrder.map(key => {
        let label = keyToLabel[key]||'N/A';
        let value = userInfo[key]||'N/A';

      return (
        <View style={styles.row} key={key}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>
            {typeof value === 'number' ? value.toString() : value}
          </Text>
        </View>
      );
    });
  };

  const badgeColor = {
    student: '#007bff',
    teacher: '#28a745',
    admin: '#dc3545',
  };

  return (
    <View style={styles.cardContainer}>
      {/* <View style={[styles.badge, { backgroundColor: badgeColor[userInfo.type] }]} /> */}
      {renderDetails()}
    </View>
  );

}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
  },
  value: {
    flex: 1,
    marginLeft: 10,
  },
});
