import React from 'react';
import { StyleSheet, View, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// ข้อมูลคลิป Shorts (5 คลิป)
const SHORTS_DATA = [
  { id: '1', title: 'เต้นเพลงใหม่ล่าสุด! 💃', channel: '@dancer_star', likes: '1.2M', comments: '500', music: 'Original Sound - Dancer Star', video: 'https://picsum.photos/seed/s1/400/800' },
  { id: '2', title: 'วิธีทำกะเพราไข่ดาวใน 30 วินาที 🍳', channel: '@cooking_time', likes: '850K', comments: '1.2K', music: 'Cooking Bossa Nova', video: 'https://picsum.photos/seed/s2/400/800' },
  { id: '3', title: 'แมวน่ารักๆ มาแล้ววว 🐱', channel: '@cat_lover', likes: '2M', comments: '10K', music: 'Cute Pets Theme', video: 'https://picsum.photos/seed/s3/400/800' },
  { id: '4', title: 'รีวิว Gadget มาใหม่ยุค 2026 📱', channel: '@tech_review', likes: '150K', comments: '450', music: 'Futuristic Beat', video: 'https://picsum.photos/seed/s4/400/800' },
  { id: '5', title: 'บรรยากาศหิมะตกที่ญี่ปุ่น ❄️', channel: '@travel_vibe', likes: '500K', comments: '800', music: 'Lo-fi Winter', video: 'https://picsum.photos/seed/s5/400/800' },
];

export default function ShortsScreen() {
  const renderShortItem = ({ item }: { item: typeof SHORTS_DATA[0] }) => (
    <View style={styles.shortContainer}>
      {/* ส่วนวิดีโอ (ตอนนี้ใช้รูปภาพแทนไปก่อน) */}
      <Image source={{ uri: item.video }} style={styles.videoBackground} resizeMode="cover" />

      {/* Overlay ด้านข้าง (ปุ่มกดต่างๆ) */}
      <View style={styles.rightButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="thumbs-up" size={32} color="white" />
          <ThemedText style={styles.actionText}>{item.likes}</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-ellipses" size={32} color="white" />
          <ThemedText style={styles.actionText}>{item.comments}</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-social" size={32} color="white" />
          <ThemedText style={styles.actionText}>แชร์</ThemedText>
        </TouchableOpacity>

        <View style={styles.musicDisk}>
          <View style={styles.innerDisk} />
        </View>
      </View>

      {/* รายละเอียดคลิปด้านล่าง */}
      <View style={styles.bottomInfo}>
        <ThemedText style={styles.channelName}>{item.channel}</ThemedText>
        <ThemedText style={styles.videoTitle} numberOfLines={2}>{item.title}</ThemedText>
        <View style={styles.musicRow}>
          <Ionicons name="musical-notes" size={16} color="white" />
          <ThemedText style={styles.musicText}>{item.music}</ThemedText>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={SHORTS_DATA}
        renderItem={renderShortItem}
        keyExtractor={(item) => item.id}
        snapToInterval={height} // ล็อคให้เลื่อนทีละหน้าจอพอดี
        snapToAlignment="start"
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  shortContainer: { width: width, height: height },
  videoBackground: { ...StyleSheet.absoluteFillObject },
  rightButtons: { position: 'absolute', right: 10, bottom: 100, alignItems: 'center' },
  actionButton: { alignItems: 'center', marginBottom: 20 },
  actionText: { color: 'white', fontSize: 12, marginTop: 4, fontWeight: 'bold', textShadowColor: 'black', textShadowRadius: 2 },
  bottomInfo: { position: 'absolute', bottom: 40, left: 15, right: 80 },
  channelName: { color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  videoTitle: { color: 'white', fontSize: 14, marginBottom: 10 },
  musicRow: { flexDirection: 'row', alignItems: 'center' },
  musicText: { color: 'white', fontSize: 12, marginLeft: 5 },
  musicDisk: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#333', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: 'white' },
  innerDisk: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#555' }
});