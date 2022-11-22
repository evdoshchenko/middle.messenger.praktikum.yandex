import { getByTestId, queryByTestId, waitFor } from '@testing-library/dom';
import { renderBlock, step } from 'tests';
import { ProfilePage } from './profile';

const USER_MOCK = {
  avatar: '/d66cf98f-05dc-49ba-8d2b-c1db0c5888c3/761d694b-39b5-4dee-ab15-78a2bf05461d_12.png',
  displayName: 'correctlogin',
  email: 'correct@log.in',
  firstName: 'correct',
  id: 3094,
  login: 'login',
  phone: '+79507006050',
  secondName: 'login',
};

describe('pages/Profile', () => {
  it('should logout from profile and redirect to signin', async () => {
    await step('render profile page to dom', () => {
      renderBlock({
        Block: ProfilePage,
        props: undefined,
        state: {
          screen: 'profile',
          appIsInited: true,
          user: USER_MOCK,
        },
      });
    });

    await step('click to logout button', () => {
      const button = getByTestId(document.body, 'logout-btn');
      button.click();
    });

    await step('wait openning sign in page', async () => {
      await waitFor(() => expect(queryByTestId(document.body, 'signin-screen')).toBeInTheDocument());
    });

    await step('check state', async () => {
      expect(window.store.getState().screen).toEqual('signin');
      expect(window.store.getState().user).toEqual(null);
    });
  });
});
