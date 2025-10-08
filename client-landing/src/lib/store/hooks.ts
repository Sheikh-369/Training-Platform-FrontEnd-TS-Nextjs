import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


// For logout and auth state tracking
export function useAuth() {
  const user = useAppSelector((state) => state.auth.user);

  return {
    isLoggedIn: !!user,  // ONLY rely on Redux state here
    user,
  };
}
