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

function ScreenB(props) {
  const store = useSelector((state) => state);
  const [loaded, setLoaded] = useState(true);
  const dispatch = useDispatch();
  const iosRewardedInterstitialAdID = "ca-app-pub-6922822810592227/3066627130";
  const androidRewardedInterstitialAdID =
    "ca-app-pub-6922822810592227/6048013695";
  const rewardedVideoID = Platform.select({
    ios: "ca-app-pub-6922822810592227/4126565542",
    android: "ca-app-pub-6922822810592227/5652481770",
  });
  // const iosRewardedAdID = ;
  // const androidRewardedAdID = ;

  const interstitialID =
    Platform.OS === "ios"
      ? "ca-app-pub-6922822810592227/8058071694"
      : "ca-app-pub-6922822810592227/8853360187";

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
