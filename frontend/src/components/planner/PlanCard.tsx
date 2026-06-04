import React from 'react';
import { Box, Chip, Divider, alpha, styled } from '@mui/material';
import { Card, CardContent, CardHeader } from '../ui';

interface PlanCardProps {
  title: string;
  subtitle?: string;
  badge?: string;
  accent?: string;
  children: React.ReactNode;
}

const AccentBar = styled(Box)<{ accent: string }>(({ theme, accent }) => ({
  height: 4,
  width: '100%',
  background: `linear-gradient(90deg, ${accent}, ${alpha(theme.palette.secondary.main, 0.85)})`,
}));

const PlanCard: React.FC<PlanCardProps> = ({ title, subtitle, badge, accent = '#6366f1', children }) => {
  return (
    <Card variant="elevated" radius="large" hoverEffect padding={0}>
      <AccentBar accent={accent} />
      <CardHeader
        title={title}
        subheader={subtitle}
        action={badge ? <Chip label={badge} size="small" color="primary" variant="outlined" /> : undefined}
      />
      <Divider />
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default PlanCard;