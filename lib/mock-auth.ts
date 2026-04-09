export type Role = 'admin' | 'aluno' | 'professor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

export const mockUsers: Record<Role, User> = {
  admin: {
    id: 'admin001',
    name: 'Administrador',
    email: 'admin@escola.ao',
    role: 'admin',
    avatar: '/avatars/admin.jpg',
  },
  aluno: {
    id: 'DL23001',
    name: 'João Estudante',
    email: 'joao@student.ao',
    role: 'aluno',
    avatar: '/avatars/student.jpg',
  },
  professor: {
    id: 'PROF001',
    name: 'Prof. Maria Silva',
    email: 'maria@prof.ao',
    role: 'professor',
    avatar: '/avatars/prof.jpg',
  },
};

export function mockLogin(id: string, password: string): User | null {
  const user = Object.values(mockUsers).find(u => u.id === id);
  if (user && password === '1234') return user;
  return null;
}