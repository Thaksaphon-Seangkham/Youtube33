import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AddScreen() {
  const [name, setName] = useState('');
  const handleSave = async () => {
  const videoData = {
    title: name,
    imageUri: 'https://picsum.photos/200/300' 
  };
  await AsyncStorage.setItem('video_data', JSON.stringify(videoData));
  Alert.alert('สำเร็จ', 'บันทึกข้อมูลและลิงก์ภาพแล้ว');
};
  const onAdd = async () => {
    if (!name) return Alert.alert('กรุณากรอกชื่อ');
    const newItem = { id: Date.now().toString(), title: name, url: 'https://picsum.photos/400/200' };
    const stored = await AsyncStorage.getItem('youtube_db');
    const list = stored ? JSON.parse(stored) : [];
    list.push(newItem);
    await AsyncStorage.setItem('youtube_db', JSON.stringify(list));
    setName('');
    Alert.alert('สำเร็จ', 'บันทึกวิดีโอแล้ว');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>ชื่อวิดีโอ:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="พิมพ์ชื่อวิดีโอ..." />
      <TouchableOpacity style={styles.btn} onPress={onAdd}><Text style={{color:'#fff'}}>บันทึกข้อมูล</Text></TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', justifyContent: 'center' },
  label: { fontSize: 18, marginBottom: 10 },
  input: { backgroundColor: '#f0f0f0', padding: 15, borderRadius: 8, marginBottom: 20 },
  btn: { backgroundColor: '#f00', padding: 15, borderRadius: 8, alignItems: 'center' }
});