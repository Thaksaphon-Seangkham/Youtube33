import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// ดึงความสูงและความกว้างของจอมาใช้เป๊ะๆ
const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get('window');

const SHORTS_DATA = [
  { id: '1', user: 'S3XSK1', title: 'รู้ตัวอีกที ปล่อยแล้ว', avatar: 'https://yt3.ggpht.com/XitWZ_ZL0MsLCHeSAGUQGekyPX4PHpFkOpK09IZHqpMd-sqybPLvRfDANRxxyG4jJZq3Wdlow-k=s48-c-k-c0x00ffffff-no-rj',
    bg: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/20/d4/1a/20d41aed-2666-235e-646d-e1e4eb5e5a3d/0.jpg/486x486bb.png' },
  { id: '2', user: 'BLVCKHEART', title: 'เทศกาล เพลงเศร้า', avatar: 'https://yt3.ggpht.com/MGF6s9z-uIGiShrJS8ZcRWRTPEskHcJlH1THQC1axIkrrH5xGUriiHwAd0-N7Md4usrfkLTvXgw=s48-c-k-c0x00ffffff-no-rj',
    bg: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/69/25/e3/6925e350-8b5f-f593-4447-6d0daac59b84/cover.jpg/600x600bf-60.jpg' }
];

export default function ShortsScreen() {
  const renderItem = ({ item }: any) => (
    <View style={styles.videoContainer}>
      {/* 1. วิดีโอพื้นหลัง (ใช้ Image แทนไปก่อน) */}
      <Image source={{ uri: item.bg }} style={styles.backgroundVideo} />

      {/* 2. ส่วน Overlay (ข้อมูลที่ลอยอยู่บนวิดีโอ) */}
      <View style={styles.overlay}>
        
        {/* แถบด้านล่าง: ชื่อศิลปิน + ชื่อคลิป */}
        <View style={styles.bottomSection}>
          <View style={styles.userRow}>
            <Image source={{ uri: item.avatar }} style={styles.userAvatar} />
            <Text style={styles.username}>{item.user}</Text>
            <TouchableOpacity style={styles.followBtn}>
              <Text style={styles.followText}>ติดตาม</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.videoDescription}>{item.title}</Text>
        </View>

        {/* แถบปุ่มด้านข้าง (Likes, Comments) */}
        <View style={styles.sideBar}>
          <View style={styles.sideIcon}><Ionicons name="heart" size={32} color="white" /><Text style={styles.iconLabel}>856</Text></View>
          <View style={styles.sideIcon}><Ionicons name="chatbubble-ellipses" size={32} color="white" /><Text style={styles.iconLabel}>32</Text></View>
          <View style={styles.sideIcon}><Ionicons name="share-social" size={32} color="white" /><Text style={styles.iconLabel}>แชร์</Text></View>
          <View style={styles.sideIcon}><Ionicons name="ellipsis-horizontal" size={28} color="white" /></View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      {/* ทำให้ StatusBar เป็นแบบโปร่งใสทับวิดีโอไปเลย */}
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      <FlatList
        data={SHORTS_DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        pagingEnabled // ล็อคการไถทีละคลิป
        snapToInterval={WINDOW_HEIGHT - 49} // 49 คือความสูงโดยประมาณของ Tab Bar ล่าง
        snapToAlignment="start"
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  videoContainer: {
    // ลบความสูงที่ทับซ้อนออกให้หมด
    height: WINDOW_HEIGHT - (Platform.OS === 'ios' ? 80 : 49), 
    width: WINDOW_WIDTH,
  },
  backgroundVideo: {
    ...StyleSheet.absoluteFillObject, // ขยายรูปให้เต็มพื้นที่ Container
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end', // ผลักคอนเทนต์ไปล่างสุด
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
  bottomSection: {
    width: '80%', // ไม่ให้บังปุ่มด้านข้าง
    marginBottom: 20,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#fff',
    marginRight: 10,
  },
  username: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 10,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowRadius: 4,
  },
  followBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 18,
  },
  followText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  videoDescription: {
    color: '#fff',
    fontSize: 15,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowRadius: 4,
  },
  sideBar: {
    position: 'absolute',
    right: 10,
    bottom: 50,
    alignItems: 'center',
  },
  sideIcon: {
    alignItems: 'center',
    marginBottom: 18,
  },
  iconLabel: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
});