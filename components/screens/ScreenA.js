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
import { android, ios } from "../../APIKeys";

function ScreenA(props) {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  // const androidBannerAdID = ;
  // const androidInterstitialAdID = ;
  // const iosBannerAdID = ;
  // const iosInterstitialAdID = ;
  // await setTestDeviceIDAsync("EMULATOR");
  const bannerID =
    Platform.OS === "ios" ? ios.admobBanner : android.admobBanner;
  const interstitialID = useEffect(() => {
    (async () => {
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
