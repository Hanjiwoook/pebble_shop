'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { createClient } from '@/utils/supabase/client';
import type { User as SupabaseUser, Session } from '@supabase/supabase-js';

interface SessionContextType {
  session: Session | null;
  user: SupabaseUser | null;
  loading: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    const getSession = async () => {
      console.log('SessionProvider: Initial getSession call');
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user || null);
      } finally {
        setLoading(false);
        console.log('SessionProvider: Initial session loaded', { session, user: session?.user, loading: false });
      }
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('SessionProvider: Auth state changed', { event, session, user: session?.user });
      setSession(session);
      setUser(session?.user || null);
      setLoading(false);
      console.log('SessionProvider: Auth state updated', { session, user: session?.user, loading: false });
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <SessionContext.Provider value={{ session, user, loading }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}
