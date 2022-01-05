import UserInterface from './User.interface';

export default interface UserDetailInterface extends UserInterface {
  name: string;
  bio: string;
  blog: string;
  company: string;
  created_at: string;
  email: string | null;
  followers: number;
  following: number;
  hireable: boolean;
  location: string;
  public_gists: number;
  public_repos: number;
  twitter_username: string | null;
  updated_at: string;
}
