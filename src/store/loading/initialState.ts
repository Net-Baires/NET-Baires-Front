import { LoadingState } from './types';
import { Member } from '../../services/models/Member';

export const initialState: LoadingState = {
  isLoading: false,
  memberDetail: {} as Member,
  eventsLive: false,
  onlineEvent: false
};


