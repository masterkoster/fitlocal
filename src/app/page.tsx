'use client';

import { useState } from 'react';
import { UserProfile, BodyMetrics, WorkoutPlan, DailyMealPlan, ShoppingList } from '@/types';
import { calculateBodyMetrics, getGoalDescription, calculateWeeklyProtein } from '@/lib/calculations';
import { generateWorkoutPlan, getWorkoutStats } from '@/lib/workoutGenerator';
import { generateWeeklyMealPlan, generateShoppingList, formatForInstacart } from '@/lib/foodGenerator';
import { gymChains } from '@/data/gyms';
import { stores } from '@/data/stores';

type Step = 'profile' | 'gym-store' | 'results';

export default function Home() {
  const [step, setStep] = useState<Step>('profile');
  
  const [profile, setProfile] = useState<UserProfile>({
    height: { feet: 5, inches: 10 },
    weight: 160,
    age: 25,
    sex: 'male',
    currentBodyFat: 20,
    targetBodyFat: 15,
    activityLevel: 'moderate',
    goal: 'lean_bulk',
  });

  const [selectedGym, setSelectedGym] = useState('planet_fitness');
  const [selectedStore, setSelectedStore] = useState('kroger');
  const [metrics, setMetrics] = useState<BodyMetrics | null>(null);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [weeklyMeals, setWeeklyMeals] = useState<DailyMealPlan[] | null>(null);
  const [shoppingList, setShoppingList] = useState<ShoppingList | null>(null);
  const [activeTab, setActiveTab] = useState<'workout' | 'food' | 'shop'>('workout');

  const calculateResults = () => {
    const bodyMetrics = calculateBodyMetrics(profile);
    setMetrics(bodyMetrics);
    setWorkoutPlan(generateWorkoutPlan({ gymId: selectedGym, daysPerWeek: 6, difficulty: 'intermediate' }));
    const meals = generateWeeklyMealPlan(bodyMetrics.macros);
    setWeeklyMeals(meals);
    setShoppingList(generateShoppingList(meals));
    setStep('results');
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900">FitLocal</h1>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Progress */}
        <div className="flex items-center justify-center mb-8 gap-4">
          <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step !== 'profile' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>1</span>
          <div className="w-8 h-px bg-gray-300" />
          <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step === 'results' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>2</span>
          <div className="w-8 h-px bg-gray-300" />
          <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step === 'results' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>3</span>
        </div>

        {/* Step 1: Profile */}
        {step === 'profile' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Tell us about yourself</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Height</label>
                <div className="flex gap-2">
                  <select value={profile.height.feet} onChange={e => setProfile({...profile, height: {...profile.height, feet: +e.target.value}})} className="flex-1 px-3 py-2 border rounded-lg">
                    {[4,5,6,7].map(f => <option key={f} value={f}>{f} ft</option>)}
                  </select>
                  <select value={profile.height.inches} onChange={e => setProfile({...profile, height: {...profile.height, inches: +e.target.value}})} className="flex-1 px-3 py-2 border rounded-lg">
                    {Array.from({length: 12}, (_, i) => i).map(i => <option key={i} value={i}>{i} in</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Weight (lbs)</label>
                <input type="number" value={profile.weight} onChange={e => setProfile({...profile, weight: +e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Age</label>
                <input type="number" value={profile.age} onChange={e => setProfile({...profile, age: +e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Sex</label>
                <select value={profile.sex} onChange={e => setProfile({...profile, sex: e.target.value as 'male' | 'female'})} className="w-full px-3 py-2 border rounded-lg">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm text-gray-600 mb-1">Activity Level</label>
              <select value={profile.activityLevel} onChange={e => setProfile({...profile, activityLevel: e.target.value as any})} className="w-full px-3 py-2 border rounded-lg">
                <option value="sedentary">Sedentary</option>
                <option value="light">Light (1-3x/week)</option>
                <option value="moderate">Moderate (3-5x/week)</option>
                <option value="active">Active (6-7x/week)</option>
                <option value="very_active">Very Active</option>
              </select>
            </div>

            <div className="mb-6">
              <div className="flex justify-between mb-1">
                <label className="text-sm text-gray-600">Current Body Fat %</label>
                <span className="font-semibold text-blue-600">{profile.currentBodyFat}%</span>
              </div>
              <input type="range" min="5" max="40" value={profile.currentBodyFat} onChange={e => setProfile({...profile, currentBodyFat: +e.target.value})} className="w-full accent-blue-600" />
            </div>

            <div className="mb-6">
              <div className="flex justify-between mb-1">
                <label className="text-sm text-gray-600">Target Body Fat %</label>
                <span className="font-semibold text-green-600">{profile.targetBodyFat}%</span>
              </div>
              <input type="range" min="5" max="35" value={profile.targetBodyFat} onChange={e => setProfile({...profile, targetBodyFat: +e.target.value})} className="w-full accent-green-600" />
            </div>

            <div className="mb-6">
              <label className="block text-sm text-gray-600 mb-2">Goal</label>
              <div className="grid grid-cols-2 gap-2">
                {(['cut', 'lean_bulk', 'bulk', 'recomp'] as const).map(goal => (
                  <button key={goal} onClick={() => setProfile({...profile, goal})} className={`p-3 rounded-lg border-2 text-left ${profile.goal === goal ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                    <div className="font-medium capitalize text-sm">{goal.replace('_', ' ')}</div>
                  </button>
                ))}
              </div>
            </div>

            <button onClick={() => setStep('gym-store')} className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg">Continue</button>
          </div>
        )}

        {/* Step 2: Gym & Store */}
        {step === 'gym-store' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Select your gym</h2>
            <div className="grid grid-cols-2 gap-2 mb-8">
              {gymChains.map(gym => (
                <button key={gym.id} onClick={() => setSelectedGym(gym.id)} className={`p-3 rounded-lg border-2 text-left ${selectedGym === gym.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                  <div className="font-medium text-sm">{gym.name}</div>
                </button>
              ))}
            </div>

            <h2 className="text-xl font-semibold mb-4">Select your store</h2>
            <div className="grid grid-cols-2 gap-2 mb-8">
              {stores.map(store => (
                <button key={store.id} onClick={() => setSelectedStore(store.id)} className={`p-3 rounded-lg border-2 text-left ${selectedStore === store.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                  <div className="font-medium text-sm">{store.name}</div>
                </button>
              ))}
            </div>

            <div className="flex gap-4">
              <button onClick={() => setStep('profile')} className="flex-1 py-3 border rounded-lg">Back</button>
              <button onClick={calculateResults} className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-lg">Generate My Plan</button>
            </div>
          </div>
        )}

        {/* Step 3: Results */}
        {step === 'results' && metrics && workoutPlan && weeklyMeals && shoppingList && (
          <div className="space-y-6">
            {/* Summary */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4">Your Daily Targets</h2>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div><div className="text-blue-200 text-sm">Calories</div><div className="text-2xl font-bold">{metrics.macros.calories}</div></div>
                <div><div className="text-blue-200 text-sm">Protein</div><div className="text-2xl font-bold">{metrics.macros.protein}g</div></div>
                <div><div className="text-blue-200 text-sm">Carbs</div><div className="text-2xl font-bold">{metrics.macros.carbs}g</div></div>
                <div><div className="text-blue-200 text-sm">Fat</div><div className="text-2xl font-bold">{metrics.macros.fat}g</div></div>
              </div>
              <div className="mt-4 pt-4 border-t border-blue-500 text-sm flex justify-between">
                <span>BMR: {metrics.bmr}</span>
                <span>TDEE: {metrics.tdee}</span>
                <span>Weekly Protein: {calculateWeeklyProtein(metrics.macros.protein)}g</span>
                <span>Goal Weight: {metrics.targetWeight} lbs</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              <div className="flex border-b">
                <button onClick={() => setActiveTab('workout')} className={`flex-1 py-3 font-medium ${activeTab === 'workout' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>Workouts</button>
                <button onClick={() => setActiveTab('food')} className={`flex-1 py-3 font-medium ${activeTab === 'food' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>Food</button>
                <button onClick={() => setActiveTab('shop')} className={`flex-1 py-3 font-medium ${activeTab === 'shop' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>Shop</button>
              </div>

              <div className="p-6">
                {/* Workouts Tab */}
                {activeTab === 'workout' && (
                  <div>
                    <p className="text-sm text-gray-500 mb-4">Push / Pull / Legs Split • {getWorkoutStats(workoutPlan).trainingDays} training days</p>
                    {workoutPlan.days.map(day => (
                      <div key={day.day} className="mb-4 p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold mb-2">Day {day.day}: {day.name}</h3>
                        {day.exercises.length === 0 ? (
                          <p className="text-gray-500 text-sm">Rest day</p>
                        ) : (
                          <ul className="text-sm space-y-1">
                            {day.exercises.map((ex, i) => (
                              <li key={i}>{ex.exercise.name} - {ex.sets}×{ex.reps}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Food Tab */}
                {activeTab === 'food' && (
                  <div>
                    <p className="text-sm text-gray-500 mb-4">Weekly meal plan • ~{calculateWeeklyProtein(metrics.macros.protein)}g protein/week</p>
                    {weeklyMeals.map(day => (
                      <div key={day.day} className="mb-4 p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold mb-2">{day.day}</h3>
                        <div className="text-sm space-y-1">
                          {day.meals.map(meal => (
                            <div key={meal.name} className="flex justify-between">
                              <span className="capitalize">{meal.name}</span>
                              <span className="text-gray-600">{meal.foods[0]?.food.name} ({meal.foods[0]?.protein}g protein)</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Shop Tab */}
                {activeTab === 'shop' && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm text-gray-500">Weekly shopping list • {shoppingList.totalProtein}g total protein</p>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium">Add to Cart</button>
                    </div>
                    <div className="space-y-2">
                      {shoppingList.items.map(item => (
                        <div key={item.id} className="flex justify-between p-3 bg-gray-50 rounded-lg text-sm">
                          <span>{item.name}</span>
                          <span className="text-gray-600">{item.quantity}× {item.unit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
