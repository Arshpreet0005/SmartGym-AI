import React from 'react';
import { Box, Chip, Stack, Typography, alpha, styled } from '@mui/material';
import { PageContainer } from '../layout';
import { Card, CardContent } from '../ui';

interface PlannerContainerProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const HeroCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.98)} 0%, ${alpha(theme.palette.primary.dark, 0.2)} 100%)`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.18)}`,
}));

const PlannerContainer: React.FC<PlannerContainerProps> = ({ title, subtitle, children }) => {
  return (
    <PageContainer maxWidth="1600px">
      <HeroCard variant="elevated" radius="rounded" hoverEffect>
        <CardContent noPadding>
          <Box sx={{ p: { xs: 3, sm: 4 }, position: 'relative' }}>
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at top right, rgba(99, 102, 241, 0.18), transparent 45%), radial-gradient(circle at bottom left, rgba(16, 185, 129, 0.12), transparent 35%)',
                pointerEvents: 'none',
              }}
            />
            <Stack spacing={2} sx={{ position: 'relative' }}>
              <Box>
                <Typography variant="overline" sx={{ letterSpacing: '0.18em', color: 'text.secondary' }}>
                  Smart Fitness Planner
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, mt: 1 }}>
                  {title}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1.5, color: 'text.secondary', maxWidth: 900 }}>
                  {subtitle}
                </Typography>
              </Box>

              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                <Chip label="Protected page" color="primary" variant="outlined" />
                <Chip label="Template driven" color="secondary" variant="outlined" />
                <Chip label="No external API" color="success" variant="outlined" />
              </Stack>
            </Stack>
          </Box>
        </CardContent>
      </HeroCard>

      <Box sx={{ mt: 3 }}>
        {children}
      </Box>
    </PageContainer>
  );
};

export default PlannerContainer;