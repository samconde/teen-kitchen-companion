import { useContext, useEffect, useState } from 'react';
import AuthContext from 'src/context/Auth/AuthContext';
import MenuContextProvider from './context/MenuContextProvider';
import MenuEditPage from './MenuEditPage';
import Menu from '../../../../model/Menu/Menu';
import getAllMenus from 'src/firebase/Menu/getAllMenus';
import Loading from 'src/components/layout/Loading';
import { useNavigate } from 'react-router-dom';

const MenuEdit = ({}: {}): JSX.Element => {
  const [menus, setMenus] = useState<Menu[] | null>(null);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authContext || !authContext.isSignedIn() || !authContext.isAdmin) {
      navigate('/');
    }

    async function retrieveMenus() {
      const retrievedMenus = await getAllMenus();
      setMenus(retrievedMenus);
    }

    retrieveMenus();
  }, []);

  if (menus === null) {
    return <Loading />;
  } else {
    return (
      <MenuContextProvider menus={menus}>
        <MenuEditPage />
      </MenuContextProvider>
    );
  }
};

export default MenuEdit;