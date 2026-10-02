import { useContext } from 'react';
import { ThemeContext } from '../theme/ThemeContextObj';

export function useTheme() {
  return useContext(ThemeContext);
}
