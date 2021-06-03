import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { load } from "../redux/Action";

function Loading({ navigation }) {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);

  //   const loading = async () => {
  //     await setTimeout(() => {
  //       dispatch(load());
  //       setLoading(false);
  //       navigation.navigate("Main");
  //     }, 5000);
  //     return 0;
  //   };
  useEffect(() => {
    // loading();
    (async () => {
      await AsyncStorage.getItem("shot")
        .then(async (v) => {
          console.log(parseInt(v));
          if (!parseInt(v)) {
            await AsyncStorage.setItem("shot", "0");
            dispatch(load());
          } else {
            dispatch(load(parseInt(v)));
          }
        })
        .then(() => {
          setLoading(false);
          navigation.navigate("Main");
        });
    })();
  }, []);

  return (
    isLoading && (
      <ActivityIndicator
        style={{ flex: 1, justifyContent: "center", alignSelf: "center" }}
        size={"large"}
        color={"black"}
      />
    )
  );
}

export default Loading;
