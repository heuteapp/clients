import { useHashParams } from "@/src/ui/hooks/useHashParams";

//

export function useAuthHashParams(): AuthHashParams | null {
  const hash = useHashParams();

  if (!hash.access_token) return null;

  const authParams: AuthHashParams = {
    access_token: hash.access_token,
    expires_at: hash.expires_at,
    expires_in: hash.expires_in,
    refresh_token: hash.refresh_token,
    token_type: hash.token_type,
  };

  return authParams;
}

//

export interface AuthHashParams {
  access_token: string;
  expires_at?: string;
  expires_in?: string;
  refresh_token?: string;
  token_type?: string;
  [key: string]: string | undefined;
}
