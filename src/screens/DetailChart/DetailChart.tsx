import * as React from 'react';
import type { CompositeScreenProps } from '@react-navigation/native';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { type DrawerScreenProps } from '@react-navigation/drawer';
import { type StackScreenProps } from '@react-navigation/stack';
import { type RootDrawerParamList, type RootStackParamList } from '@src/layout/Screens';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { HOME_PAGE_URL } from '@src/constant/env';
import { useSelector } from 'react-redux';

function wait(timeout: number | undefined) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export const DetailChart = ({
  navigation,
}: CompositeScreenProps<
  DrawerScreenProps<RootDrawerParamList, 'DetailChart'>,
  StackScreenProps<RootStackParamList>
>) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const webViewRef = React.useRef<any>(null);
  const { refreshCount } = useSelector((state: any) => state.detailChartReducer);

  useEffect(() => {
    if (webViewRef && webViewRef.current) {
      webViewRef.current.reload();
    }
  }, [refreshCount]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    if (webViewRef && webViewRef.current) {
      webViewRef.current.reload();
    }
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  const displaySpinner = () => {
    return (
      <View style={{ top: '50%', left: '50%', position: 'absolute' }}>
        <ActivityIndicator animating={true} />
      </View>
    );
  };

  return (
    <SafeAreaView edges={['right', 'bottom', 'left']} style={{ flex: 1 }}>
      <WebView
        source={{ uri: HOME_PAGE_URL as string }}
        renderLoading={displaySpinner}
        style={styles.container}
        ref={webViewRef}
        automaticallyAdjustContentInsets={false}
        allowsFullscreenVideo={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  ScrollStyle: {
    backgroundColor: 'white',
    position: 'relative',
  },
});
