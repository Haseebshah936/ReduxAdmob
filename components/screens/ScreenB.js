import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Button, Platform, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../redux/Action";
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from "expo-ads-admob";
import { android, ios } from "../../APIKeys";

function ScreenB(props) {
  const store = useSelector((state) => state);
  const [loaded, setLoaded] = useState(true);
  const dispatch = useDispatch();
  const iosRewardedInterstitialAdID = ios.iosRewardedInterstitialAd;
  const androidRewardedInterstitialAdID = android.androidRewardedInterstitialAd;
  const rewardedVideoID = Platform.select({
    ios: ios.iosRewardedVideoID,
    android: android.androidRewardedVideoID,
  });
  // const iosRewardedAdID = ;
  // const androidRewardedAdID = ;
  const interstitialID =
    Platform.OS === "ios" ? ios.admobInterstitial : android.admobInterstitial;

  const rewardedVideo = async () => {
    setLoaded(false);
    AdMobRewarded.removeAllListeners();
    await AdMobRewarded.setAdUnitID(rewardedVideoID);
    await AdMobRewarded.requestAdAsync();
    await AdMobRewarded.showAdAsync();
    AdMobRewarded.addEventListener("rewardedVideoDidFailToPresent", () => {
      console.log("load");
      setLoaded(true);
      AdMobRewarded.removeAllListeners();
    });
    // AdMobRewarded.addEventListener("rewardedVideoDid", () => {
    //   console.log("load");
    //   setLoaded(true);
    // });
    AdMobRewarded.addEventListener("rewardedVideoDidDismiss", () => {
      console.log("closed");
      setLoaded(true);
      AdMobRewarded.removeAllListeners();
    });
    AdMobRewarded.addEventListener("rewardedVideoUserDidEarnReward", () => {
      console.log("reward");
      dispatch(increment(1));
      AdMobRewarded.removeAllListeners();
    });
    // await AsyncStorage.setItem("shot", JSON.stringify(store));
    // AdMobRewarded.removeAllListeners();
    setLoaded(true);
  };

  const instential = async () => {
    await AdMobInterstitial.setAdUnitID(interstitialID);
    await AdMobInterstitial.requestAdAsync({
      servePersonalizedAds: true,
    }).catch(console.log);
    if (await AdMobInterstitial.getIsReadyAsync().valueOf)
      await AdMobInterstitial.showAdAsync();
    dispatch(decrement(2));
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>ScreenB : {store}</Text>
      <Button title={"+"} onPress={rewardedVideo} disabled={!loaded} />
      <Button title={"-"} onPress={() => instential()} />
    </View>
  );
}

export default ScreenB;
