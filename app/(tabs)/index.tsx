import { Colors } from "@/utils/Colors";
import { getImageDimensions } from "@/utils/helpers";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

// Expo stuff and moment.js
import * as FileSystem from "expo-file-system/legacy";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import moment from "moment";
import { SafeAreaView } from "react-native-safe-area-context";

const modelData = [
  // { label: "Flux.1-dev", value: "black-forest-labs/FLUX.1-dev" },
  { label: "FLUX.1-schnell", value: "black-forest-labs/FLUX.1-schnell" },
  // {
  //   label: "Stable Diffusion 3.5L",
  //   value: "stabilityai/stable-diffusion-3.5-large",
  // },
  // {
  //   label: "Stable Diffusion XL",
  //   value: "stabilityai/stable-diffusion-xl-base-1.0",
  // },
  // {
  //   label: "Stable Diffusion v1.5",
  //   value: "stable-diffusion-v1-5/stable-diffusion-v1-5",
  // },
  // {
  //   label: "ByteDance/Hyper-SD",
  //   value: "stable-diffusion-v1-5/stable-diffusion-v1-5",
  // },
  // {
  //   label: "Qwen/Qwen-Image",
  //   value: "stable-diffusion-v1-5/stable-diffusion-v1-5",
  // },
];

const aspectRatioData = [
  { label: "1/1", value: "1/1" },
  { label: "16/9", value: "16/9" },
  { label: "9/16", value: "9/16" },
];

const examplePrompts = [
  "Hyper-detailed cyberpunk Johannesburg 2095, neon Zulu typography signs, rain-soaked streets reflecting magenta and electric cyan lights, holographic street vendors, braided-haired hacker girl in chrome jacket with LED patterns, cinematic wide-angle shot, volumetric fog, Blade Runner aesthetic, 8k ultra realism.",
  "Futuristic Afro-tech metropolis floating above Cape Town’s Table Mountain, gold and deep indigo color palette, solar-panel skyscrapers shaped like geometric diamonds, drone traffic lanes glowing teal, sunset with dramatic clouds, ultra-detailed matte painting, Unreal Engine 5 render.",
  "Graffiti mural concept on a cracked concrete wall, bold street art reading 'Code the Future' in 3D spray paint lettering, neon orange and toxic green color scheme, glitch effects, robotic hand breaking through the wall, urban decay background, high-contrast photography style.",
  "Ultra-modern tech logo for 'CodeXone', sharp angular monogram CX fused into an infinity symbol, gradient from royal blue to ultraviolet, metallic chrome edges, subtle neon glow, black matte background, vector precision, brand presentation mockup.",
  "Dystopian sci-fi marketplace at night, vendors selling glowing cybernetic implants, crimson and turquoise lighting, steam rising from vents, diverse crowd with augmented limbs, cinematic depth of field, high detail, dramatic cyberpunk realism.",
  "Luxury penthouse interior in Dubai 2080, floor-to-ceiling smart glass walls overlooking a futuristic skyline, gold and obsidian color palette, AI hologram assistant projected in mid-air, glossy marble floors reflecting ambient blue lighting, hyper-realistic architectural render.",
  "Anime-inspired cyber samurai with braided silver hair, glowing plasma katana in hot pink, matte black armor with luminous circuit patterns, standing in a rainy neon alleyway, puddles reflecting city lights, dynamic pose, ultra-detailed cel shading.",
  "Retro-futuristic 1980s synthwave city skyline, deep purple sky with giant orange sun grid, palm trees silhouetted, chrome sports car parked under neon signs, vibrant magenta and cyan palette, vaporwave aesthetic, ultra-sharp digital illustration.",
  "Futuristic African queen warrior wearing gold nanotech armor with emerald highlights, holding a holographic spear, background of a high-tech throne room with glowing geometric patterns, dramatic spotlight, ultra-detailed fantasy realism.",
  "High-end product mockup of a transparent smartphone with holographic UI floating above the screen, clean white studio background, soft shadows, blue and silver futuristic UI elements, photorealistic commercial photography.",
  "Graffiti-covered cyberpunk subway train speeding through an underground tunnel, artwork featuring robotic lions and glitch typography, bold red and electric blue palette, sparks flying from tracks, motion blur effect, cinematic realism.",
  "Ultra-detailed space colony on Mars at sunrise, glass biodomes glowing warm yellow against red terrain, astronauts in sleek white suits walking toward a rover, dust particles in golden light, NASA-inspired realism, 16:9 wide shot.",
  "Corporate tech website hero image concept, diverse team of developers standing confidently in a dark studio, soft blue rim lighting, floating holographic code panels around them, minimal black and cobalt color scheme, sharp modern aesthetic.",
  "Surreal futuristic art piece of a giant chrome human head emerging from a desert, glowing cracks filled with neon purple light, floating geometric cubes orbiting around it, dramatic orange sky, ultra-high detail, cinematic composition.",
  "Streetwear fashion shoot in a futuristic Johannesburg rooftop setting, model wearing matte black jacket with LED trim, graffiti skyline in background, teal and burnt orange color scheme, high-fashion photography, shallow depth of field, ultra realistic 4k.",
  "A hyperrealistic oil painting of a cracked marble statue crying liquid chrome, set inside an abandoned brutalist museum, soft diffused skylight, muted grayscale palette with subtle cobalt accents, post-humanist sculpture aesthetic, ultra-detailed brush texture.",
  "A large-scale mixed-media collage of urban decay and blooming flowers, torn paper textures, rust tones and dusty rose palette, Bauhaus grid composition, photographed as if displayed in a contemporary gallery space.",
  "A surrealist portrait of a woman whose face dissolves into migrating birds, dramatic chiaroscuro lighting inspired by baroque painting, deep umber and crimson palette, painterly oil texture.",
  "A minimalist conceptual composition exploring negative space: a single red thread suspended in an all-white foggy room, cinematic soft lighting, medium format photography aesthetic.",
  "An abstract expressionist canvas with aggressive palette knife strokes, electric blue, cadmium yellow, and violent magenta splashes, thick impasto texture, 8K detail.",
  "A cyberpunk Johannesburg street scene after rain, neon signage reflecting in puddles, graffiti inspired by neo-expressionism, purple and teal color grading, 35mm film grain.",
  "A brutalist concrete apartment block overgrown with bioluminescent plants, dusk lighting, moody atmosphere, desaturated tones with glowing lime highlights, cinematic wide-angle lens.",
  "Double-exposure photography: a city skyline merged with transparent human lungs made of glass architecture, monochrome base with selective gold leaf accents, high contrast.",
  "A documentary-style portrait of a street vendor during golden hour, cinematic realism, warm terracotta palette, shallow depth of field, natural light photography.",
  "A symbolic still life: melting clocks submerged in water inside a glass cube, soft volumetric lighting, cool cyan and steel gray palette, ultra-detailed reflections.",
  "A Renaissance-style painting of a modern-day coder surrounded by floating holographic UI elements, dramatic baroque lighting, oil-on-canvas texture, rich shadow depth.",
  "A dreamlike scene of a staircase ascending into a sky filled with fragmented mirrors, pastel color palette, soft focus, ethereal atmosphere, subtle film grain.",
  "A self-portrait represented as fragmented geometric shapes, cubist influence, earthy ochre and forest green tones, textured canvas surface, layered composition.",
  "A fashion editorial shot where garments are made of liquid metal and smoke, high-contrast black and silver palette, avant-garde styling, studio lighting with hard shadows.",
  "A glitch-art reinterpretation of a classical Greek bust, RGB color separation, digital distortion artifacts, neon pink and cyan accents, high-resolution digital aesthetic.",
  "A charcoal drawing of intertwined hands morphing into tree roots, dramatic shadows, textured paper grain, monochrome fine art style.",
  "A performance-art-inspired image of a figure wrapped in translucent plastic suspended in a white cube gallery, soft shadows, conceptual commentary on consumerism, minimalist setting.",
  "A botanical illustration of fictional alien plants, scientific diagram style, muted sage and parchment tones, ink and watercolor hybrid technique, labeled details.",
  "A romantic-era landscape painting of a storm over the African savanna, dramatic clouds and golden lightning, painterly brushwork, epic scale composition.",
  "Macro photography of cracked paint revealing historical color layers beneath, shallow depth of field, poetic decay aesthetic, natural soft lighting.",
];

// const examplePrompts = [
//   "A cozy wooden cabin in a snowy forest at sunset, warm golden light glowing from the windows, soft snowfall, cinematic lighting, highly detailed",
//   "A futuristic city skyline at night with neon lights reflecting on wet streets, cyberpunk style, purple and blue color palette, ultra-detailed",
//   "A peaceful beach at sunrise with pastel pink and orange skies, gentle waves, soft clouds, wide-angle photography",
//   "A cute orange cat sitting on a windowsill during rain, raindrops on glass, soft natural lighting, shallow depth of field",
//   "A fantasy castle floating above the clouds, dramatic sky, glowing magical aura, epic concept art",
//   "A minimalist modern workspace with a laptop, coffee mug, and indoor plant, clean aesthetic, natural daylight, high resolution",
//   "A vibrant graffiti mural on a brick wall featuring abstract shapes and bold colors, street art style, high detail",
//   "A serene mountain landscape with a crystal-clear lake reflection, pine trees, blue sky, ultra-realistic photography",
//   "An astronaut standing on Mars looking at Earth in the sky, cinematic sci-fi style, detailed space suit, dramatic lighting",
//   "A vintage 1980s arcade room with neon lights and retro game machines, nostalgic atmosphere, rich colors, detailed environment",
// ];

export default function Index() {
  const [prompt, setPrompt] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [aspectRatio, setAspectRatio] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageURL, setImageURL] = useState<any>("");

  // Generate Prompt Function
  const generatePrompt = () => {
    const prompt =
      examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
    setPrompt(prompt);
  };

  const generateImage = async () => {
    // handle empty textarea:
    if (!prompt) {
      alert("Type something or hit the random create button.");
      return;
    }

    const selectedModel = model || modelData[0].value;

    if (!model) {
      setModel(selectedModel);
    }

    console.log(prompt + "\n----\n" + model + "\n----\n" + aspectRatio);
    setIsLoading(true);
    const MODEL_URL = `https://router.huggingface.co/hf-inference/models/${selectedModel}`;
    const { width, height } = getImageDimensions(aspectRatio);
    console.log("width: ", width);
    console.log("Height: ", height);
    // const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
    const API_KEY = "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";
    console.log("API KEY: ", API_KEY);

    try {
      const response = await fetch(MODEL_URL, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: prompt,
          parameters: { width, height },
        }),
      });

      // This might throw an error! Funny! An error that gives an error :)
      if (!response) {
        throw new Error((await (response as any).json()).message);
      }

      const blob = await response.blob(); // get the blob
      console.log(blob);

      // get a fileReaderInstance
      const fileReaderInstance = new FileReader();
      fileReaderInstance.readAsDataURL(blob);
      fileReaderInstance.onload = () => {
        const base64Data = fileReaderInstance.result;
        setImageURL(base64Data);
        setIsLoading(false);
        console.log("IMAGE URL: ", base64Data);
      };
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownload = async () => {
    // const base64Code = imageURL.split("data:image/jpeg;base64,")[1];
    const base64Code = imageURL.split("base64,")[1];
    const date = moment().format("YYYYMMDDhhmmss"); //use this as file name

    try {
      const filename = FileSystem.documentDirectory + `${date}.jpeg`; // try the newer API `Paths.document`. Import `Paths` from 'expo-file-system'
      await FileSystem.writeAsStringAsync(filename, base64Code, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // save the file
      await MediaLibrary.saveToLibraryAsync(filename);
      alert("Downloaded Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  // This might not work because look at the date/name.
  // You are recreating the name so when you look for it in the galary you won't find it...
  // The dates are different hence the saved file is named different to the search string name.
  const handleSharing = async () => {
    const base64Code = imageURL.split("base64,")[1];
    const date = moment().format("YYYYMMDDhhmmss"); //use this as file name

    try {
      const filename = FileSystem.documentDirectory + `${date}.jpeg`; // try the newer API `Paths.document`. Import `Paths` from 'expo-file-system'
      await FileSystem.writeAsStringAsync(filename, base64Code, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Share the file
      Sharing.shareAsync(filename);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Stack.Screen for the Header */}
      {/* <Stack.Screen
        options={{
          title: "AI Image Generator",
          headerStyle: { backgroundColor: Colors.background },
          headerTitleStyle: { color: Colors.text },
        }}
      /> */}
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: Colors.background,
            // padding: 10,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            // gap: 100,
            borderBottomWidth: 0,
            paddingLeft: 80,
            paddingRight: 80,
            paddingTop: 20,
          }}
        >
          <Image
            source={require("@/ai.png")}
            style={{ width: 50, height: 50 }}
          />
          <Text
            style={{ color: Colors.text, fontSize: 20, fontWeight: "bold" }}
          >
            Image Generator
          </Text>
        </View>
        <View style={styles.container}>
          <ScrollView>
            {/* Wrap the textInput in a view to allow the dice icon in the text area.. */}
            <View style={{ height: 150 }}>
              {/* create a text area section for input */}
              <TextInput
                placeholder="Describe your imagination in detail..."
                placeholderTextColor={Colors.placeholder}
                style={styles.inputField}
                numberOfLines={3}
                multiline={true}
                value={prompt}
                onChangeText={(text) => setPrompt(text)}
              />
              {/* Add the dice button using TouchableOpacity */}
              <TouchableOpacity style={styles.ideaBtn} onPress={generatePrompt}>
                {/* import icon from font-awesome */}
                <FontAwesome5 name="dice" size={20} color={Colors.black} />
              </TouchableOpacity>
            </View>

            {/* AI Model Dropdown */}
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={modelData}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select AI Model"
              value={model === "" ? modelData[0].value : model}
              onChange={(item) => {
                setModel(item.value);
              }}
            />

            {/* Aspect Ratio Dropdown */}
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={aspectRatioData}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select Aspect Ratio"
              value={aspectRatio}
              onChange={(item) => {
                setAspectRatio(item.value);
              }}
            />

            {/* Submit button */}
            <TouchableOpacity style={styles.button} onPress={generateImage}>
              <Text style={styles.btnText}>Generate</Text>
            </TouchableOpacity>

            {isLoading && (
              <View
                style={[styles.imageContainer, { justifyContent: "center" }]}
              >
                {/* Display the loader */}
                <ActivityIndicator size={"large"} />
              </View>
            )}

            {!isLoading && imageURL && (
              <>
                <View style={styles.imageContainer}>
                  {/* <Image source={require("@/sample-image.jpg")} style={styles.image} /> */}
                  <Image source={{ uri: imageURL }} style={styles.image} />
                </View>

                <View style={styles.buttonContainer}>
                  {/* Download button */}
                  <TouchableOpacity
                    style={styles.downloadBtn}
                    onPress={handleDownload}
                  >
                    <FontAwesome5 name="download" size={20} />
                  </TouchableOpacity>

                  {/* Share button */}
                  <TouchableOpacity
                    style={styles.downloadBtn}
                    onPress={handleSharing}
                  >
                    <FontAwesome5 name="share" size={20} />
                  </TouchableOpacity>
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
  },
  inputField: {
    backgroundColor: Colors.dark,
    padding: 20,
    borderRadius: 10,
    borderColor: Colors.accent,
    borderWidth: StyleSheet.hairlineWidth,
    fontSize: 16,
    fontWeight: 500,
    letterSpacing: 0.2,
    height: 150,
    color: Colors.text,
  },
  ideaBtn: {
    backgroundColor: Colors.accent,
    padding: 8,
    borderRadius: "50%",
    alignSelf: "flex-end",
    // position: "relative",
    position: "absolute",
    // bottom: 60,
    bottom: 20,
    right: 20,
  },
  dropdown: {
    marginTop: 20,
    height: 50,
    backgroundColor: Colors.dark,
    borderRadius: 10,
    borderColor: Colors.accent,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 12,
  },
  placeholderStyle: {
    fontSize: 16,
    color: Colors.placeholder,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: Colors.text,
  },
  button: {
    backgroundColor: Colors.accent,
    padding: 12,
    marginTop: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: {
    color: Colors.black,
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: 1.2,
  },
  imageContainer: {
    height: 300,
    // width: windowWidth - 40,
    width: "auto",
    marginTop: 20,
    borderRadius: 10,
    borderColor: Colors.accent,
    borderWidth: StyleSheet.hairlineWidth,
  },
  image: {
    flex: 1,
    resizeMode: "contain",
    width: "100%",
  },
  downloadBtn: {
    height: 45,
    width: 45,
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-evenly",
  },
});
