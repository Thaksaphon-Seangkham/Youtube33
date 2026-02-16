import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const [list, setList] = useState<any[]>([]);
  const isFocused = useIsFocused();

  // โหลดข้อมูลวิดีโอที่เพิ่มไว้ (เกณฑ์ข้อ 3)
  const loadData = async () => {
    try {
      const saved = await AsyncStorage.getItem('youtube_db');
      if (saved) setList(JSON.parse(saved));
    } catch (e) { console.log(e); }
  };

  useEffect(() => { if (isFocused) loadData(); }, [isFocused]);

  // ฟังก์ชันลบวิดีโอ (เกณฑ์ข้อ 2)
  const onDelete = async (id: string) => {
    const newList = list.filter((item: any) => item.id !== id);
    setList(newList);
    await AsyncStorage.setItem('youtube_db', JSON.stringify(newList));
    Alert.alert('สำเร็จ', 'ลบวิดีโอเรียบร้อยแล้ว');
  };

  return (
    <ScrollView style={styles.container}>
      {/* ส่วนหัวโปรไฟล์ - สไตล์ YouTube */}
      <View style={styles.header}>
        <Image source={{ uri: 'https://picsum.photos/seed/user/150' }} style={styles.avatar} />
        <View style={styles.headerText}>
          <Text style={styles.userName}>My Channel</Text>
          <Text style={styles.userHandle}>@mychannel • ดูช่องของคุณ  </Text>
        </View>
      </View>

      {/* ปุ่มเมนู */}
      <View style={styles.menuRow}>
        <TouchableOpacity style={styles.menuButton}><Ionicons name="people-outline" size={20} color="black" /><Text style={styles.menuButtonText}>สลับบัญชี</Text></TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}><Ionicons name="logo-google" size={20} color="black" /><Text style={styles.menuButtonText}>บัญชี Google</Text></TouchableOpacity>
      </View>

      {/* ส่วนจัดการวิดีโอ (History/Your Videos) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>วิดีโอของคุณ (กดลบได้ที่นี่)</Text>
        {list.length > 0 ? (
          list.map((item) => (
            <View key={item.id} style={styles.videoItem}>
              <Image source={{ uri: item.url }} style={styles.thumb} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.videoTitle} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.videoInfo}>วิดีโอส่วนตัว • เพิ่งเพิ่มเมื่อครู่</Text>
              </View>
              <TouchableOpacity onPress={() => onDelete(item.id)}>
                <Ionicons name="trash-outline" size={22} color="red" />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>ยังไม่มีวิดีโอที่คุณเพิ่มไว้</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', padding: 20, alignItems: 'center', marginTop: 40 },
  avatar: { width: 70, height: 70, borderRadius: 35 },
  headerText: { marginLeft: 15 },
  userName: { fontSize: 22, fontWeight: 'bold' },
  userHandle: { fontSize: 13, color: '#606060' },
  menuRow: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 20 },
  menuButton: { flexDirection: 'row', backgroundColor: '#f2f2f2', padding: 8, borderRadius: 20, marginRight: 10, alignItems: 'center', paddingHorizontal: 12 },
  menuButtonText: { marginLeft: 5, fontSize: 12, fontWeight: '500' },
  section: { padding: 20, borderTopWidth: 1, borderTopColor: '#eee' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  videoItem: { flexDirection: 'row', marginBottom: 15, alignItems: 'center' },
  thumb: { width: 120, height: 68, borderRadius: 8 },
  videoTitle: { fontSize: 14, fontWeight: '500' },
  videoInfo: { fontSize: 11, color: '#606060', marginTop: 2 },
  emptyText: { textAlign: 'center', color: '#888', marginTop: 20 }
});