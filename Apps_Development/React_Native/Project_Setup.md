Here's a step-by-step guide to setting up a React Native project using Expo, which is beginner-friendly:

### 1. **Install Node.js**

- Ensure you have Node.js installed. You can check by running:

````bash
  node -v
    ```
  - If not installed, download and install it from [Node.js](https://nodejs.org/).

### 2. **Install Expo CLI**
  - Expo CLI is a tool to help you quickly set up and run React Native projects.
  - Install Expo CLI globally using npm:
```bash
  npm install -g expo-cli
    ```

### 3. **Create a New React Native Project**
  - Use the Expo CLI to create a new project
````

npx create-expo-app MyFirstApp

````

   - You'll be prompted to choose a template. Select "blank" to start with a basic template.
   - Navigate into your project directory:
```bash
  cd MyFirstApp
````

### 4. **Run the App**

- Start the development server:

```
  npx expo start
```

- This will open a browser window with the Expo Developer Tools.
- You can run your app on a physical device using the Expo Go app (available on both Android and iOS). Simply scan the QR code shown in your terminal or browser.
- Alternatively, you can run the app on an emulator:
  - **For Android**: Click "Run on Android device/emulator" in the Expo Developer Tools.
  - **For iOS**: Click "Run on iOS simulator" if you're on macOS.

### 5. **Install Essential Libraries**

- Install React Navigation for handling navigation between screens:

````bash
  npm install @react-navigation/native
    ```
  - Install the required dependencies:
```bash
  npm install react-native-screens react-native-safe-area-context
   ```

### 6. **Set Up Navigation**
  - Create a `navigation` folder in your project.
  - Inside, create a `MainStackNavigator.js` file:
    ```javascript
    import React from 'react';
    import { NavigationContainer } from '@react-navigation/native';
    import { createStackNavigator } from '@react-navigation/stack';
    import HomeScreen from './screens/HomeScreen'; // Create this screen in the next step
    import DetailsScreen from './screens/DetailsScreen'; // Create this screen in the next step

    const Stack = createStackNavigator();

    function MainStackNavigator() {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    export default MainStackNavigator;
    ```

### 7. **Create Screens**
  - Create a `screens` folder in your project.
  - Inside the `screens` folder, create two files: `HomeScreen.js` and `DetailsScreen.js`.

  **HomeScreen.js**:
  ```javascript
  import React from 'react';
  import { View, Text, Button } from 'react-native';

  export default function HomeScreen({ navigation }) {
    return (
      <View>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
        />
      </View>
    );
  }
````

**DetailsScreen.js**:

```javascript
import React from "react";
import { View, Text } from "react-native";

export default function DetailsScreen() {
  return (
    <View>
      <Text>Details Screen</Text>
    </View>
  );
}
```

### 8. **Link Navigation to the App**

- Open `App.js` and replace its content with the following to link your navigation stack:

  ```javascript
  import React from "react";
  import MainStackNavigator from "./navigation/MainStackNavigator";

  export default function App() {
    return <MainStackNavigator />;
  }
  ```

### 9. **Run the App**

- Make sure your development server is running:
  ```bash
  expo start
  ```
- Open the app on your device or simulator to see the Home screen with a button that navigates to the Details screen.

### 10. **Customize and Extend**

- Start adding more screens, components, and features to your app.
- Explore adding UI libraries like React Native Paper or custom styling with Tailwind CSS.
