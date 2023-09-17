import * as React from 'react';
import type { CompositeScreenProps } from '@react-navigation/native';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { type DrawerScreenProps } from '@react-navigation/drawer';
import { type StackScreenProps } from '@react-navigation/stack';
import { type RootDrawerParamList, type RootStackParamList } from '@src/layout/Screens';
import { SafeAreaView } from 'react-native-safe-area-context';

export const About = ({
  navigation,
}: CompositeScreenProps<DrawerScreenProps<RootDrawerParamList, 'About'>, StackScreenProps<RootStackParamList>>) => {
  const theme = useTheme();
  return (
    <ScrollView style={{ backgroundColor: theme.colors.background }}>
      <SafeAreaView edges={['right', 'bottom', 'left']}>
        <View style={styles.container}>
          <Text style={styles.heading}>{'AI Chứng Khoán là gì?'}</Text>
          <Text style={styles.text}>
            {
              'AI Chứng Khoán (Technical Analysis AI - TAAI) là một công cụ được sử dụng để dự đoán xu hướng giá cổ phiếu trên thị trường chứng khoán Việt Nam. TAAI đạt được điều này bằng cách sử dụng một mô hình Long Short-Term Memory (LSTM), một loại mạng nơ-ron nhân tạo đặc biệt phù hợp để nhận ra các mẫu trong dữ liệu tuần tự, chẳng hạn như dữ liệu chuỗi thời gian. Bằng cách phân tích dữ liệu giá cổ phiếu lịch sử của các công ty niêm yết trên thị trường chứng khoán Việt Nam, mô hình LSTM có thể xác định các mẫu và xu hướng có thể là dấu hiệu của các chuyển động giá trong tương lai. Điều này cho phép TAAI tạo ra các dự đoán về giá cổ phiếu trong tương lai với độ chính xác cao, cung cấp thông tin quý giá cho các nhà đầu tư và nhà giao dịch. Việc sử dụng Google TensorFlow Keras để tạo ra mô hình LSTM đảm bảo rằng nó được tối ưu hóa và hiệu quả cao, cho phép TAAI xử lý lượng dữ liệu lớn một cách nhanh chóng và chính xác.'
            }
          </Text>
          <Text style={styles.heading}>{'Nguyên tắc hoạt động của AI Chứng Khoán'}</Text>
          <Text style={styles.text}>
            {
              'Hệ thống AI Chứng Khoán sử dụng dữ liệu giá cổ phiếu được cập nhật hàng ngày để đưa ra dự đoán về xu hướng giá cổ phiếu trong tương lai. Dữ liệu đầu vào bao gồm giá mở cửa, giá cao nhất trong ngày, giá thấp nhất trong ngày, giá đóng cửa và khối lượng giao dich mỗi ngày. Vào cuối mỗi ngày giao dịch, mô hình AI sẽ phân tích dữ liệu mới nhất của từng cổ phiếu và tìm kiếm các mẫu và xu hướng có thể là dấu hiệu của các chuyển động giá trong tương lai. Dựa trên các phân tích này, hệ thống sẽ đưa ra dự đoán về xu hướng giá cổ phiếu trong những ngày kế tiếp.'
            }
          </Text>
          <Text style={styles.heading}>{'Lý thuyết về ứng dụng mô hình LSTM trong dự đoán giá cổ phiếu'}</Text>
          <Text style={styles.text}>
            {
              'Mô hình LSTM AI là một công cụ mạnh mẽ để dự đoán giá cổ phiếu trong tương lai. Nó sử dụng các thuật toán học máy để phân tích lịch sử giá cổ phiếu và tìm ra các xu hướng và mô hình trong dữ liệu. AI Chứng Khoán sử dụng mô hình LSTM được tạo ra bằng Google TensorFlow Keras, một công cụ mạnh mẽ để tạo ra các mô hình học máy.'
            }
          </Text>
          <Text style={styles.heading}>{'Tham khảo về việc sử dụng mô hình LSTM AI để dự đoán giá cổ phiếu'}</Text>
          <Text style={styles.text}>
            {
              'Nếu bạn muốn tìm hiểu thêm về việc sử dụng mô hình LSTM AI để dự đoán giá cổ phiếu, bạn có thể tham khảo các tài liệu sau đây:'
            }
          </Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>
              {'Stock Price Prediction Using LSTM trên trang web Towards Data Science'}
            </Text>
            <Text style={styles.listItem}>{'Stock Price Prediction Using LSTM and CNN trên trang web Medium'}</Text>
          </View>
          <Text style={styles.heading}>{'Thông báo miễn trừ trách nhiệm'}</Text>
          <Text style={styles.text}>
            {
              'Công cụ này chỉ nhằm mục đích cung cấp thông tin tham khảo, không khuyến nghị mời chào mua hay bán. Các nhà đầu tư nên có các nhận định độc lập, kết hợp với nhiều chỉ báo kỹ thuật và chỉ báo cơ bản cũng như tình hình thị trường chung, xem xét các mục tiêu đầu tư cá nhân, tình hình tài chính và nhu cầu đầu tư của mình, tham khảo ý kiến tư vấn từ các chuyên gia về các vấn đề quy phạm pháp luật, tài chính, thuế và các khía cạnh khác trước khi tham gia vào bất kỳ giao dịch nào với cổ phiếu nào. Chúng tôi không chịu trách nhiệm đối với bất kỳ tổn thất tài chính nào hoặc bất kỳ quyết định nào dựa trên công cụ này.'
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
