import { Resources, Users } from '@app/service/zz_gen_constants';
import { field, listViewConfig, rootConfig, section } from '@components/Resource/configs';

export const usersConfig = rootConfig({
  nav: {
    navItem: {
      label: 'Users',
    },
    group: 'Data'
  },
  parentConfig: listViewConfig({
    title: 'Users',
    createTitle: 'Create User',
    primaryResource: Resources.Users,
    listColumns: [{ id: Users.fieldName.id }, { id: Users.fieldName.username }],
    elements: [
      section({
        label: 'User Information',
        children: [
          field({
            name: Users.fieldName.id,
            label: 'ID',
          }),
          field({
            name: Users.fieldName.username,
            label: 'Username',
          }),
        ],
      }),
    ],
  }),
});
