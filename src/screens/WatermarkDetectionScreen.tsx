import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar,
  Image, Alert, ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'WatermarkDetection'>;

export default function WatermarkDetectionScreen({ navigation }: Props) {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [detectionResult, setDetectionResult] = useState<string>('');

  const handleImageSelect = () => {
    // 이미지 선택 기능 (현재는 시뮬레이션)
    Alert.alert(
      '이미지 선택',
      '갤러리에서 이미지를 선택하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '선택',
          onPress: () => {
            // 실제로는 이미지 피커를 사용
            setSelectedImage(require('../assets/launch_screen.png'));
            setDetectionResult('');
          },
        },
      ]
    );
  };

  const handleWatermarkDetection = () => {
    if (!selectedImage) {
      Alert.alert('알림', '먼저 이미지를 선택해주세요.');
      return;
    }

    // 워터마크 검출 시뮬레이션
    Alert.alert(
      '워터마크 검출',
      '선택한 이미지에서 워터마크를 검출하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '검출',
          onPress: () => {
            // 백엔드 연동 시뮬레이션
            setTimeout(() => {
              const results = [
                '워터마크가 검출되었습니다.',
                '검출된 워터마크: "HACKERTON 2024"',
                '신뢰도: 95%',
                '위치: 이미지 우상단'
              ];
              setDetectionResult(results.join('\n'));
            }, 2000);
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
          <Text style={styles.headerTitle}>워터마크 검출</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content}>
          {/* 이미지 선택 섹션 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>이미지 선택</Text>
                         <TouchableOpacity style={styles.imageSelectButton} onPress={handleImageSelect}>
               <Text style={styles.imageIcon}>🖼️</Text>
               <Text style={styles.imageSelectText}>이미지 선택하기</Text>
             </TouchableOpacity>
          </View>

          {/* 선택된 이미지 표시 */}
          {selectedImage && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>선택된 이미지</Text>
              <View style={styles.imageContainer}>
                <Image source={selectedImage} style={styles.selectedImage} resizeMode="contain" />
              </View>
            </View>
          )}

          {/* 워터마크 검출 버튼 */}
          {selectedImage && (
            <View style={styles.section}>
                             <TouchableOpacity style={styles.detectionButton} onPress={handleWatermarkDetection}>
                 <Text style={styles.searchIcon}>🔍</Text>
                 <Text style={styles.detectionButtonText}>워터마크 검출하기</Text>
               </TouchableOpacity>
            </View>
          )}

          {/* 검출 결과 */}
          {detectionResult && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>검출 결과</Text>
              <View style={styles.resultContainer}>
                <Text style={styles.resultText}>{detectionResult}</Text>
              </View>
            </View>
          )}

          {/* 백엔드 연동 정보 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>백엔드 연동 정보</Text>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>
                • 이미지 업로드: POST /api/upload-image{'\n'}
                • 워터마크 검출: POST /api/detect-watermark{'\n'}
                • 검출 결과: GET /api/detection-result{'\n'}
                • 현재 상태: 시뮬레이션 모드
              </Text>
            </View>
          </View>
        </ScrollView>
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
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#191919',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#191919',
    marginBottom: 15,
  },
  imageSelectButton: {
    borderWidth: 2,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageSelectText: {
    fontSize: 16,
    color: '#007AFF',
    marginTop: 10,
    fontWeight: '600',
  },
  imageContainer: {
    alignItems: 'center',
  },
  selectedImage: {
    width: 300,
    height: 300,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  detectionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  detectionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  resultContainer: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#28a745',
  },
  resultText: {
    fontSize: 14,
    color: '#191919',
    lineHeight: 20,
  },
  infoContainer: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  backIcon: {
    fontSize: 24,
    color: '#191919',
    fontWeight: 'bold',
  },
  imageIcon: {
    fontSize: 32,
    color: '#007AFF',
  },
  searchIcon: {
    fontSize: 20,
    color: '#fff',
  },
}); 