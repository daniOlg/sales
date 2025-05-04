import { setTheme } from '@/store/slices/theme-slice';
import { useAppDispatch, useAppSelector } from '@/store/store';

export const useTheme = () => {
  const dispatch = useAppDispatch();

  const {
    theme,
    supportedThemes,
  } = useAppSelector((state) => state.theme);

  return {
    theme,
    setTheme: (selectedTheme: string) => dispatch(setTheme(selectedTheme)),
    supportedThemes,
  };
};
