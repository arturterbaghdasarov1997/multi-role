import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RoleContextType {
  role: 'admin' | 'user' | 'courier' | null;
  setRole: (role: 'admin' | 'user' | 'courier' | null) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<'admin' | 'user' | 'courier' | null>(null);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};