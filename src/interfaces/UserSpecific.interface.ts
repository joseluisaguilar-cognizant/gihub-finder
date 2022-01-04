import UserInterface from './User.interface';

export default interface UserSearchInterface {
  total_count: number;
  incomplete_results: boolean;
  items: Array<UserInterface>;
}
