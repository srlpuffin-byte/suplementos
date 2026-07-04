import { useState, useEffect } from 'react';
import { setAuthTokenGetter } from '@workspace/api-client-react';

const TOKEN_KEY = 'point_admin_token';

export function useAdminToken() {
  const [token, setTokenState] = useState<string | null>(() => {
    return localStorage.getItem(TOKEN_KEY);
  });

  useEffect(() => {
    setAuthTokenGetter(() => localStorage.getItem(TOKEN_KEY));
  }, []);

  const setToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem(TOKEN_KEY, newToken);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
    setTokenState(newToken);
    setAuthTokenGetter(() => newToken);
  };

  return { token, setToken };
}
