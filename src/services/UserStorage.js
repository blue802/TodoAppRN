import realm from './realm';

export const addUserToLocalStorage = (user) => {
  realm.write(() => {
    realm.create('User', user);
  });
};

export const removeUserFromLocalStorage = () => {
  const user = realm.objects('User');
  return new Promise((resolve, reject) => {
    realm.write(() => {
      realm.delete(user);
    });
  });
};

export const getUserFromLocalStorage = () => {
  const user = realm.objects('User');
  if (user.length !== 0) {
    return user[0];
  }
  return null;
};
