import React, { useEffect } from "react";
import { Button, Text, View, StyleSheet, Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from "expo-ads-admob";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ScreenA(props) {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  // const androidBannerAdID = ;
  // const androidInterstitialAdID = ;
  // const iosBannerAdID = ;
  // const iosInterstitialAdID = ;
  // await setTestDeviceIDAsync("EMULATOR");
  const bannerID =
    Platform.OS === "ios"
      ? "ca-app-pub-6922822810592227/1593763364"
      : "ca-app-pub-6922822810592227/9811218634";
  const interstitialID =
    Platform.OS === "ios"
      ? "ca-app-pub-6922822810592227/8058071694"
      : "ca-app-pub-6922822810592227/8853360187";

  useEffect(() => {
    (async () => {
      // await AdMobInterstitial.setAdUnitID(interstitialID);
      // await AdMobInterstitial.requestAdAsync({
      //   servePersonalizedAds: true,
      // }).catch(console.log);
      // if (await AdMobInterstitial.getIsReadyAsync().valueOf)
      //   await AdMobInterstitial.showAdAsync();
      await AsyncStorage.setItem("shot", JSON.stringify(store));
    })();
  }, [store]);
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text>ScreenA : {store}</Text>
      <View style={{ flexGrow: 1, flexShrink: 1, justifyContent: "flex-end" }}>
        <AdMobBanner
          bannerSize="leaderboard"
          adUnitID={bannerID}
          servePersonalizedAds={true}
          // onDidFailToRfeceiveAdWithError={console.log}
        />
      </View>
    </View>
  );
}

export default ScreenA;
