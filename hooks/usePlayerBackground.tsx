import { colors } from "constants/tokens";
import { useEffect, useState } from "react";
import { getColors } from "react-native-image-colors";
import { IOSImageColors } from "react-native-image-colors/build/types";

export const usePlayerBackground = (imageUrl: string) => {
  const [imageColors, setImageColors] = useState<any>(null);
  console.log(imageUrl);
  useEffect(() => {
    getColors(imageUrl, {
      fallback: colors.background,
      cache: true,
      key: imageUrl,
    })
      .then((colors) => {
        console.log(colors, "dddw1");
        setImageColors(colors as IOSImageColors);
      })
      .catch((e) => {
        console.log(e, "dd");
      });
  }, [imageUrl]);

  return { imageColors };
};
