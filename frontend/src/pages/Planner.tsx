import React, { useState } from 'react';
import { Box, Chip, Collapse, Fade, Grid, Stack, Typography } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import BoltIcon from '@mui/icons-material/Bolt';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Tabs, TabList, Tab } from '../components/ui';
import { PlannerContainer, PlannerForm, PlanCard } from '../components/planner';
import plannerService, {
  DietPlannerInput,
  DietPlan,
  ExercisePlannerInput,
  ExercisePlan,
  PlannerMode,
} from '../services/plannerService';

const defaultExerciseValues: ExercisePlannerInput = {
  goal: 'General Fitness',
  experienceLevel: 'Beginner',
  daysPerWeek: 4,
  equipment: 'Gym',
};

const defaultDietValues: DietPlannerInput = {
  goal: 'General Fitness',
  dietType: 'Vegetarian',
  calories: '',
  allergies: '',
};

const PlannerPage: React.FC = () => {
  const [mode, setMode] = useState<PlannerMode>('exercise');
  const [exerciseValues, setExerciseValues] = useState<ExercisePlannerInput>(defaultExerciseValues);
  const [dietValues, setDietValues] = useState<DietPlannerInput>(defaultDietValues);
  const [exercisePlan, setExercisePlan] = useState<ExercisePlan | null>(null);
  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const currentPlan = mode === 'exercise' ? exercisePlan : dietPlan;

  const onExerciseChange = <K extends keyof ExercisePlannerInput,>(field: K, value: ExercisePlannerInput[K]) => {
    setExerciseValues((previous) => ({ ...previous, [field]: value }));
  };

  const onDietChange = <K extends keyof DietPlannerInput,>(field: K, value: DietPlannerInput[K]) => {
    setDietValues((previous) => ({ ...previous, [field]: value }));
  };

  const generateCurrentPlan = async () => {
    setIsGenerating(true);

    try {
      await new Promise((resolve) => window.setTimeout(resolve, 550));

      if (mode === 'exercise') {
        setExercisePlan(plannerService.generateExercisePlan(exerciseValues));
      } else {
        setDietPlan(plannerService.generateDietPlan(dietValues));
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const renderExercisePlan = () => {
    if (!exercisePlan) {
      return (
        <PlanCard title="Workout output" subtitle="Your structured exercise plan will appear here once generated." badge="Waiting for input" accent="#22c55e">
          <Typography color="text.secondary">
            Use the form above to create a plan built from goal-driven templates.
          </Typography>
        </PlanCard>
      );
    }

    return (
      <Stack spacing={2.5}>
        <PlanCard
          title={exercisePlan.title}
          subtitle={exercisePlan.summary}
          badge={`${exercisePlan.days.length} day plan`}
          accent="#22c55e"
        >
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 2 }}>
            <Chip icon={<FitnessCenterIcon />} label={exercisePlan.weeklyFocus} color="success" variant="outlined" />
            <Chip icon={<ScheduleIcon />} label={exercisePlan.duration} color="primary" variant="outlined" />
            <Chip icon={<BoltIcon />} label="Template driven" color="secondary" variant="outlined" />
          </Stack>

          <Typography variant="body2" color="text.secondary">
            {exercisePlan.tips[0]}
          </Typography>
        </PlanCard>

        <Grid container spacing={2}>
          {exercisePlan.days.map((day) => (
            <Grid item xs={12} md={6} key={day.dayNumber}>
              <PlanCard
                title={`Day ${day.dayNumber}: ${day.title}`}
                subtitle={day.focus}
                badge={day.dayNumber === 1 ? 'Start strong' : undefined}
                accent="#22c55e"
              >
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Warm-up
                    </Typography>
                    <Stack spacing={0.75}>
                      {day.warmUp.map((warmup) => (
                        <Typography key={warmup} variant="body2" color="text.secondary">
                          • {warmup}
                        </Typography>
                      ))}
                    </Stack>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Exercises
                    </Typography>
                    <Stack spacing={1.25}>
                      {day.exercises.map((exercise) => (
                        <Box key={exercise.name} sx={{ p: 1.5, borderRadius: 2, backgroundColor: 'action.hover' }}>
                          <Typography variant="body1" sx={{ fontWeight: 700 }}>
                            {exercise.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {exercise.sets} · {exercise.reps} · Rest {exercise.rest}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Focus: {exercise.focus}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Box>

                  <Box sx={{ p: 1.5, borderRadius: 2, backgroundColor: 'action.hover' }}>
                    <Typography variant="subtitle2" sx={{ mb: 0.5, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Finisher
                    </Typography>
                    <Typography variant="body2">{day.finisher}</Typography>
                  </Box>
                </Stack>
              </PlanCard>
            </Grid>
          ))}
        </Grid>

        <PlanCard title="Training tips" subtitle="A few guardrails to keep the plan sustainable." badge="Coach notes" accent="#22c55e">
          <Stack spacing={1}>
            {exercisePlan.tips.map((tip) => (
              <Typography key={tip} variant="body2" color="text.secondary">
                • {tip}
              </Typography>
            ))}
          </Stack>
        </PlanCard>
      </Stack>
    );
  };

  const renderDietPlan = () => {
    if (!dietPlan) {
      return (
        <PlanCard title="Meal output" subtitle="Your structured diet plan will appear here once generated." badge="Waiting for input" accent="#f59e0b">
          <Typography color="text.secondary">
            The planner will build meal sections for breakfast, lunch, dinner, and snacks.
          </Typography>
        </PlanCard>
      );
    }

    return (
      <Stack spacing={2.5}>
        <PlanCard
          title={dietPlan.title}
          subtitle={dietPlan.summary}
          badge={dietPlan.calories}
          accent="#f59e0b"
        >
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 2 }}>
            <Chip icon={<LocalFireDepartmentIcon />} label={dietPlan.calories} color="warning" variant="outlined" />
            <Chip icon={<RestaurantMenuIcon />} label="Breakfast, lunch, dinner, snacks" color="primary" variant="outlined" />
            <Chip icon={<BoltIcon />} label="Template driven" color="secondary" variant="outlined" />
          </Stack>

          <Typography variant="body2" color="text.secondary">
            {dietPlan.note}
          </Typography>
        </PlanCard>

        <Grid container spacing={2}>
          {dietPlan.sections.map((section) => (
            <Grid item xs={12} md={6} key={section.name}>
              <PlanCard
                title={section.name}
                subtitle={section.note}
                badge={section.calories}
                accent="#f59e0b"
              >
                <Stack spacing={1.25}>
                  {section.items.map((item) => (
                    <Box key={item.title} sx={{ p: 1.5, borderRadius: 2, backgroundColor: 'action.hover' }}>
                      <Typography variant="body1" sx={{ fontWeight: 700 }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Approx. {item.calories} kcal
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </PlanCard>
            </Grid>
          ))}
        </Grid>

        <PlanCard title="Nutrition tips" subtitle="A few guardrails to keep the meal plan practical." badge="Coach notes" accent="#f59e0b">
          <Stack spacing={1}>
            {dietPlan.tips.map((tip) => (
              <Typography key={tip} variant="body2" color="text.secondary">
                • {tip}
              </Typography>
            ))}
          </Stack>
        </PlanCard>
      </Stack>
    );
  };

  return (
    <PlannerContainer
      title="Plan your training and nutrition in one place"
      subtitle="Build structured exercise and meal plans with deterministic templates, a dark gradient UI, and no external AI or API calls."
    >
      <Stack spacing={3}>
        <Box>
          <Tabs
            defaultTab={mode}
            variant="pills"
            onChange={(tabId) => setMode(tabId as PlannerMode)}
          >
            <TabList>
              <Tab id="exercise" icon={<FitnessCenterIcon />}>Exercise Planner</Tab>
              <Tab id="diet" icon={<RestaurantMenuIcon />}>Diet Planner</Tab>
            </TabList>
          </Tabs>
        </Box>

        <PlannerForm
          mode={mode}
          exerciseValues={exerciseValues}
          dietValues={dietValues}
          onExerciseChange={onExerciseChange}
          onDietChange={onDietChange}
          onGenerate={generateCurrentPlan}
          onRegenerate={generateCurrentPlan}
          isLoading={isGenerating}
        />

        <Collapse in={Boolean(currentPlan)} timeout={350} unmountOnExit={false}>
          <Fade in={Boolean(currentPlan)} timeout={350}>
            <Box>
              {mode === 'exercise' ? renderExercisePlan() : renderDietPlan()}
            </Box>
          </Fade>
        </Collapse>
      </Stack>
    </PlannerContainer>
  );
};

export default PlannerPage;