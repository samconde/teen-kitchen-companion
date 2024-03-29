import { deleteDoc } from 'firebase/firestore';
import getMenuDocRef from '../References/getMenuDocRef';
import Menu from 'src/model/Menu/Menu';
import getMenuStorageRef from '../References/getMenuStorageRef';
import { deleteObject } from 'firebase/storage';

async function deleteMenu(menu: Menu) {
  const menuDocRef = getMenuDocRef(menu.id);
  await deleteDoc(menuDocRef);

  const menuStorageRef = getMenuStorageRef(menu.file.id);
  await deleteObject(menuStorageRef);
}

export default deleteMenu;
