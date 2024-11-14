import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface RoleContextType {
  role: 'admin' | 'user' | 'courier';
  setRole: React.Dispatch<React.SetStateAction<'admin' | 'user' | 'courier'>>;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<'admin' | 'user' | 'courier'>('admin');

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole as 'admin' | 'user' | 'courier');
    }
  }, []);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = (): RoleContextType => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};
