import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  FlatList, Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// 1. ข้อมูลแถบวงกลม (เลื่อนแนวนอน)
const CHANNELS = [
  { id: '1', name: 'YOUNGOHM', img: 'https://yt3.googleusercontent.com/KawLhFUfqAum1mZULf5H7FRBWU04ZEPkyDwnc6GW0unMMIHnlsBPw0M-9-mCpBl_vi9jglWM=s160-c-k-c0x00ffffff-no-rj' },
  { id: '2', name: 'YUNGTARR', img: 'https://yt3.googleusercontent.com/XvWlMni6RCOF2IdhS7Pe8iF4bnrk4Ru9lbBufWRJsIAE4HtGtjKfpaaEl46_W8URZnt-OLTVdLQ=s160-c-k-c0x00ffffff-no-rj' },
  { id: '3', name: 'Z9', img: 'https://yt3.googleusercontent.com/uymGeDEIwl12hF4FhJ8Lh_8TCsSAeOX7i5I_VSJv3QrJ3psLJy4MZU_KDyozHMrReNekjraYcA=s160-c-k-c0x00ffffff-no-rj' },
  { id: '4', name: 'T!NE', img: 'https://yt3.googleusercontent.com/tOf_MquWrGrjsAPi6TpemOjKudqmb1LveXn2Rg0AHcq6un24gxQ_g1jehbz_xA_BhIjrpswn=s176-c-k-c0x00ffffff-no-rj-mo' },
  { id: '5', name: 'PUN', img: 'https://yt3.googleusercontent.com/J4vWqp6OYweGv7Q8F0y0Wxp5JZhRjlMCFwb1WBnBcTs9vcZiBHoOGKffboBxuGluMX_ICuSwHw=s176-c-k-c0x00ffffff-no-rj-mo' },
];

// 2. ข้อมูลวิดีโอ (รูปโปรไฟล์ตามคลิป)
const VIDEOS = [
  { 
    id: '1', 
    title: 'สำมะเรเทเมา - YOUNGOHM (Official Video)', 
    channel: 'YOUNGOHM', 
    views: '61M views', 
    time: '3 years ago',
    thumb: 'https://www.cdcosmos.com/wp-content/uploads/2023/01/324030221_1325519291534680_552760262311920867_n-800x800.jpg', 
    avatar: 'https://yt3.googleusercontent.com/KawLhFUfqAum1mZULf5H7FRBWU04ZEPkyDwnc6GW0unMMIHnlsBPw0M-9-mCpBl_vi9jglWM=s160-c-k-c0x00ffffff-no-rj' 
  },
  { 
    id: '2', 
    title: 'Satin - YUNGTARR', 
    channel: 'YANGTARR', 
    views: '7.9M views', 
    time: '1 years ago',
    thumb: 'https://i.scdn.co/image/ab67616d0000b27321e87424486e2b6167997ef1', 
    avatar: 'https://yt3.googleusercontent.com/XvWlMni6RCOF2IdhS7Pe8iF4bnrk4Ru9lbBufWRJsIAE4HtGtjKfpaaEl46_W8URZnt-OLTVdLQ=s160-c-k-c0x00ffffff-no-rj' 
  },
   { 
    id: '3', 
    title: 'CURSE(รักใครไม่เป็น) FT.2K, SARAN (Prod. by MARXPOLA) | D!EOUT', 
    channel: 'Z9', 
    views: '63M views', 
    time: '1 years ago',
    thumb: 'https://i.ytimg.com/vi/bH3vMDK_Hn0/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBRBmhR-BFtgeIFaW88XVRLWLUKbA', 
    avatar: 'https://yt3.googleusercontent.com/uymGeDEIwl12hF4FhJ8Lh_8TCsSAeOX7i5I_VSJv3QrJ3psLJy4MZU_KDyozHMrReNekjraYcA=s160-c-k-c0x00ffffff-no-rj' 
  },
   { 
    id: '4', 
    title: '"ไว้ลองกันใหม่" (Toxic Love) Ft. V!PER (Official)', 
    channel: 'T!NE', 
    views: '3.8M views', 
    time: '3 months ago',
    thumb: 'https://i.ytimg.com/vi/UrOtIsUVTAY/maxresdefault.jpg', 
    avatar: 'https://yt3.googleusercontent.com/tOf_MquWrGrjsAPi6TpemOjKudqmb1LveXn2Rg0AHcq6un24gxQ_g1jehbz_xA_BhIjrpswn=s176-c-k-c0x00ffffff-no-rj-mo' 
  }
];

export default function SubscriptionsScreen() {
  
  // --- ฟังก์ชันสร้างส่วนหัว (แถบวงกลม) ---
  const renderHeaderList = () => (
    <View style={styles.headerContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.channelBar}>
        {CHANNELS.map(item => (
          <TouchableOpacity key={item.id} style={styles.channelItem}>
            <View style={styles.avatarWrapper}>
              <Image source={{ uri: item.img }} style={styles.avatar} />
            </View>
            <Text style={styles.avatarText} numberOfLines={1}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* แถบ Filter (เพิ่มความสวย) */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterBar}>
        {['ทั้งหมด', 'วิดีโอ', 'Shorts', 'สด'].map((tag, index) => (
          <TouchableOpacity key={index} style={[styles.filterTag, index === 0 && styles.activeFilter]}>
            <Text style={[styles.filterText, index === 0 && styles.activeFilterText]}>{tag}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* --- Header แอป (โลโก้ + ค้นหา) --- */}
        <View style={styles.topNav}>
          <View style={styles.leftNav}>
            <Ionicons name="logo-youtube" size={30} color="red" />
            <Text style={styles.logoText}>YouTube</Text>
          </View>
          <View style={styles.rightNav}>
            <TouchableOpacity style={styles.navIcon}><Ionicons name="notifications-outline" size={24} color="black" /></TouchableOpacity>
            <TouchableOpacity style={styles.navIcon}><Ionicons name="search" size={24} color="black" /></TouchableOpacity>
          </View>
        </View>

        {/* --- รายการหลัก --- */}
        <FlatList
          data={VIDEOS}
          ListHeaderComponent={renderHeaderList} // ✅ แถบวงกลมจะอยู่ตรงนี้ ไม่หายแน่นอน
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.videoCard}>
              <Image source={{ uri: item.thumb }} style={styles.thumbnail} />
              <View style={styles.videoDetail}>
                <Image source={{ uri: item.avatar }} style={styles.channelIcon} /> 
                <View style={{ flex: 1 }}>
                  <Text style={styles.videoTitle} numberOfLines={2}>{item.title}</Text>
                  <Text style={styles.videoSub}>{item.channel} • {item.views} • {item.time}</Text>
                </View>
                <TouchableOpacity><Text style={{ fontSize: 20, color: '#606060' }}>⋮</Text></TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  container: { flex: 1 },
  topNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, height: 50 },
  leftNav: { flexDirection: 'row', alignItems: 'center' },
  logoText: { fontSize: 20, fontWeight: 'bold', marginLeft: 5, letterSpacing: -1 },
  rightNav: { flexDirection: 'row' },
  navIcon: { marginLeft: 20 },
  
  headerContainer: { borderBottomWidth: 1, borderBottomColor: '#f2f2f2', paddingBottom: 10 },
  channelBar: { paddingLeft: 15, paddingVertical: 12 },
  channelItem: { alignItems: 'center', marginRight: 20, width: 62 },
  avatarWrapper: { padding: 2, borderRadius: 32, borderWidth: 1, borderColor: '#eee', marginBottom: 4 },
  avatar: { width: 56, height: 56, borderRadius: 28 },
  avatarText: { fontSize: 10, color: '#606060' },
  
  filterBar: { paddingLeft: 15 },
  filterTag: { backgroundColor: '#f2f2f2', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, marginRight: 8 },
  activeFilter: { backgroundColor: '#000' },
  filterText: { fontSize: 13, color: '#000' },
  activeFilterText: { color: '#fff' },

  videoCard: { marginBottom: 15 },
  thumbnail: { width: '100%', aspectRatio: 16/9, backgroundColor: '#eee' },
  videoDetail: { flexDirection: 'row', padding: 12 },
  channelIcon: { width: 36, height: 36, borderRadius: 18, marginRight: 12 },
  videoTitle: { fontSize: 16, fontWeight: '500', marginBottom: 4 },
  videoSub: { fontSize: 12, color: '#606060' }
});