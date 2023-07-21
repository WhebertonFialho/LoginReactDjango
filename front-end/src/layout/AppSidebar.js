import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CSidebar, CSidebarNav, CSidebarFooter } from '@coreui/react';
import { cilAccountLogout } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { AppSidebarNav } from './AppSidebarNav';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import navigation from '../routes/_nav';

const AppSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <CSidebar position="fixed" unfoldable={unfoldable} visible={sidebarShow} onVisibleChange={(visible) => { dispatch({ type: 'set', sidebarShow: visible }) }} >
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarFooter onClick={ logOut } style={{ cursor: 'pointer' }}>
        <CIcon icon={cilAccountLogout} height={20} style={{ color: '#f71a0a' }} />
        <strong style={{ color: '#f71a0a', fontSize: 15 }}> Sair</strong>
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)