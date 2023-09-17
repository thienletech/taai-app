export type RootDrawerParamList = {
  About: undefined;
  Chart: undefined;
  DetailChart: undefined;
  Feedback: undefined;
};

interface ParamListTypes {
  Home: undefined;
  NotFound: undefined;
}

export type RootStackParamList = {
  [P in Exclude<string, keyof ParamListTypes>]: undefined;
} & ParamListTypes;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
