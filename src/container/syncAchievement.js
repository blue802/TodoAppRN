import firestore from '@react-native-firebase/firestore';
import NetInfo from '@react-native-community/netinfo';

import {getUserFromLocalStorage} from '../services/UserStorage';

const syncAchievement = (userId) => {
  const user = getUserFromLocalStorage();

  NetInfo.addEventListener((state) => {
    if (state.isConnected) {
      firestore().collection('achievements').doc(userId).update({
        score: user.score,
      });
    }
  });
};

export default syncAchievement;
