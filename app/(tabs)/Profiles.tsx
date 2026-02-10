import React from 'react';
import { StyleSheet, View, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';

const HISTORY_DATA = [
  { id: '1', title: 'วิธีเขียนแอป YouTube', thumbnail: 'https://picsum.photos/seed/h1/160/90' },
  { id: '2', title: 'Vlog เที่ยวญี่ปุ่น', thumbnail: 'https://picsum.photos/seed/h2/160/90' },
  { id: '3', title: 'สอนใช้ React Native', thumbnail: 'https://picsum.photos/seed/h3/160/90' },
];

export default function ProfileScreen() {
  return (
    <ThemedView style={styles.container}>
      {/* Top Icons */}
      <View style={styles.topNav}>
        <View style={styles.rightIcons}>
          
          <Ionicons name="notifications-outline" size={24} style={styles.icon} />
          <Ionicons name="search-outline" size={24} style={styles.icon} />
          <Ionicons name="settings-outline" size={24} style={styles.icon} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* User Info Section */}
        <View style={styles.userInfo}>
          <Image 
            source={{ uri: 'https://picsum.photos/seed/user/100/100' }} 
            style={styles.profilePic} 
          />
          <View style={styles.userText}>
            <ThemedText type="title">ชื่อของคุณ</ThemedText>
            <ThemedText style={styles.handle}>@yourhandle • ดูช่องของคุณ {'>'}</ThemedText>
          </View>
        </View>

        {/* Switch Account / Google Account */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.actionRow}>
          <TouchableOpacity style={styles.actionBtn}><ThemedText>สลับบัญชี</ThemedText></TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}><ThemedText>บัญชี Google</ThemedText></TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}><ThemedText>โหมดไม่ระบุตัวตน</ThemedText></TouchableOpacity>
        </ScrollView>

        {/* History Section */}
        <View style={styles.sectionHeader}>
          <ThemedText type="defaultSemiBold" style={{ fontSize: 18 }}>ประวัติการเข้าชม</ThemedText>
          <TouchableOpacity style={styles.viewAllBtn}><ThemedText>ดูทั้งหมด</ThemedText></TouchableOpacity>
        </View>
        
        <FlatList
          horizontal
          data={HISTORY_DATA}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 16 }}
          renderItem={({ item }) => (
            <View style={styles.historyCard}>
              <Image source={{ uri: item.thumbnail }} style={styles.historyThumb} />
              <ThemedText numberOfLines={2} style={styles.historyTitle}>{item.title}</ThemedText>
            </View>
          )}
        />

        {/* Menu List */}
        <View style={styles.menuList}>
          <MenuItem icon="play-circle-outline" title="วิดีโอของคุณ" />
          <MenuItem icon="download-outline" title="วิดีโอที่ดาวน์โหลด" />
          <MenuItem icon="film-outline" title="ภาพยนตร์ของคุณ" />
          <MenuItem icon="time-outline" title="เวลาที่ใช้ในการรับชม" />
          <MenuItem icon="help-circle-outline" title="ความช่วยเหลือและความคิดเห็น" />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

// Component ย่อยสำหรับรายการเมนู
function MenuItem({ icon, title }: { icon: any, title: string }) {
  return (
    <TouchableOpacity style={styles.menuItem}>
      <Ionicons name={icon} size={24} color="black" />
      <ThemedText style={styles.menuText}>{title}</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 50 },
  topNav: { flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 16 },
  rightIcons: { flexDirection: 'row' },
  icon: { marginLeft: 20 },
  
  userInfo: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  profilePic: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#eee' },
  userText: { marginLeft: 16 },
  handle: { color: '#606060', marginTop: 4 },

  actionRow: { paddingLeft: 16, marginVertical: 10 },
  actionBtn: { backgroundColor: '#f2f2f2', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, marginRight: 10 },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  viewAllBtn: { borderWidth: 1, borderColor: '#ccc', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 15 },

  historyCard: { width: 160, marginRight: 12 },
  historyThumb: { width: 160, height: 90, borderRadius: 8, backgroundColor: '#eee' },
  historyTitle: { fontSize: 13, marginTop: 5 },

  menuList: { marginTop: 10, borderTopWidth: 0.5, borderTopColor: '#eee' },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 15 },
  menuText: { marginLeft: 20, fontSize: 15 },
});