import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import * as Progress from 'react-native-progress';

import {useUserProvider} from '../../providers/UserProvider';
import styles from './style';
import Bronze from '../../assets/crown-1.png';
import Silver from '../../assets/crown-2.png';
import Gold from '../../assets/crown-3.png';
import Diamond from '../../assets/crown-4.png';

const AchievementScreen = () => {
  const [{user}, dispatch] = useUserProvider();
  const [exp, setExp] = useState(10);
  const [badge, setBadge] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (user.score < 10) {
      setExp(10);
      setBadge('Bronze');
    } else if (user.score < 100) {
      setExp(100);
      setBadge('Silver');
    } else if (user.score < 500) {
      setExp(500);
      setBadge('Gold');
    } else {
      setExp(1000);
      setBadge('Diamond');
    }
    setProgress(user.score / exp);
  }, [exp, user.score]);

  return (
    <View style={styles.container}>
      <Progress.Circle
        progress={progress}
        size={156}
        showsText={true}
        color="#3F2FFF"
        borderWidth={0}
        thickness={8}
        strokeCap="round"
      />
      {badge === 'Bronze' && <Image source={Bronze} style={styles.image} />}
      {badge === 'Silver' && <Image source={Silver} style={styles.image} />}
      {badge === 'Gold' && <Image source={Gold} style={styles.image} />}
      {badge === 'Diamond' && <Image source={Diamond} style={styles.image} />}
      <Text style={styles.text}>{badge}</Text>
    </View>
  );
};

export default AchievementScreen;
