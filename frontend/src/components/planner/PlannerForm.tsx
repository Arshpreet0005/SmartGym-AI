import React from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { Button, Select, TextField } from '../ui';
import PlanCard from './PlanCard';
import type {
  DietPlannerInput,
  DietType,
  ExerciseGoal,
  ExercisePlannerInput,
  ExperienceLevel,
  PlannerMode,
} from '../../services/plannerService';

interface PlannerFormProps {
  mode: PlannerMode;
  exerciseValues: ExercisePlannerInput;
  dietValues: DietPlannerInput;
  onExerciseChange: <K extends keyof ExercisePlannerInput>(field: K, value: ExercisePlannerInput[K]) => void;
  onDietChange: <K extends keyof DietPlannerInput>(field: K, value: DietPlannerInput[K]) => void;
  onGenerate: () => void;
  onRegenerate: () => void;
  isLoading: boolean;
}

const goalOptions = ['Fat Loss', 'Muscle Gain', 'General Fitness'].map((goal) => ({
  value: goal,
  label: goal,
})) as Array<{ value: ExerciseGoal; label: string }>;

const experienceOptions = ['Beginner', 'Intermediate', 'Advanced'].map((experience) => ({
  value: experience,
  label: experience,
})) as Array<{ value: ExperienceLevel; label: string }>;

const equipmentOptions = ['Home', 'Gym'].map((equipment) => ({
  value: equipment,
  label: equipment,
}));

const dietTypeOptions = ['Vegetarian', 'Non-Vegetarian'].map((dietType) => ({
  value: dietType,
  label: dietType,
})) as Array<{ value: DietType; label: string }>;

const PlannerForm: React.FC<PlannerFormProps> = ({
  mode,
  exerciseValues,
  dietValues,
  onExerciseChange,
  onDietChange,
  onGenerate,
  onRegenerate,
  isLoading,
}) => {
  return (
    <PlanCard
      title={mode === 'exercise' ? 'Exercise Planner' : 'Diet Planner'}
      subtitle={mode === 'exercise'
        ? 'Generate a training split from deterministic workout templates.'
        : 'Generate a structured meal plan with meal-by-meal suggestions.'}
      badge={mode === 'exercise' ? 'Workout mode' : 'Nutrition mode'}
      accent={mode === 'exercise' ? '#22c55e' : '#f59e0b'}
    >
      <Stack spacing={2.5}>
        <Typography variant="body2" color="text.secondary">
          {mode === 'exercise'
            ? 'Choose a goal, experience level, days per week, and equipment.'
            : 'Choose a goal, diet type, optional calories, and any allergy notes.'}
        </Typography>

        {mode === 'exercise' ? (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Select
                label="Goal"
                options={goalOptions}
                value={exerciseValues.goal}
                onChange={(event) => onExerciseChange('goal', event.target.value as ExerciseGoal)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                label="Experience Level"
                options={experienceOptions}
                value={exerciseValues.experienceLevel}
                onChange={(event) => onExerciseChange('experienceLevel', event.target.value as ExperienceLevel)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Days per week"
                type="number"
                fullWidth
                value={exerciseValues.daysPerWeek}
                onChange={(event) => onExerciseChange('daysPerWeek', Number(event.target.value))}
                inputProps={{ min: 1, max: 7, step: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                label="Equipment"
                options={equipmentOptions}
                value={exerciseValues.equipment}
                onChange={(event) => onExerciseChange('equipment', event.target.value as ExercisePlannerInput['equipment'])}
                fullWidth
              />
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Select
                label="Goal"
                options={goalOptions}
                value={dietValues.goal}
                onChange={(event) => onDietChange('goal', event.target.value as ExerciseGoal)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                label="Diet Type"
                options={dietTypeOptions}
                value={dietValues.dietType}
                onChange={(event) => onDietChange('dietType', event.target.value as DietType)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Calories (optional)"
                type="number"
                fullWidth
                value={dietValues.calories}
                onChange={(event) => {
                  const value = event.target.value;
                  onDietChange('calories', value === '' ? '' : Number(value));
                }}
                inputProps={{ min: 1200, max: 5000, step: 50 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Allergies (optional)"
                placeholder="e.g. peanuts, dairy, gluten"
                fullWidth
                value={dietValues.allergies || ''}
                onChange={(event) => onDietChange('allergies', event.target.value)}
              />
            </Grid>
          </Grid>
        )}

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, pt: 1 }}>
          <Button variant="contained" color="primary" onClick={onGenerate} isLoading={isLoading}>
            Generate Plan
          </Button>
          <Button variant="outlined" color="primary" onClick={onRegenerate} disabled={isLoading}>
            Regenerate Plan
          </Button>
        </Box>
      </Stack>
    </PlanCard>
  );
};

export default PlannerForm;