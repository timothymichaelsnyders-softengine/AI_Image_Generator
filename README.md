# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

---

## Start

---

# Front-End

---

- (edit the `index.tsx` file only)

> We need to install an additional package: `npm install react-native-element-dropdown --save`
> Import it `import { Dropdown } from 'react-native-element-dropdown'`

- Create the dataset in an array of objects:
  const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
  ];

- Next Place the component under the nested view:
  <Dropdown
  style={styles.dropdown}
  placeholderStyle={styles.placeholderStyle}
  selectedTextStyle={styles.selectedTextStyle}
  data={data}
  maxHeight={300}
  labelField="label"
  valueField="value"
  placeholder={"Select item"}
  value={value}
  onChange={(item) => {
  setValue(item.value);
  }}
  />

> Include the value variable:
> `const [value, setValue] = useState(null);`

- Create the styles [dropdown, placeholderStyle & selectedTextStyle]
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

> Edit the data to be used in the dropdown.

> Change the `value` variable to `model`: const [model, setModel] = useState<string>("");

> And the `data` array of objects, rename it to `modelData`.
> Now in the `Dropdown` component, the value will be set to `{model}` and for `onChange` we will `setModel`.

> Create another dropdown component for `Aspect Ratio Dropdown`.
> Create the `aspectRatioData` object array.

# The submit button

---

- Underneath the last dropdown, create a button `TouchableOpacity`.
  <TouchableOpacity style={styles.button} onPress={() => {}}>
  <Text style={styles.btnText}>Generate</Text>
  </TouchableOpacity>

> Create the missing styles [button, btnText]

> Create a state `isLoading` : const [isLoading, setIsLoading] = useState<boolean>(false);

> Create the `View` and `Image` component where the image will be generated.
> As a temp solution, just use a sample-image.jpg while developing the AI generated image.

<View style={styles.imageContainer}>
   <Image source={require("@sample-image.jpg")} style={styles.image} />
</View>

> Create the missing styles [imageContainer,image]

> Create the `View` that will contain the two buttons [download, share]:

<View style={styles.buttonContainer}>
   {/* Download button */}
   <TouchableOpacity style={styles.downloadBtn} onPress={() => {}}>
   <FontAwesome5 name="download" size={20} />
   </TouchableOpacity>

{/_ Share button _/}
<TouchableOpacity style={styles.downloadBtn} onPress={() => {}}>
<FontAwesome5 name="share" size={20} />
</TouchableOpacity>
</View>

> Create the styles for the buttons and the container that holds them:

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

# Backend (implementation)

---

# Randomize btn

- get a couple of examplePrompts. Get them from AI and ask it to put it in a JSON array for you.
- Save them in a variable called `examplePrompts`.
- Create a `prompt` state variable to store the prompt.
- To get a different examplePrompt everytime we click the random button, we need this formula:
  > const prompt = examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
  > Specifically this part `Math.floor(Math.random() * examplePrompts.length)`
- The generatePrompt function:

const generatePrompt = () => {
const prompt =
examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
setPrompt(prompt);
};

- Make sure that you set the text in the Textinput everytime the text changes:

<View>
   <TextInput
      placeholder="Describe your imagination in detail..."
      placeholderTextColor={Colors.placeholder}
      style={styles.inputField}
      numberOfLines={3}
      multiline={true}
      value={prompt}
      onChangeText={(text) => setPrompt(text)}
   />

   <TouchableOpacity style={styles.ideaBtn} onPress={generatePrompt}>
      {/* import icon from font-awesome */}
      <FontAwesome5 name="dice" size={20} color={Colors.black} />
   </TouchableOpacity>
</View>

# AI Generation

---

- Now create the `generateImage` function...
- Go to 'huggingface.co'
- Sign up/Login
- Goto `Models` section. Look for `Text-to-Image` select button.
- Look for:
  > black-forest-labs/FLUX.1-dev
- Goto the `Docs` for this model.
- Go to the `Inference Providers` section.
- Go to `Text to Image` on the side bar.
- Select `javascript` instead of `python`.
- Select `HF Inference API` as Provider.
- Make sure to select `fetch` for API.

- Create a `helpers.ts` file to be able to get the width and height from the aspect ratio value.

- Export the getImageDimensions function.

- Create a new API KEY on the platform `huggingface.co`.
  > Token Name : ai-image-generator-simple-react-native
  > Type `Read`.
- Create a `.env` file and paste the API key in there in "'".
- Once you get a response from the API, you need to get the `blob` data. More specifically, the `base64` data from the `blob`.
- Create a variable to store this data:
  > const [imageURL, setImageURL] = useState<any>("");
- Create a fileReaderInstance:
  > const fileReaderInstance = new FileReader();
- Read the `base64data` from the blob:

fileReaderInstance.readAsDataURL(blob);
fileReaderInstance.onload = () => {
const base64Data = fileReaderInstance.result;
setImageURL(base64Data);
console.log("IMAGE URL: ", base64Data);
};

- Set the isLoading variable to true when image is being generated, and false when delivered.

- Set the `uri` of the Image component to the `imageURL` generated by the AI model.
  > <Image source={{ uri: imageURL }} style={styles.image} />

# Downloading the image

---

- Install `Expo FileSystem` first:
  > npx expo install expo-file-system
- Install `Expo MediaLibrary`:
  > npx expo install expo-media-library
- Install Expo Sharing:
  > npx expo install expo-sharing
- Install `Moment.js`:
  > npm install moment --save
- Import all these packages that we've installed:
  > import \* as MediaLibrary from "expo-media-library";
  > import \* as FileSystem from "expo-file-system";
  > import moment from "moment";
  > import \* as Sharing from "expo-sharing";

# Handle Download

- Create a function called `handleDownload`.
- We need the base64 code.
- We need the filename (we'll use moment.js for this - generate a filename using date).
- Use the FileSystem.writeAsStringAsync() to download the file. Parameters:
  > filename
  > base64Code
  > {encoding: FileSystem.EncodingType.Base64}
- use MediaLibrary.saveToLibraryAsync() to save to gallary. Parameters:
  > filename

# Sharing the file

---

- It is the same as the download functionality, but instead of downloading and saving... Share it.
  > import \* as Sharing from "expo-sharing";
- In function, share and not save:

  > Sharing.shareAsync(filename)

- Add the handleSharing() function to the `onPress` Event.
