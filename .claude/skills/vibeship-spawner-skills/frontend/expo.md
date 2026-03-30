# Expo

> Expert in Expo for React Native development. Covers Expo Router, EAS Build and Submit,
development builds, native module integration, and production deployment. Knows how to
build cross-platform mobile apps efficiently while maintaining access to native capabilities.


**Category:** frontend | **Version:** 1.0.0

**Tags:** expo, react-native, mobile, ios, android, eas, cross-platform

---

## Identity

[object Object]

## Expertise Areas

- Expo SDK and APIs
- Expo Router navigation
- EAS Build and Submit
- Development builds
- Config plugins
- App configuration
- OTA updates
- Native module integration

## Patterns

### Project Setup
Create and configure Expo project
```
# Create new project with Expo Router
npx create-expo-app@latest my-app --template tabs

# Project structure
my-app/
├── app/                 # Expo Router pages
│   ├── (tabs)/         # Tab navigator group
│   │   ├── index.tsx   # First tab
│   │   ├── explore.tsx # Second tab
│   │   └── _layout.tsx # Tab layout
│   ├── _layout.tsx     # Root layout
│   └── +not-found.tsx  # 404 page
├── components/         # Reusable components
├── constants/          # App constants
├── hooks/              # Custom hooks
├── assets/             # Images, fonts
├── app.json           # Expo config
└── eas.json           # EAS Build config

# app.json configuration
{
  "expo": {
    "name": "My App",
    "slug": "my-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "scheme": "myapp",  // For deep linking
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "bundleIdentifier": "com.company.myapp",
      "supportsTablet": true
    },
    "android": {
      "package": "com.company.myapp",
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    },
    "plugins": [
      "expo-router"
    ]
  }
}

```

### Expo Router Navigation
File-based routing for React Native
```
// app/_layout.tsx - Root layout
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
    </Stack>
  );
}

// app/(tabs)/_layout.tsx - Tab layout
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#007AFF" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

// Navigation between screens
import { Link, router } from "expo-router";

// Link component
<Link href="/profile">Go to Profile</Link>

// Programmatic navigation
router.push("/profile");
router.replace("/home");
router.back();

// Dynamic routes: app/user/[id].tsx
import { useLocalSearchParams } from "expo-router";

export default function UserPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <Text>User: {id}</Text>;
}

// Navigate with params
router.push({ pathname: "/user/[id]", params: { id: "123" } });

// Typed routes with expo-router/typed-routes
// tsconfig.json: "include": [".expo/types/**/*.ts", ...]

```

### EAS Build Configuration
Set up cloud builds
```
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure EAS
eas build:configure

# eas.json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "simulator": true
      }
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "autoIncrement": true
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "your@email.com",
        "ascAppId": "1234567890"
      },
      "android": {
        "serviceAccountKeyPath": "./google-services.json"
      }
    }
  }
}

# Build commands
eas build --platform ios --profile development
eas build --platform android --profile preview
eas build --platform all --profile production

# Submit to stores
eas submit --platform ios --profile production
eas submit --platform android --profile production

# Or build and submit together
eas build --platform all --profile production --auto-submit

```

### Development Build with Native Modules
Use native modules with Expo
```
# Why development builds?
# - Expo Go has limited native modules
# - Development builds are YOUR custom Expo Go
# - Add any native library you need

# Install native module
npx expo install expo-camera

# Some libraries need config plugins
npx expo install react-native-ble-plx

# app.json with config plugins
{
  "expo": {
    "plugins": [
      "expo-camera",
      [
        "react-native-ble-plx",
        {
          "isBackgroundEnabled": true,
          "modes": ["peripheral", "central"]
        }
      ],
      [
        "expo-build-properties",
        {
          "ios": {
            "deploymentTarget": "15.0"
          },
          "android": {
            "compileSdkVersion": 34
          }
        }
      ]
    ]
  }
}

# Build development client
eas build --platform ios --profile development
# Or for simulator
eas build --platform ios --profile development --local

# Install on device/simulator
# iOS: drag .app to simulator
# Android: adb install app.apk

# Start dev server
npx expo start --dev-client

# Custom config plugin (for advanced cases)
// plugins/with-custom-config.js
const { withAppDelegate } = require("expo-build-properties");

module.exports = function withCustomConfig(config) {
  return withAppDelegate(config, async (config) => {
    // Modify native code
    return config;
  });
};

```

### EAS Update (OTA Updates)
Deploy updates without app store review
```
# Configure updates in app.json
{
  "expo": {
    "runtimeVersion": {
      "policy": "appVersion"  // or "sdkVersion", "fingerprint"
    },
    "updates": {
      "url": "https://u.expo.dev/your-project-id"
    }
  }
}

# eas.json - add channel to builds
{
  "build": {
    "production": {
      "channel": "production"
    },
    "preview": {
      "channel": "preview"
    }
  }
}

# Publish update
eas update --channel production --message "Fix login bug"

# Check updates in app
import * as Updates from "expo-updates";

async function checkForUpdates() {
  try {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();  // Restart app with update
    }
  } catch (e) {
    console.log("Update check failed:", e);
  }
}

// Run on app start
useEffect(() => {
  if (!__DEV__) {
    checkForUpdates();
  }
}, []);

# Rollback if needed
eas update:rollback --channel production

# View update history
eas update:list

```

### Performance Optimization
Optimize Expo app performance
```
// 1. Use FlashList instead of FlatList
import { FlashList } from "@shopify/flash-list";

<FlashList
  data={items}
  renderItem={({ item }) => <ItemComponent item={item} />}
  estimatedItemSize={100}  // Required!
/>

// 2. Memoize expensive components
import { memo, useMemo, useCallback } from "react";

const ExpensiveItem = memo(({ item, onPress }) => {
  // Only re-renders if item or onPress changes
  return <Pressable onPress={onPress}>...</Pressable>;
});

// Parent component
const handlePress = useCallback((id) => {
  // Stable function reference
}, []);

// 3. Optimize images
import { Image } from "expo-image";

<Image
  source={{ uri: imageUrl }}
  style={{ width: 200, height: 200 }}
  contentFit="cover"
  placeholder={blurhash}  // Show placeholder while loading
  transition={200}
/>

// 4. Reduce re-renders with selectors
import { useStore } from "./store";

// BAD - re-renders on any store change
const { user } = useStore();

// GOOD - only re-renders when user changes
const user = useStore((state) => state.user);

// 5. Lazy load screens
import { lazy, Suspense } from "react";

const HeavyScreen = lazy(() => import("./HeavyScreen"));

<Suspense fallback={<LoadingSpinner />}>
  <HeavyScreen />
</Suspense>

// 6. Use native driver for animations
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const offset = useSharedValue(0);

const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ translateX: offset.value }],
}));

// 7. Profile with React DevTools
// Enable in development to find slow components

```


## Anti-Patterns

### Using Expo Go for Everything
Not using development builds when needed
**Why it's bad:** Limited native modules.
Can't test production features.
Frustrating native library issues.


### Ignoring Bundle Size
Not monitoring app size
**Why it's bad:** Slow downloads.
App store rejection risk.
Poor user experience.


### Not Using Expo Image
Using React Native Image for remote images
**Why it's bad:** No caching.
Poor performance.
Missing features.


### Hardcoded Environment Values
API keys in code
**Why it's bad:** Security risk.
Can't change per environment.
Exposed in build.



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [HIGH] Native module not working in Expo Go

**Situation:** Library crashes or doesn't load in Expo Go

**Why it happens:**
Expo Go has fixed native modules.
Custom native code needs dev build.
Some libraries need config plugins.


**Solution:**
```
# Check if library needs native code
# Look for "native" or "pod" in installation docs

# Option 1: Use Expo-compatible alternative
# BAD
npm install react-native-ble-plx
# GOOD
npx expo install expo-bluetooth  # If available

# Option 2: Create development build
# Install the library
npx expo install react-native-ble-plx

# Add config plugin if needed (check library docs)
// app.json
{
  "expo": {
    "plugins": ["react-native-ble-plx"]
  }
}

# Build development client
eas build --platform ios --profile development

# Install on device
# Then run: npx expo start --dev-client

# Check Expo compatibility
# https://reactnative.directory/?expo=true

# Common libraries that need dev builds:
# - react-native-ble-plx
# - react-native-maps (with custom config)
# - react-native-video
# - Any library with native code not in Expo SDK

```

**Symptoms:**
- Native module not found
- App crashes on import
- White screen on device

---

### [HIGH] Build fails with signing/credentials error

**Situation:** EAS build fails on iOS or Android

**Why it happens:**
Missing or expired certificates.
Wrong provisioning profile.
Keystore issues.


**Solution:**
```
# iOS: Let EAS manage credentials (recommended)
eas credentials

# Or configure manually
eas build:configure

# Clear credentials and regenerate
eas credentials --platform ios
# Select "Remove" then build again

# Android: Set up keystore
eas credentials --platform android
# EAS can generate or you can provide existing

# For App Store submission
# Need Apple Developer account ($99/year)
# EAS creates certificates automatically

# Common fixes:
# 1. Expired certificate: regenerate in eas credentials
# 2. Wrong bundle ID: check app.json bundleIdentifier
# 3. Team mismatch: verify Apple Developer account

# eas.json for manual credentials
{
  "build": {
    "production": {
      "ios": {
        "credentialsSource": "local",
        "provisioningProfilePath": "./certs/profile.mobileprovision",
        "distributionCertificate": {
          "path": "./certs/dist.p12",
          "password": "@env:CERT_PASSWORD"
        }
      }
    }
  }
}

```

**Symptoms:**
- No matching provisioning profile
- Code signing error
- Keystore not found

---

### [MEDIUM] Changes not reflected, weird behavior

**Situation:** App shows old code or crashes unexpectedly

**Why it happens:**
Metro bundler caches aggressively.
Node modules cache stale.
Watchman has old state.


**Solution:**
```
# Clear Metro cache
npx expo start --clear

# Full cache clear
rm -rf node_modules
rm -rf .expo
npm install
npx expo start --clear

# Clear watchman (macOS)
watchman watch-del-all

# Reset Metro bundler
npx react-native start --reset-cache

# For persistent issues
rm -rf ~/Library/Developer/Xcode/DerivedData  # iOS
rm -rf android/.gradle  # Android

# Clear EAS build cache (for builds)
eas build --clear-cache --platform ios

# Useful script in package.json
{
  "scripts": {
    "clean": "rm -rf node_modules .expo && npm install && npx expo start --clear"
  }
}

```

**Symptoms:**
- Old code still running
- Unable to resolve module
- Random crashes after update

---

### [MEDIUM] Deep links don't open app

**Situation:** URLs don't navigate to correct screen

**Why it happens:**
Missing scheme in app.json.
Associated domains not configured.
Wrong path pattern.


**Solution:**
```
# 1. Configure scheme in app.json
{
  "expo": {
    "scheme": "myapp",  // For myapp://
    "ios": {
      "bundleIdentifier": "com.company.myapp",
      "associatedDomains": ["applinks:myapp.com"]
    },
    "android": {
      "package": "com.company.myapp",
      "intentFilters": [
        {
          "action": "VIEW",
          "autoVerify": true,
          "data": [
            { "scheme": "https", "host": "myapp.com" }
          ],
          "category": ["BROWSABLE", "DEFAULT"]
        }
      ]
    }
  }
}

# 2. Handle in Expo Router (automatic!)
# Links map to files:
# myapp://user/123 → app/user/[id].tsx
# https://myapp.com/product/456 → app/product/[id].tsx

# 3. Test deep links
# iOS Simulator
xcrun simctl openurl booted "myapp://user/123"

# Android Emulator
adb shell am start -a android.intent.action.VIEW -d "myapp://user/123"

# 4. Handle link in app
import { useURL } from "expo-linking";
import { router } from "expo-router";

function App() {
  const url = useURL();

  useEffect(() => {
    if (url) {
      // Expo Router handles this automatically
      // Manual handling if needed:
      const { path, queryParams } = Linking.parse(url);
      router.push(path);
    }
  }, [url]);
}

# 5. For universal links (iOS) - need AASA file
# Host at: https://myapp.com/.well-known/apple-app-site-association
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "TEAMID.com.company.myapp",
        "paths": ["/user/*", "/product/*"]
      }
    ]
  }
}

```

**Symptoms:**
- Links open browser instead of app
- Wrong screen after link
- No route found

---

### [MEDIUM] EAS Update published but app doesn't update

**Situation:** Old version still showing after update

**Why it happens:**
Wrong channel.
Runtime version mismatch.
Update not fetched.


**Solution:**
```
# 1. Check runtime version matches
# app.json
{
  "expo": {
    "runtimeVersion": "1.0.0"  // Must match built app
  }
}

# Or use policy (recommended)
{
  "expo": {
    "runtimeVersion": {
      "policy": "appVersion"  // Uses version field
    }
  }
}

# 2. Check channel matches
# eas.json
{
  "build": {
    "production": {
      "channel": "production"  // Must match update channel
    }
  }
}

# Publish to correct channel
eas update --channel production

# 3. Force update check in app
import * as Updates from "expo-updates";

async function forceUpdate() {
  if (__DEV__) return;  // No updates in dev

  try {
    const update = await Updates.checkForUpdateAsync();
    console.log("Update available:", update.isAvailable);

    if (update.isAvailable) {
      const result = await Updates.fetchUpdateAsync();
      console.log("Update fetched:", result);

      // Reload to apply
      await Updates.reloadAsync();
    }
  } catch (e) {
    console.error("Update error:", e);
  }
}

# 4. Debug update status
console.log("Update channel:", Updates.channel);
console.log("Runtime version:", Updates.runtimeVersion);
console.log("Is embedded:", Updates.isEmbeddedLaunch);

# 5. Verify update published
eas update:list --channel production

```

**Symptoms:**
- App shows old version
- No update available
- Update fetched but not applied

---

### [MEDIUM] Android build runs out of memory

**Situation:** EAS Build fails with memory error

**Why it happens:**
Default Gradle memory too low.
Large assets.
Many dependencies.


**Solution:**
```
# Increase Gradle memory
// app.json
{
  "expo": {
    "plugins": [
      [
        "expo-build-properties",
        {
          "android": {
            "extraMavenRepos": [],
            "extraProguardRules": "",
            "enableProguardInReleaseBuilds": true
          }
        }
      ]
    ]
  }
}

# android/gradle.properties (if bare workflow)
org.gradle.jvmargs=-Xmx4096m -XX:MaxPermSize=512m

# Use EAS large workers
// eas.json
{
  "build": {
    "production": {
      "android": {
        "resourceClass": "large"  // More memory
      }
    }
  }
}

# Optimize assets
npx expo-optimize  # Compresses images

# Enable Proguard (shrinks app)
// app.json plugins
[
  "expo-build-properties",
  {
    "android": {
      "enableProguardInReleaseBuilds": true
    }
  }
]

```

**Symptoms:**
- OutOfMemoryError
- GC overhead limit exceeded
- Build killed

---

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `firebase|fcm|firestore` | firebase | Need Firebase in Expo app |
| `state management|redux|zustand` | react-patterns | Need state management patterns |
| `api|graphql|rest` | backend | Need API for mobile app |
| `auth|login|oauth` | supabase-backend | Need auth for mobile app |

### Receives Work From

- **react-patterns**: Building React Native components
- **nextjs-app-router**: Web to mobile migration
- **firebase**: Mobile app with Firebase

### Works Well With

- react-patterns
- typescript
- firebase

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/frontend/expo/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
