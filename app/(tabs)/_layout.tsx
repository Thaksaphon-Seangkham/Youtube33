import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native'; // ใช้ View จากที่นี่เท่านั้น

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#000',
      headerShown: false,
      tabBarStyle: { 
        height: 70,           // ความสูงกำลังดี
        paddingBottom: 10,    // ไม่ให้จม
        backgroundColor: '#fff',
      },
    }}>
      {/* 1. หน้าแรก */}
      <Tabs.Screen name="index" options={{ title: 'หน้าแรก', tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} /> }} />
      
      {/* 2. Shorts */}
      <Tabs.Screen name="shorts" options={{ title: 'Shorts', tabBarIcon: ({ color }) => <Ionicons name="play-outline" size={24} color={color} /> }} />

      {/* 3. ปุ่มเพิ่มวิดีโอ (แก้ปุ่มแหว่งตรงนี้) */}
      <Tabs.Screen 
        name="add" 
        options={{ 
          title: '', 
          tabBarIcon: () => (
            <View style={{
              width: 42,
              height: 42,
              borderRadius: 21,
              borderWidth: 1.5,
              borderColor: '#000',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 5
            }}>
              <Ionicons name="add" size={30} color="black" />
            </View>
          ) 
        }} 
      />

      <Tabs.Screen name="subs" options={{ title: 'การติดตาม', tabBarIcon: ({ color }) => <Ionicons name="copy-outline" size={24} color={color} /> }} />
      <Tabs.Screen name="profile" options={{ title: 'คุณ', tabBarIcon: ({ color }) => <Ionicons name="person-circle-outline" size={24} color={color} /> }} />
    </Tabs>
  );
}