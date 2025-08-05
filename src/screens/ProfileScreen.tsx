import React, { useState, useEffect } from 'react';
import {
  View, Text, Image, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar, Alert,
  Dimensions
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function ProfileScreen({ navigation, route }: Props) {
  
  const { friend } = route.params;
  const [profileImage, setProfileImage] = useState(friend.avatar);

  /*
  useEffect(() => {
    fetchProfileImage();
  }, []);

  const fetchProfileImage = async () => {
    try {
      const response = await fetch(`사진 주소`);
      const data = await response.json();
      // data.imageUrl 가 실제 이미지 URL이라고 가정
      setProfileImage({ uri: data.imageUrl });
    } catch (error) {
      console.log('프로필 이미지 로드 실패:', error);
      setProfileImage(friend.avatar); // 실패 시 기본 이미지 유지
    }
  };
  */

  const handleDownload = () => {
    Alert.alert(
      '다운로드',
      `${friend.name}의 프로필 사진을 다운로드하시겠습니까?`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '다운로드',
          onPress: () => {
            Alert.alert('다운로드 완료', '프로필 사진이 갤러리에 저장되었습니다.');
          },
        },
      ]
    );
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        {/* 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{friend.name}</Text>
          <TouchableOpacity onPress={handleDownload} style={styles.downloadButton}>
            <Text style={styles.downloadIcon}>💾</Text>
          </TouchableOpacity>
        </View>

        {/* 프로필 이미지 */}
        <View style={styles.imageContainer}>
          <Image source={profileImage} style={styles.profileImage} resizeMode="cover" />
        </View>

        {/* 프로필 이름 */}
        <View style={styles.nameContainer}>
          <Text style={styles.friendName}>{friend.name}</Text>
        </View>

        {/* 다운로드 버튼 */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.downloadButtonLarge} onPress={handleDownload}>
            <Text style={styles.downloadButtonIcon}>⬇</Text>
            <Text style={styles.downloadButtonText}>프로필 사진 다운로드</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 10,
  },
  downloadButton: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#191919',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  profileImage: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 15,
  },
  nameContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  friendName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#191919',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  downloadButtonLarge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  downloadButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  backIcon: {
    fontSize: 30,
    color: '#191919',
    fontWeight: 'bold',
  },
  downloadIcon: {
    fontSize: 20,
    color: '#191919',
  },
  downloadButtonIcon: {
    fontSize: 20,
    color: '#fff',
  },
});
