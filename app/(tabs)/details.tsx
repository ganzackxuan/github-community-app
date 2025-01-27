import { StyleSheet,Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react';
import { faStar,faEye,faCodeBranch,faCode } from '@fortawesome/free-solid-svg-icons';

import { RouteProp } from '@react-navigation/native';

type DetailsScreenRouteProp = RouteProp<{ params: { name: string; description: string; stargazers_count: number; watchers_count: number; language: string; forks_count: number } }, 'params'>;

export default function DetailsScreen({ route }: { route: DetailsScreenRouteProp }) {
    const { name, description, stargazers_count, watchers_count, language, forks_count } = route.params;

    return (
      <View style={styles.container}>
        <Text style={{fontSize:22,fontWeight:'bold'}}>{name}</Text>
        <Text style={styles.descField}>{description}</Text>
        <View style={{height:20}}></View>
        <View style={styles.logoContainer}>
            <FontAwesomeIcon icon={faStar} />
            <Text style={styles.textField}>{stargazers_count} stars</Text>
        </View>
        <View style={styles.logoContainer}>
            <FontAwesomeIcon icon={faEye} />
            <Text style={styles.textField}>{watchers_count} watching</Text>
        </View>
        <View style={styles.logoContainer}>
            <FontAwesomeIcon icon={faCodeBranch} />
            <Text style={styles.textField}>{forks_count} forks</Text>
        </View>
        <View style={styles.logoContainer}>
            <FontAwesomeIcon icon={faCode} />
            <Text style={styles.textField}>{language}</Text>
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#ffffff",
    padding:8,
  },
  descField:{
    fontSize:16,
    marginTop:8
  },
  textField:{
    fontSize:16,
    marginLeft:6,
  },
  logoContainer:{
    flexDirection:'row',
    marginTop:8,
    alignItems:'center'
  }
});
