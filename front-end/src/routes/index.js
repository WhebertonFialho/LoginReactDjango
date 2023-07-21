import React from 'react';

const Dashboard = React.lazy(() => import('../views/dashboard'));
const Usuario = React.lazy(() => import('../views/usuario'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/usuario', name: 'Usuário', element: Usuario },
]

export default routes
