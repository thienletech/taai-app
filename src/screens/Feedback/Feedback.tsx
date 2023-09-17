import * as React from 'react';
import type { CompositeScreenProps } from '@react-navigation/native';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { type DrawerScreenProps } from '@react-navigation/drawer';
import { type StackScreenProps } from '@react-navigation/stack';
import { type RootDrawerParamList, type RootStackParamList } from '@src/layout/Screens';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Feedback = ({
  navigation,
}: CompositeScreenProps<DrawerScreenProps<RootDrawerParamList, 'Feedback'>, StackScreenProps<RootStackParamList>>) => {
  const theme = useTheme();
  return (
    <ScrollView style={{ backgroundColor: theme.colors.background }}>
      <SafeAreaView edges={['right', 'bottom', 'left']}>
        <View style={styles.container}>
          <Text style={styles.text}>
            {
              'Cảm ơn bạn đã sử dụng ứng dụng của chúng tôi! Chúng tôi rất mong nhận được ý kiến ​​phản hồi của bạn để cải thiện trải nghiệm người dùng.'
            }
          </Text>
          <Text style={styles.text}>
            {
              'Nếu bạn có bất kỳ ý kiến, lời khuyên hoặc câu hỏi nào liên quan đến ứng dụng của chúng tôi, vui lòng liên hệ với chủ sở hữu ứng dụng của chúng tôi theo địa chỉ email admin@aichungkhoan.info.'
            }
          </Text>
          <Text style={styles.text}>
            {
              'Chúng tôi luôn sẵn sàng hỗ trợ bạn và đáp ứng mọi yêu cầu của bạn. Cám ơn bạn đã sử dụng ứng dụng của chúng tôi và chúc một ngày tốt lành!'
            }
          </Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 8,
  },
  button: {
    margin: 24,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 16,
  },
  list: {
    marginLeft: 16,
    marginBottom: 16,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 8,
    marginLeft: 8,
    lineHeight: 24,
  },
});
