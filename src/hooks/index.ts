import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from 'store';
import { useEffect, useState } from 'react';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useStopBodyScroll = (hide) => {
  useEffect(() => {
    if (hide) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }, [hide]);
};

export const useScrollToTop = () => {
  const { pathname } = useLocation();
  const [last_path, set_last_path] = useState(pathname);

  useEffect(() => {
    console.log(pathname);
    if (!last_path.includes(pathname)) {
      window.scrollTo(0, 0);
    }
    set_last_path(pathname);
  }, [pathname]);
};
