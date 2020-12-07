import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import * as Progress from 'react-native-progress';

import useTodos from '../../hooks/useTodos';
import styles from './style';
import Bronze from '../../assets/crown-1.png';
import Silver from '../../assets/crown-2.png';
import Gold from '../../assets/crown-3.png';
import Diamond from '../../assets/crown-4.png';

const AchievementScreen = () => {
  const {done} = useTodos('todos');
  const [exp, setExp] = useState(10);
  const [badge, setBadge] = useState(null);

  useEffect(() => {
    if (done < 10) {
      setExp(10);
      setBadge('Bronze');
    } else if (done < 100) {
      setExp(100);
      setBadge('Silver');
    } else if (done < 500) {
      setExp(500);
      setBadge('Gold');
    } else {
      setExp(1000);
      setBadge('Diamond');
    }
  }, [done]);

  return (
    <View style={styles.container}>
      <Progress.Circle
        progress={done / exp}
        size={156}
        showsText={true}
        color="#3F2FFF"
        borderWidth={0}
        thickness={8}
        strokeCap="round"
      />
      {badge === 'Bronze' && <Image source={Bronze} style={styles.image} />}
      <Text style={styles.text}>{badge}</Text>
    </View>
  );
};

export default AchievementScreen;
