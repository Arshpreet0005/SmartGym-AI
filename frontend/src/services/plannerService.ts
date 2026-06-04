export type PlannerMode = 'exercise' | 'diet';

export type ExerciseGoal = 'Fat Loss' | 'Muscle Gain' | 'General Fitness';
export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type EquipmentType = 'Home' | 'Gym';
export type DietType = 'Vegetarian' | 'Non-Vegetarian';

export interface ExercisePlannerInput {
  goal: ExerciseGoal;
  experienceLevel: ExperienceLevel;
  daysPerWeek: number;
  equipment: EquipmentType;
}

export interface DietPlannerInput {
  goal: ExerciseGoal;
  dietType: DietType;
  calories?: number | '';
  allergies?: string;
}

export interface ExerciseItem {
  name: string;
  sets: string;
  reps: string;
  rest: string;
  focus: string;
}

export interface ExerciseDayPlan {
  dayNumber: number;
  title: string;
  focus: string;
  warmUp: string[];
  exercises: ExerciseItem[];
  finisher: string;
}

export interface ExercisePlan {
  mode: 'exercise';
  title: string;
  summary: string;
  weeklyFocus: string;
  duration: string;
  tips: string[];
  days: ExerciseDayPlan[];
}

export interface MealItem {
  title: string;
  description: string;
  calories: number;
}

export interface MealSection {
  name: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
  items: MealItem[];
  calories: string;
  note: string;
}

export interface DietPlan {
  mode: 'diet';
  title: string;
  summary: string;
  calories: string;
  note: string;
  sections: MealSection[];
  tips: string[];
}

type ExerciseCategory = 'push' | 'pull' | 'legs' | 'core' | 'cardio' | 'mobility';

type DayPattern = {
  title: string;
  focus: string;
  categories: ExerciseCategory[];
  note: string;
};

type ExperienceProfile = {
  exerciseCount: number;
  sets: string;
  rest: string;
  duration: string;
};

type MealOption = {
  title: string;
  description: string;
  calories: number;
  tags: ExerciseGoal[];
};

const experienceProfiles: Record<ExperienceLevel, ExperienceProfile> = {
  Beginner: {
    exerciseCount: 4,
    sets: '3 sets',
    rest: '45-60 sec',
    duration: '35-45 min',
  },
  Intermediate: {
    exerciseCount: 5,
    sets: '4 sets',
    rest: '60-75 sec',
    duration: '45-60 min',
  },
  Advanced: {
    exerciseCount: 6,
    sets: '5 sets',
    rest: '75-90 sec',
    duration: '55-75 min',
  },
};

const exercisePatterns: Record<ExerciseGoal, DayPattern[]> = {
  'Fat Loss': [
    {
      title: 'Full Body Burn',
      focus: 'A metabolic circuit that keeps heart rate elevated while covering the whole body.',
      categories: ['legs', 'push', 'cardio', 'core', 'pull'],
      note: 'Keep transitions short and move with intent.',
    },
    {
      title: 'Lower Body Metabolic',
      focus: 'Lower-body volume paired with core work and short bursts of conditioning.',
      categories: ['legs', 'cardio', 'core', 'legs', 'push'],
      note: 'Use controlled tempo on leg moves, then finish fast.',
    },
    {
      title: 'Upper Body Burn',
      focus: 'Push/pull density work for the upper body with conditioning between sets.',
      categories: ['push', 'pull', 'cardio', 'core', 'push'],
      note: 'Keep your core braced on every rep.',
    },
    {
      title: 'Core + Conditioning',
      focus: 'A core-heavy session supported by rotational strength and pulse-raisers.',
      categories: ['core', 'cardio', 'legs', 'core', 'push'],
      note: 'Prioritize clean movement quality under fatigue.',
    },
    {
      title: 'Athletic Circuit',
      focus: 'Explosive compound lifts mixed with cardio moves for a high-output day.',
      categories: ['legs', 'push', 'pull', 'cardio', 'core'],
      note: 'Treat the finisher as a focused sprint, not a burnout.',
    },
    {
      title: 'Active Recovery + Steps',
      focus: 'Lower-intensity mobility and stability work to support recovery and consistency.',
      categories: ['mobility', 'core', 'cardio', 'mobility', 'legs'],
      note: 'Stay moving, but keep the effort easy enough to recover well.',
    },
  ],
  'Muscle Gain': [
    {
      title: 'Push Strength',
      focus: 'Heavier pressing patterns for chest, shoulders, and triceps.',
      categories: ['push', 'push', 'core', 'push', 'cardio'],
      note: 'Use progressive overload and full range of motion.',
    },
    {
      title: 'Pull Strength',
      focus: 'Back and biceps emphasis with strict form and longer rests.',
      categories: ['pull', 'pull', 'core', 'pull', 'cardio'],
      note: 'Pause at the peak contraction on each rep.',
    },
    {
      title: 'Legs Power',
      focus: 'Quad, hamstring, and glute-focused compounds for lower-body growth.',
      categories: ['legs', 'legs', 'core', 'legs', 'mobility'],
      note: 'Drive through the floor and control the eccentric phase.',
    },
    {
      title: 'Upper Hypertrophy',
      focus: 'Balanced upper-body volume to add size while supporting recovery.',
      categories: ['push', 'pull', 'push', 'core', 'pull'],
      note: 'Keep the last rep challenging but technically clean.',
    },
    {
      title: 'Lower Hypertrophy',
      focus: 'A second lower-body day with accessory volume and stability work.',
      categories: ['legs', 'core', 'legs', 'mobility', 'cardio'],
      note: 'Focus on tempo and glute squeeze in the top range.',
    },
    {
      title: 'Full Body Volume',
      focus: 'A higher-volume day to round out the week without losing structure.',
      categories: ['push', 'pull', 'legs', 'core', 'push', 'pull'],
      note: 'Push each set close to failure, but not past form breakdown.',
    },
  ],
  'General Fitness': [
    {
      title: 'Full Body Strength',
      focus: 'Balanced strength work that builds capability across all major patterns.',
      categories: ['push', 'pull', 'legs', 'core', 'mobility'],
      note: 'Keep a steady pace and leave a little in reserve.',
    },
    {
      title: 'Cardio Conditioning',
      focus: 'A cardio-focused session with supportive leg and core work.',
      categories: ['cardio', 'legs', 'core', 'cardio', 'mobility'],
      note: 'Stay crisp and use smooth breathing throughout.',
    },
    {
      title: 'Mobility + Core',
      focus: 'Movement quality, trunk stability, and joint-friendly range of motion.',
      categories: ['mobility', 'core', 'mobility', 'legs', 'core'],
      note: 'This session should leave you refreshed, not exhausted.',
    },
    {
      title: 'Upper Balance',
      focus: 'A balanced upper-body session with push, pull, and posture work.',
      categories: ['push', 'pull', 'core', 'mobility', 'push'],
      note: 'Use controlled tempo and full shoulder range.',
    },
    {
      title: 'Lower Balance',
      focus: 'A lower-body day with stability, unilateral work, and light conditioning.',
      categories: ['legs', 'core', 'mobility', 'cardio', 'legs'],
      note: 'Focus on knee tracking and hip control.',
    },
  ],
};

const warmUpTemplates: Record<ExerciseGoal, string[]> = {
  'Fat Loss': ['3 minutes brisk march or bike', 'Dynamic leg swings', 'Arm circles and hip openers'],
  'Muscle Gain': ['Light cardio for 3-5 minutes', 'Band pull-aparts or shoulder circles', 'Two ramp-up sets for the first lift'],
  'General Fitness': ['Easy cardio for 3 minutes', 'Dynamic mobility flow', 'Bodyweight squats and torso rotations'],
};

const finisherTemplates: Record<ExerciseGoal, string[]> = {
  'Fat Loss': ['30-second sprint / 30-second rest x 6', 'Mountain climber ladder', 'High-knee intervals'],
  'Muscle Gain': ['Optional 5-minute incline walk', 'Light band burnout for the target muscle', 'Breathing reset and mobility cooldown'],
  'General Fitness': ['Easy row or bike for 5 minutes', 'Plank breathing drill', 'Gentle stretch sequence'],
};

const tipsByGoal: Record<ExerciseGoal, string[]> = {
  'Fat Loss': [
    'Keep rest short and focus on clean, repeatable movement.',
    'Walk more on non-training days to increase overall activity.',
    'Use the conditioning finisher only if recovery feels good.',
  ],
  'Muscle Gain': [
    'Track your loads and aim to add reps or weight over time.',
    'Take your full rest periods on the big lifts.',
    'Prioritize sleep and protein to support growth.',
  ],
  'General Fitness': [
    'Keep the routine balanced and sustainable across the week.',
    'Pair strength work with mobility to stay pain-free.',
    'Progress gradually instead of chasing fatigue.',
  ],
};

const equipmentPools: Record<EquipmentType, Record<ExerciseCategory, string[]>> = {
  Home: {
    push: ['Push-ups', 'Incline Push-ups', 'Pike Push-ups', 'Chair Dips', 'Shoulder Taps'],
    pull: ['Resistance Band Rows', 'Towel Rows', 'Prone Y-T-W Raises', 'Superman Pulls', 'Reverse Snow Angels'],
    legs: ['Bodyweight Squats', 'Reverse Lunges', 'Split Squats', 'Glute Bridges', 'Calf Raises'],
    core: ['Plank Hold', 'Dead Bug', 'Bicycle Crunches', 'Hollow Hold', 'Russian Twists'],
    cardio: ['Jump Rope', 'Mountain Climbers', 'Burpees', 'Skaters', 'High Knees'],
    mobility: ['World\'s Greatest Stretch', 'Cat-Cow Flow', 'Hip Openers', 'Thoracic Rotations', 'Ankle Rocks'],
  },
  Gym: {
    push: ['Barbell Bench Press', 'Incline Dumbbell Press', 'Machine Chest Press', 'Seated Shoulder Press', 'Cable Fly'],
    pull: ['Lat Pulldown', 'Seated Cable Row', 'One-Arm Dumbbell Row', 'Face Pull', 'Assisted Pull-up'],
    legs: ['Back Squat', 'Leg Press', 'Romanian Deadlift', 'Walking Lunges', 'Hip Thrust'],
    core: ['Cable Woodchop', 'Hanging Knee Raise', 'Pallof Press', 'Ab Wheel Rollout', 'Weighted Plank'],
    cardio: ['Rower Intervals', 'Incline Treadmill Walk', 'Bike Sprints', 'Assault Bike', 'Stair Climber'],
    mobility: ['Foam Rolling Flow', '90/90 Hip Switch', 'Thoracic Openers', 'Ankle Mobility Drill', 'Cossack Squat Reach'],
  },
};

const dietDefaults: Record<ExerciseGoal, number> = {
  'Fat Loss': 1800,
  'Muscle Gain': 2400,
  'General Fitness': 2100,
};

const dietGoalNotes: Record<ExerciseGoal, string> = {
  'Fat Loss': 'Higher protein and fiber keep meals filling while staying calorie-aware.',
  'Muscle Gain': 'Protein-forward meals with enough carbs to support training and recovery.',
  'General Fitness': 'A balanced macro split keeps energy steady across the day.',
};

const mealCatalog: Record<DietType, Record<MealSection['name'], MealOption[]>> = {
  Vegetarian: {
    Breakfast: [
      { title: 'Protein oats bowl', description: 'Oats, chia, Greek yogurt, and berries for slow-release energy.', calories: 430, tags: ['Fat Loss', 'General Fitness'] },
      { title: 'Paneer veggie scramble', description: 'Paneer, peppers, onions, and whole-grain toast.', calories: 520, tags: ['Muscle Gain', 'General Fitness'] },
      { title: 'Moong dal chilla', description: 'Savory lentil pancakes with mint chutney.', calories: 360, tags: ['Fat Loss', 'General Fitness'] },
      { title: 'Tofu breakfast wrap', description: 'Tofu, spinach, salsa, and avocado in a whole-wheat wrap.', calories: 480, tags: ['Muscle Gain', 'General Fitness'] },
    ],
    Lunch: [
      { title: 'Quinoa power bowl', description: 'Quinoa, roasted vegetables, chickpeas, and tahini dressing.', calories: 560, tags: ['Fat Loss', 'General Fitness'] },
      { title: 'Paneer rice bowl', description: 'Paneer, brown rice, cucumber, and mint yogurt.', calories: 640, tags: ['Muscle Gain', 'General Fitness'] },
      { title: 'Lentil salad plate', description: 'Lentils, greens, tomato, and olive oil vinaigrette.', calories: 470, tags: ['Fat Loss', 'General Fitness'] },
      { title: 'Tofu stir-fry', description: 'Tofu, broccoli, peppers, and noodles or rice.', calories: 610, tags: ['Muscle Gain', 'General Fitness'] },
    ],
    Dinner: [
      { title: 'Dal and roti', description: 'Comfortable high-protein dal with mixed vegetables and roti.', calories: 540, tags: ['Fat Loss', 'General Fitness'] },
      { title: 'Paneer curry plate', description: 'Paneer curry, basmati rice, and a crunchy salad.', calories: 680, tags: ['Muscle Gain', 'General Fitness'] },
      { title: 'Veggie chili', description: 'Beans, peppers, and tomato served with brown rice.', calories: 500, tags: ['Fat Loss', 'General Fitness'] },
      { title: 'Tofu noodle bowl', description: 'Tofu, mushrooms, and noodles with sesame dressing.', calories: 650, tags: ['Muscle Gain', 'General Fitness'] },
    ],
    Snacks: [
      { title: 'Fruit and nuts', description: 'Apple or banana with a small nut mix.', calories: 220, tags: ['Fat Loss', 'General Fitness'] },
      { title: 'Greek yogurt cup', description: 'High-protein yogurt with seeds and cinnamon.', calories: 180, tags: ['Fat Loss', 'Muscle Gain', 'General Fitness'] },
      { title: 'Roasted chana', description: 'Crunchy roasted chickpeas for easy protein and fiber.', calories: 200, tags: ['Fat Loss', 'General Fitness'] },
      { title: 'Protein smoothie', description: 'Milk, banana, oats, and protein powder or tofu.', calories: 320, tags: ['Muscle Gain', 'General Fitness'] },
    ],
  },
  'Non-Vegetarian': {
    Breakfast: [
      { title: 'Egg white omelette', description: 'Egg whites with spinach, tomato, and toast.', calories: 360, tags: ['Fat Loss', 'General Fitness'] },
      { title: 'Chicken breakfast wrap', description: 'Shredded chicken, eggs, and veggies in a wrap.', calories: 520, tags: ['Muscle Gain', 'General Fitness'] },
      { title: 'Greek yogurt parfait', description: 'Yogurt, berries, oats, and seeds for a quick start.', calories: 400, tags: ['Fat Loss', 'General Fitness'] },
      { title: 'Smoked salmon toast', description: 'Whole-grain toast with salmon, cucumber, and dill.', calories: 470, tags: ['Muscle Gain', 'General Fitness'] },
    ],
    Lunch: [
      { title: 'Chicken rice bowl', description: 'Grilled chicken, rice, vegetables, and light sauce.', calories: 620, tags: ['Fat Loss', 'Muscle Gain', 'General Fitness'] },
      { title: 'Turkey quinoa salad', description: 'Turkey, quinoa, greens, and lemon dressing.', calories: 540, tags: ['Fat Loss', 'General Fitness'] },
      { title: 'Tuna pasta bowl', description: 'Tuna, whole-wheat pasta, and veggies.', calories: 650, tags: ['Muscle Gain', 'General Fitness'] },
      { title: 'Chicken burrito bowl', description: 'Chicken, beans, rice, salsa, and avocado.', calories: 700, tags: ['Muscle Gain', 'General Fitness'] },
    ],
    Dinner: [
      { title: 'Grilled chicken plate', description: 'Chicken breast, roasted vegetables, and potatoes.', calories: 590, tags: ['Fat Loss', 'General Fitness'] },
      { title: 'Salmon and rice', description: 'Salmon fillet with rice and steamed greens.', calories: 720, tags: ['Muscle Gain', 'General Fitness'] },
      { title: 'Turkey stir-fry', description: 'Lean turkey, vegetables, and noodles or rice.', calories: 610, tags: ['Fat Loss', 'General Fitness'] },
      { title: 'Egg and chicken fried rice', description: 'Higher-calorie post-training dinner with protein.', calories: 760, tags: ['Muscle Gain', 'General Fitness'] },
    ],
    Snacks: [
      { title: 'Boiled eggs', description: 'Simple protein snack with black pepper.', calories: 140, tags: ['Fat Loss', 'Muscle Gain', 'General Fitness'] },
      { title: 'Greek yogurt and seeds', description: 'Quick protein snack with healthy fats.', calories: 190, tags: ['Fat Loss', 'General Fitness'] },
      { title: 'Chicken roll-ups', description: 'Lean chicken slices with cucumber and mustard.', calories: 210, tags: ['Muscle Gain', 'General Fitness'] },
      { title: 'Protein smoothie', description: 'Milk, berries, oats, and whey protein.', calories: 300, tags: ['Muscle Gain', 'General Fitness'] },
    ],
  },
};

function clampDaysPerWeek(daysPerWeek: number) {
  if (!Number.isFinite(daysPerWeek)) {
    return 3;
  }

  return Math.min(Math.max(Math.round(daysPerWeek), 1), 7);
}

function repeatCategories(categories: ExerciseCategory[], count: number) {
  return Array.from({ length: count }, (_, index) => categories[index % categories.length]);
}

function formatExerciseReps(goal: ExerciseGoal, category: ExerciseCategory, experienceLevel: ExperienceLevel) {
  const profile = experienceProfiles[experienceLevel];

  if (goal === 'Fat Loss') {
    if (category === 'cardio' || category === 'mobility') {
      return experienceLevel === 'Advanced' ? '40 sec work' : experienceLevel === 'Intermediate' ? '35 sec work' : '30 sec work';
    }

    return experienceLevel === 'Advanced' ? '15 reps' : experienceLevel === 'Intermediate' ? '12-15 reps' : '10-12 reps';
  }

  if (goal === 'Muscle Gain') {
    return experienceLevel === 'Advanced' ? '6-8 reps' : experienceLevel === 'Intermediate' ? '8-10 reps' : '10-12 reps';
  }

  if (category === 'cardio') {
    return experienceLevel === 'Advanced' ? '45 sec' : experienceLevel === 'Intermediate' ? '40 sec' : '30 sec';
  }

  return experienceLevel === 'Advanced' ? '8-10 reps' : profile.sets === '4 sets' ? '8-12 reps' : '10-12 reps';
}

function getExerciseName(equipment: EquipmentType, category: ExerciseCategory, dayNumber: number, slotIndex: number) {
  const pool = equipmentPools[equipment][category];
  const index = (dayNumber + slotIndex) % pool.length;
  return pool[index];
}

function createExerciseItem(
  equipment: EquipmentType,
  category: ExerciseCategory,
  goal: ExerciseGoal,
  experienceLevel: ExperienceLevel,
  dayNumber: number,
  slotIndex: number,
): ExerciseItem {
  const name = getExerciseName(equipment, category, dayNumber, slotIndex);

  return {
    name,
    sets: experienceProfiles[experienceLevel].sets,
    reps: formatExerciseReps(goal, category, experienceLevel),
    rest: experienceProfiles[experienceLevel].rest,
    focus: category === 'mobility'
      ? 'Movement quality and recovery'
      : category === 'cardio'
        ? 'Conditioning and calorie burn'
        : category === 'core'
          ? 'Stability and trunk control'
          : category === 'legs'
            ? 'Lower-body strength and drive'
            : category === 'pull'
              ? 'Back and biceps strength'
              : 'Pressing strength and upper-body power',
  };
}

export function generateExercisePlan(input: ExercisePlannerInput): ExercisePlan {
  const daysPerWeek = clampDaysPerWeek(input.daysPerWeek);
  const profile = experienceProfiles[input.experienceLevel];
  const patterns = exercisePatterns[input.goal];

  const days: ExerciseDayPlan[] = Array.from({ length: daysPerWeek }, (_, index) => {
    const pattern = patterns[index % patterns.length];
    const categories = repeatCategories(pattern.categories, profile.exerciseCount);

    return {
      dayNumber: index + 1,
      title: pattern.title,
      focus: pattern.focus,
      warmUp: warmUpTemplates[input.goal],
      exercises: categories.map((category, slotIndex) =>
        createExerciseItem(input.equipment, category, input.goal, input.experienceLevel, index, slotIndex)
      ),
      finisher: finisherTemplates[input.goal][index % finisherTemplates[input.goal].length],
    };
  });

  return {
    mode: 'exercise',
    title: `${input.goal} Workout Plan`,
    summary: `${input.experienceLevel} ${input.equipment.toLowerCase()} training built for ${daysPerWeek} day(s) per week.`,
    weeklyFocus: exercisePatterns[input.goal][0].focus,
    duration: profile.duration,
    tips: tipsByGoal[input.goal],
    days,
  };
}

function parseAllergies(allergies?: string) {
  return (allergies || '')
    .split(/[,/]/)
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);
}

function formatMealCalories(calories: number) {
  return `${Math.round(calories)} kcal`;
}

function chooseMealOptions(
  items: MealOption[],
  goal: ExerciseGoal,
  allergies: string[],
  desiredCount: number,
  fallbackCalories: number,
) {
  const filtered = items.filter((item) => {
    const haystack = `${item.title} ${item.description}`.toLowerCase();
    return !allergies.some((allergy) => haystack.includes(allergy));
  });

  const sorted = filtered
    .sort((left, right) => {
      const leftMatch = left.tags.includes(goal) ? 1 : 0;
      const rightMatch = right.tags.includes(goal) ? 1 : 0;
      return rightMatch - leftMatch;
    })
    .slice(0, desiredCount);

  if (sorted.length > 0) {
    return sorted;
  }

  return [
    {
      title: 'Allergy-safe swap',
      description: 'Use a protein source, complex carb, and vegetables that avoid the listed allergens.',
      calories: fallbackCalories,
      tags: [goal],
    },
  ];
}

export function generateDietPlan(input: DietPlannerInput): DietPlan {
  const targetCalories = typeof input.calories === 'number' && input.calories > 0
    ? Math.round(input.calories)
    : dietDefaults[input.goal];

  const allergies = parseAllergies(input.allergies);
  const goalNote = dietGoalNotes[input.goal];

  const sectionTargets = {
    Breakfast: 0.25,
    Lunch: 0.3,
    Dinner: 0.3,
    Snacks: 0.15,
  } as const;

  const sections: MealSection[] = (Object.keys(sectionTargets) as Array<keyof typeof sectionTargets>).map((name) => {
    const sectionCalories = Math.round(targetCalories * sectionTargets[name]);
    const desiredCount = name === 'Snacks' ? 2 : 3;
    const items = chooseMealOptions(
      mealCatalog[input.dietType][name],
      input.goal,
      allergies,
      desiredCount,
      sectionCalories,
    ).map((item, index) => ({
      ...item,
      calories: index === 0 && item.title === 'Allergy-safe swap'
        ? sectionCalories
        : item.calories,
    }));

    const totalCalories = items.reduce((sum, item) => sum + item.calories, 0);

    return {
      name,
      items,
      calories: formatMealCalories(totalCalories || sectionCalories),
      note: `${input.dietType} ${name.toLowerCase()} option focused on ${input.goal.toLowerCase()}.`,
    };
  });

  return {
    mode: 'diet',
    title: `${input.goal} Diet Plan`,
    summary: `${input.dietType} template with a daily target around ${formatMealCalories(targetCalories)}.`,
    calories: formatMealCalories(targetCalories),
    note: allergies.length > 0
      ? `${goalNote} Allergy-aware swaps avoid: ${allergies.join(', ')}.`
      : goalNote,
    sections,
    tips: [
      'Front-load protein at breakfast and lunch to stay full longer.',
      'Keep water intake steady through the day.',
      'Use the calorie target as a guide, not a hard ceiling, if your training load changes.',
    ],
  };
}

export const plannerService = {
  generateExercisePlan,
  generateDietPlan,
};

export default plannerService;