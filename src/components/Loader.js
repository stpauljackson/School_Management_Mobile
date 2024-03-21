import { View,ActivityIndicator} from 'react-native'
import React from 'react'

export default Loader = () => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
}