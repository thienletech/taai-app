import {
  DarkTheme,
  DefaultTheme,
  type InitialState,
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, Linking, useWindowDimensions, Text, View, Image } from 'react-native';
import { Provider as PaperProvider, MD3DarkTheme as PaperDarkTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { HeaderStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { NotFound } from '@src/screens/NotFound/NotFound';
import { About } from '@src/screens/About/About';
import { Chart } from '@src/screens/Chart/Chart';
import { type RootDrawerParamList, type RootStackParamList } from './Screens';
import { DetailChart } from '@src/screens/DetailChart/DetailChart';
import { HOME_PAGE_URL } from '@src/constant/env';
import { NAVIGATION_PERSISTENCE_KEY, THEME_PERSISTENCE_KEY } from '@src/constant/common';
import { Header, Icon } from 'react-native-elements';
import { useAppDispatch } from '@src/app/store';
import { detailChartActions } from '@src/screens/DetailChart/detail-chart.slice';
import { Feedback } from '@src/screens/Feedback/Feedback';
import Constants from 'expo-constants';

SplashScreen.preventAutoHideAsync();

const Drawer = createDrawerNavigator<RootDrawerParamList>();
const Stack = createStackNavigator<RootStackParamList>();

export function Main() {
  // initialize states
  const [theme, setTheme] = React.useState(DefaultTheme);
  const [isReady, setIsReady] = React.useState(Platform.OS === 'web');
  const [initialState, setInitialState] = React.useState<InitialState | undefined>();

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        // reset app state
        const initialUrl = await Linking.getInitialURL();
        if (Platform.OS !== 'web' || initialUrl === null) {
          const savedState = await AsyncStorage?.getItem(NAVIGATION_PERSISTENCE_KEY);
          const state = savedState ? JSON.parse(savedState) : undefined;
          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        // reset theme preference
        try {
          const themeName = await AsyncStorage?.getItem(THEME_PERSISTENCE_KEY);
          setTheme(themeName === 'dark' ? DarkTheme : DefaultTheme);
        } catch (e) {
          // Ignore
        }

        // hide splash screen
        setIsReady(true);
      }
    };

    restoreState();
  }, []);

  const paperTheme = React.useMemo(() => {
    const t = theme.dark ? DefaultTheme : PaperDarkTheme;
    return {
      ...t,
      colors: {
        ...t.colors,
        ...theme.colors,
        surface: theme.colors.card,
        accent: theme.dark ? 'rgb(255, 55, 95)' : 'rgb(255, 45, 85)',
      },
    };
  }, [theme.colors, theme.dark]);

  const dimensions = useWindowDimensions();

  const navigationRef = useNavigationContainerRef();
  const dispatch = useAppDispatch();

  if (!isReady) {
    return null;
  }

  const isLargeScreen = dimensions.width >= 1024;

  return (
    <PaperProvider theme={paperTheme}>
      <StatusBar translucent style={theme.dark ? 'light' : 'dark'} backgroundColor='rgba(0, 0, 0, 0.24)' />
      <NavigationContainer
        ref={navigationRef}
        initialState={initialState}
        onReady={() => {
          SplashScreen.hideAsync();
        }}
        onStateChange={async (state) => {
          await AsyncStorage?.setItem(NAVIGATION_PERSISTENCE_KEY, JSON.stringify(state));
        }}
        theme={theme}
        fallback={<Text>Loading…</Text>}
        documentTitle={{
          formatter: (options, route) => `${options?.title ?? route?.name} - TAAI`,
        }}
      >
        <Stack.Navigator
          screenOptions={{
            headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
          }}
        >
          <Stack.Screen
            name='Home'
            options={{
              headerShown: false,
            }}
          >
            {() => (
              <Drawer.Navigator
                initialRouteName='Chart'
                screenOptions={{
                  drawerType: isLargeScreen ? 'permanent' : undefined,
                }}
                drawerContent={(props) => {
                  return (
                    <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
                      <View
                        style={{
                          height: 200,
                          backgroundColor: '#f5f5f5',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Image
                          source={require('../../assets/cover.png')}
                          style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                        />
                      </View>
                      <DrawerItemList {...props} />
                      <DrawerItem
                        label='Trang chủ'
                        onPress={async () => await Linking.openURL(HOME_PAGE_URL ?? '')}
                        icon={({ size, color }) => <MaterialIcons size={size} color={color} name='link' />}
                      />
                    </DrawerContentScrollView>
                  );
                }}
              >
                <Drawer.Screen
                  name='Chart'
                  options={{
                    title: 'Tổng quan',
                    drawerIcon: ({ size, color }) => (
                      <MaterialIcons size={size} color={color} name='stacked-line-chart' />
                    ),
                  }}
                >
                  {Chart}
                </Drawer.Screen>
                <Drawer.Screen
                  name='DetailChart'
                  options={{
                    title: 'AI chứng khoán',
                    drawerIcon: ({ size, color }) => <MaterialIcons size={size} color={color} name='bar-chart' />,
                    headerRight: () => (
                      <View style={{ paddingRight: 8 }}>
                        <Icon
                          name='refresh'
                          color='#000'
                          onPress={() => dispatch(detailChartActions.startRefresh(null))}
                        />
                      </View>
                    ),
                  }}
                >
                  {DetailChart}
                </Drawer.Screen>
                <Drawer.Screen
                  name='About'
                  options={{
                    title: 'Thông tin',
                    drawerIcon: ({ size, color }) => <MaterialIcons size={size} color={color} name='info-outline' />,
                  }}
                >
                  {About}
                </Drawer.Screen>
                <Drawer.Screen
                  name='Feedback'
                  options={{
                    title: 'Phản hồi',
                    drawerIcon: ({ size, color }) => <MaterialIcons size={size} color={color} name='help-outline' />,
                  }}
                >
                  {Feedback}
                </Drawer.Screen>
              </Drawer.Navigator>
            )}
          </Stack.Screen>
          <Stack.Screen name='NotFound' component={NotFound} options={{ title: 'Oops!' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
