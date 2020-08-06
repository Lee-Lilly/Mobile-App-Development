import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
  AdMobInterstitial,
  AdMobRewarded,
} from 'react-native-admob';

AdMobRewarded.setAdUnitID('ca-app-pub-6213982046179727/1711883444');
AdMobRewarded.addEventListener('adLoaded', () =>
  console.log('AdMobRewarded => adLoaded'),
);
AdMobRewarded.addEventListener('adFailedToLoad', error =>
  console.warn(error),
);
AdMobRewarded.addEventListener('adOpened', () =>
  console.log('AdMobRewarded => adOpened'),
);
AdMobRewarded.addEventListener('videoStarted', () =>
  console.log('AdMobRewarded => videoStarted'),
);
AdMobRewarded.addEventListener('adClosed', () => {
  console.log('AdMobRewarded => adClosed');
  AdMobRewarded.requestAd().catch(error => console.warn(error));
});
AdMobRewarded.addEventListener('adLeftApplication', () =>
  console.log('AdMobRewarded => adLeftApplication'),
);

AdMobInterstitial.setAdUnitID('ca-app-pub-6213982046179727/4968602179');
AdMobInterstitial.addEventListener('adLoaded', () =>
  console.log('AdMobInterstitial adLoaded'),
);
AdMobInterstitial.addEventListener('adFailedToLoad', error =>
  console.warn(error),
);
AdMobInterstitial.addEventListener('adOpened', () =>
  console.log('AdMobInterstitial => adOpened'),
);
AdMobInterstitial.addEventListener('adClosed', () => {
  console.log('AdMobInterstitial => adClosed');
  AdMobInterstitial.requestAd().catch(error => console.warn(error));
});
AdMobInterstitial.addEventListener('adLeftApplication', () =>
  console.log('AdMobInterstitial => adLeftApplication'),
);

const App: () => React$Node = () => {
  const [reward, setReward] = React.useState(0);

  const showRewarded = () => {
    AdMobRewarded.requestAd().then(() => AdMobRewarded.showAd()).catch(error => console.warn(error));
    //increase the reward count by 10
    setReward(reward+10);
  }

  const showInterstitial = () => {
    AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd()).catch(error => console.warn(error));
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Button
                title="Show A Interstitial"
                onPress={showInterstitial}
              />     
            </View>
            <View style={styles.sectionContainer}>
              <Button
                title="Show A Rewarded Video"
                onPress= {showRewarded}                
              />
              <Text style={styles.sectionDescription}>Reward count: {reward} </Text> 
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
