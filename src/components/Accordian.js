import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Accordion = ({ data, navigation }) => {
  const [expanded, setExpanded] = useState([]);

  const toggleAccordion = (classIndex) => {
    let expandedArray = [...expanded];
    expandedArray[classIndex] = !expandedArray[classIndex];
    setExpanded(expandedArray);
  };

  const handleSectionPress = (classItem, sectionItem) => {
    navigation.navigate('Add Classes', { class: classItem.class, section: sectionItem.section, id: sectionItem.id });
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.cardContainer}>
      <TouchableOpacity onPress={() => toggleAccordion(index)} style={styles.card}>
        <Text style={styles.cardTitle}>{`Class ${item.class}`}</Text>
        <Ionicons
          name={expanded[index] ? 'chevron-down-outline':'chevron-forward-outline'}
          size={24}
          color="#333"
        />
      </TouchableOpacity>
      {expanded[index] && (
        <View style={styles.cardContent}>
          {item.sections.map((section, sectionIndex) => (
            <TouchableOpacity key={sectionIndex} onPress={() => handleSectionPress(item, section)} style={styles.section}>
              <Text>Section {section.section}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 3,
    borderRadius: 5,
    padding: 15,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardContent: {
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  section: {
    backgroundColor: '#fff',
    elevation: 2,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default Accordion;
