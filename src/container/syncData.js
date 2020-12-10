import firestore from '@react-native-firebase/firestore';
import NetInfo from '@react-native-community/netinfo';
import {firebase} from '@react-native-firebase/firestore';

import {getTodosFromLocalStorage} from '../services/ServicesStorage';
import {ToastAndroid} from 'react-native';

const syncData = (userId) => {
  NetInfo.addEventListener((state) => {
    if (state.isConnected) {
      getTodosFromLocalStorage(userId).then((todos) => {
        firestore()
          .collection('todos')
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              if (
                doc.data().userId === userId &&
                !todos.find((task) => task.id === doc.id)
              ) {
                firestore().collection('todos').doc(doc.id).delete();
              }
            });
          });
        todos.forEach((task) => {
          firestore()
            .collection('todos')
            .doc(task.id)
            .set({
              title: task.title,
              isCompleted: task.isCompleted,
              category: task.category,
              createAt: firebase.firestore.Timestamp.fromDate(task.createAt),
              userId: task.userId,
            });
        });
      });
    } else {
      ToastAndroid.show(
        'Internet connection is not availabel!',
        ToastAndroid.SHORT,
      );
    }
  });
};

export default syncData;
