import { View, Text } from 'react-native'
import React from 'react'

export default function ContactList() {
 
    const userData = useSelector(state => state?.Auth?.userData);
    const user = useSelector(state => state.Auth.user);   
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const fetchStudents = async () => {
        const payload = {
          Type: 'student',
          Class: userData.classId,
          School: userData.schoolId,
          purpose: 'attendance',
          teacherID: user,
        };
    console.log("payload",payload)
        try {
          const response = await axios.post(getAllStudentsEndpoint, payload);
          console.log(response.data)
        if(response?.data?.errorMessage) 
        {
            setError(response.data.errorMessage);
            return
        }
        else
        {
            console.log('else')
        }
          const studentData = response.data.map(x => ({
            participantId: x?.uid,
            name: x.firstName +" "+ x.lastName,
            attendanceStatus: true,
          }));
          setStudents(studentData);
        } catch (error) {
          console.error('Error fetching students:', error);
        } finally {
          setLoading(false);
        }
      };

  return (
    <View>
      <Text>ContactList</Text>
    </View>
  )
}