import axios from 'axios';

const getEventUrl = async (eventId: string): Promise<any> => {
  try {
    const ideas = await axios.get('/event/' + eventId);
    return ideas.data;
  } catch (e: any) {
    if (e.response) {
      throw new Error(e.response.data.message);
    } else {
      throw new Error('Please refresh page & try again.');
    }
  }
};

const getUser = async (): Promise<any> => {
  try {
    const user = await axios.get('/auth/check');
    return user.data;
  } catch (e: any) {
    if (e.response) {
      throw new Error(e.response.data.message);
    } else {
      throw new Error('Please refresh page & try again.');
    }
  }
};

export { getEventUrl, getUser };
