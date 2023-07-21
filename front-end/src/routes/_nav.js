import React from 'react';
import CIcon from '@coreui/icons-react';
import { cilUser, cilSpeedometer} from '@coreui/icons';
import { CNavTitle, CNavItem } from '@coreui/react';

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={ cilSpeedometer } customClassName="nav-icon" />
  },
  {
    component: CNavTitle,
    name: 'Cadastro',
  },
  {
    component: CNavItem,
    name: 'Usuário',
    to: '/usuario',
    icon: <CIcon icon={ cilUser } customClassName="nav-icon" />,
  }
]

export default _nav
