import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SkillBadge } from './SkillBadge';

describe('SkillBadge', () => {
  it('renders the skill text', () => {
    render(<SkillBadge skill="React" />);
    expect(screen.getByText('React')).toBeDefined();
  });
});
