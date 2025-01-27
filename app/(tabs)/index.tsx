import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, SafeAreaView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReposRequest } from '../../hooks/action';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { NavigationProp } from '@react-navigation/native';

export default function HomeScreen({ navigation }: { navigation: NavigationProp<any> }) {
  const { repos, isLoading } = useSelector((state: { repos: any; }) => state.repos);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const fetchData = useCallback(
    (value: string, p: number) => {
      dispatch(fetchReposRequest(value, p));
    },
    [dispatch]
  );

  const search = useCallback(
    (value: string) => {
      setPage(1); // Reset page for new search
      fetchData(value, 1); // Pass the updated value directly
    },
    [fetchData]
  );

  const handleEndReached = useCallback(() => {
    if (!isLoading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchData(searchValue, nextPage);
    }
  }, [isLoading, page, fetchData, searchValue]);

  useEffect(() => {
    search(''); // Initial fetch with an empty search value
  }, [search]);

  return (
    <SafeAreaView>
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          style={styles.inputField}
          placeholder="Type something"
          placeholderTextColor="#ababab"
          onChangeText={(value) => setSearchValue(value)} // Update the local state
          onEndEditing={() => search(searchValue)} // Pass the current value of `searchValue`
        />
        <TouchableOpacity style={styles.searchBtn} onPress={() => search(searchValue)}>
          <FontAwesomeIcon icon={faMagnifyingGlass} color="#ffffff" />
        </TouchableOpacity>
      </View>
      {isLoading && page === 1 ? (
        <Text style={{ textAlign: 'center', padding: 6 }}>Loading...</Text>
      ) : (
        <FlatList
          data={repos}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.repoContainer}
              onPress={() => navigation.navigate('Details', item)}
            >
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
              <Text style={{ marginTop: 8 }}>{item.description}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputField: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 25,
    marginHorizontal: 6,
    padding: 12,
    flex: 1,
  },
  searchBtn: {
    backgroundColor: '#000000',
    borderRadius: 25,
    marginHorizontal: 6,
    padding: 12,
  },
  repoContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ababab',
    marginHorizontal: 8,
    marginVertical: 10,
    padding: 10,
  },
});
