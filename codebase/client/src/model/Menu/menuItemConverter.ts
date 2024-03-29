// Converts a list of menus from a server-storable shape to a shape that's usable by MenuEditForm.
// TODO: Re-evaluate. I think this object should stay in the MenuEdit folder because it is only used by MenuEditForm. But this could change over the course of development.
// TODO: Convert to a FirestoreConverter.

import Menu from './Menu';
import MenuDate from './MenuDate';
import MenuFile from './MenuFile';

const menuItemConverter = {
  separate(menus: Menu[] | undefined): {
    dates: MenuDate[];
    files: MenuFile[];
  } {
    if (menus === undefined) {
      return { dates: [], files: [] };
    }

    const dates: MenuDate[] = [];
    const files: MenuFile[] = [];

    for (let menu of menus) {
      dates.push(new MenuDate(menu.startDate, menu.id));
      files.push(menu.file.clone());
    }

    return {
      dates,
      files,
    };
  },

  // Returns null if dates.length !== files.length
  combine(dates: MenuDate[], files: MenuFile[]): Menu[] | null {
    if (dates.length !== files.length) {
      return null;
    }

    const numItems = dates.length;
    if (numItems === 0) {
      return [];
    }

    const menuItems: Menu[] = [];
    for (let i = 0; i < numItems; i++) {
      const currentMenuDate = dates[i];
      const currentMenuFile = files[i];
      const menuItem = new Menu(
        currentMenuDate.startDate,
        currentMenuFile.clone(),
        currentMenuDate.id
      );

      menuItems.push(menuItem);
    }

    return menuItems;
  },
};

export default menuItemConverter;
