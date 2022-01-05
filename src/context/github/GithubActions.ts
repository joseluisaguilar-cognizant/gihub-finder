import UserInterface from '../../interfaces/User.interface';
import UserSearchInterface from '../../interfaces/UserSpecific.interface';

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

export const searchUser = async (
  userId: string
): Promise<UserSearchInterface> => {
  const params = new URLSearchParams({
    q: userId,
  });

  // The URL we are trying to create is: https://api.github.com/search/users?q=USERNAME
  const response = await fetch(`${GITHUB_URL}/search/users?${params}`);
  const data: UserSearchInterface = await response.json();

  return data;
};

export const getUser = async (
  userId: string
): Promise<UserInterface | undefined> => {
  const response = await fetch(`${GITHUB_URL}/users/${userId}`);

  if (response.status === 404) {
    // TODO: Redirect to not found
    return;
  }
  const data: UserInterface = await response.json();

  return data;
};

export const getUserRepos = async (
  userId: string
): Promise<UserInterface | undefined> => {
  const params = new URLSearchParams({
    sort: 'created',
    per_page: '10',
  });

  const response = await fetch(`${GITHUB_URL}/users/${userId}/repos?${params}`);

  if (response.status === 404) {
    // TODO: Redirect to not found
    return;
  }
  const data: UserInterface = await response.json();

  return data;
};
