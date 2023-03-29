import { dark, getThemeName, ThemeName, light } from '@apitable/components';

export const applyDefaultTheme = ({ className, ...props }) => {
  return {
    ...props,
    theme: getThemeName() === ThemeName.Dark ? dark : light,
  };
}