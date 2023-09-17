import * as React from 'react';
import { View } from 'react-native';
import { Subheading, Switch } from 'react-native-paper';

interface Props {
  label: string;
  value: boolean;
  dark?: boolean;
  onValueChange: () => void;
}

export function SettingsItem({ label, value, dark = false, onValueChange }: Props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
    >
      <Subheading style={{ color: dark ? 'white' : 'black' }}>{label}</Subheading>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
}
