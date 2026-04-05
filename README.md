# FitLocal

Personalized nutrition + workout planning platform based on your gym and supermarket.

## Two Projects

- **Web App** (`/`) - Next.js 14 web application
- **Mobile App** (`/FitLocalMobile`) - React Native with Expo

## Features

- **Body Composition Calculator** - Calculate macros based on height, weight, body fat %, and target body fat %
- **Gym-Specific Workouts** - Workout plans matched to equipment at your gym chain
- **Smart Food Suggestions** - Daily/weekly food recommendations to hit your protein targets
- **Shopping Lists** - Generate shopping lists with direct links to add items to cart

## Tech Stack

| Platform | Technology |
|----------|------------|
| Web | Next.js 14 (App Router), Tailwind CSS |
| Mobile | React Native (Expo) |
| Data | USDA FoodData Central, ExerciseDB, Instacart API |

## Web App

```bash
cd fitlocal
npm install
npm run dev
```

## Mobile App (iOS Without a Mac)

Since we don't have a Mac, we use **EAS Build** to build iOS in the cloud.

```bash
cd FitLocalMobile

# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build iOS in the cloud
eas build --platform ios --profile preview

# Or build Android APK
eas build --platform android
```

See `FitLocalMobile/README.md` for detailed instructions.

## Data Sources

- **Nutrition:** USDA FoodData Central API (free)
- **Exercises:** ExerciseDB API (free)
- **Shopping:** Instacart Platform API

## License

MIT
