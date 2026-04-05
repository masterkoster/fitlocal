# FitLocal

Personalized nutrition + workout planning platform based on your gym and supermarket.

## Features

- **Body Composition Calculator** - Calculate macros based on height, weight, body fat %, and target body fat %
- **Gym-Specific Workouts** - Workout plans matched to equipment at your gym chain
- **Smart Food Suggestions** - Daily/weekly food recommendations to hit your protein targets
- **Shopping Lists** - Generate shopping lists with direct links to add items to cart

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Mobile:** React Native (Expo)
- **Database:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS

## Data Sources

- **Nutrition:** USDA FoodData Central API (free)
- **Exercises:** ExerciseDB API (free)
- **Shopping:** Instacart Platform API

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/             # React components
├── lib/                   # Utility functions
├── data/                  # Static data (gyms, stores, exercises)
└── types/                 # TypeScript type definitions
```

## License

MIT
