import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Text } from 'react-native-paper';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { DEFAULT_SELECTED_OPTION } from '@src/constant/common';
import Autocomplete from 'react-native-autocomplete-input';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAppDispatch } from '@src/app/store';
import { tickerSelectActions } from './ticker-select.slice';

export default function TickerSelect() {
  const { options } = useSelector((state: any) => {
    return state.tickerSelectReducer;
  });
  const [query, setQuery] = useState(DEFAULT_SELECTED_OPTION.value);
  const [suggestions, setSusgestions] = useState([]);
  const dimensions = useWindowDimensions();
  const dispatch = useAppDispatch();

  const handleFocus = () => {
    // show all options
    setSusgestions(options);
    setQuery('');
  };

  const handleQueryChange = (text: string) => {
    // show filtered options
    text = text ?? '';
    setQuery(text);
    const filtered = options.filter((item: any) => item.value.toLowerCase().includes(text.toLowerCase()));
    setSusgestions(filtered);
  };

  const handleItemSelect = (selectedValue: any) => {
    // select the item and close the dropdown
    setQuery(selectedValue);
    setSusgestions([]);
    const found = options.filter((item: any) => item.value.toLowerCase().includes(selectedValue.toLowerCase()));
    if (found.length > 0) {
      dispatch(tickerSelectActions.setSelectedOption(found[0]));
    }
  };

  return (
    <View style={styles.container}>
      <Autocomplete
        data={suggestions}
        value={query}
        onChangeText={handleQueryChange}
        onFocus={handleFocus}
        placeholder=''
        listContainerStyle={{ maxHeight: dimensions.height }}
        inputContainerStyle={styles.inputContainer}
        style={{
          backgroundColor: 'transparent',
          textAlign: 'center',
        }}
        flatListProps={{
          keyboardShouldPersistTaps: 'always',
          keyExtractor: (item: any) => item.value,
          renderItem: ({ item }) => (
            <TouchableOpacity
              onPress={() => {
                handleItemSelect(item.value);
              }}
              style={styles.item}
            >
              <Text style={styles.itemText}>{item.label}</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
    disableScrollIfPossible: false,
  },
  inputContainer: {
    height: 40,
  },
  dropdown: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  itemText: {
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  item: {
    backgroundColor: '#fff',
    padding: 4,
    opacity: 0.8,
  },
});
