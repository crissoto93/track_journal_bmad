import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

export const paperLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: 'rgb(0, 122, 255)',
  },
};

export const paperDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: 'rgb(10, 132, 255)',
  },
};
