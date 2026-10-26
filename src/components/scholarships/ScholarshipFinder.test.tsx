import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Scholarship } from '../../types';
import { ScholarshipFinder } from './ScholarshipFinder';

const appMocks = vi.hoisted(() => ({ useApp: vi.fn() }));
vi.mock('../../context/AppContext', () => ({ useApp: appMocks.useApp }));

const scholarship: Scholarship = {
  id: 'scholarship-1',
  title: 'STEM Research Scholarship',
  provider: 'Example Foundation',
  amount: '₹50,000',
  amountNumber: 50000,
  deadline: 'Dec 31, 2026',
  category: 'STEM',
  degree: ['Undergraduate'],
  gender: 'All',
  maxIncomeLPA: 8,
  minCGPA: 7,
  description: 'Support for undergraduate research.',
  eligibility: ['Undergraduate students'],
  documentsRequired: ['Transcript'],
  isBookmarked: false,
};

describe('scholarship finder', () => {
  const toggleBookmarkScholarship = vi.fn();
  const applyToScholarship = vi.fn();

  beforeEach(() => {
    appMocks.useApp.mockReturnValue({
      scholarships: [scholarship],
      toggleBookmarkScholarship,
      applyToScholarship,
      searchQuery: '',
      userProfile: { cgpa: 8, familyIncome: 4 },
    });
  });

  it('filters by category and keeps save and apply actions available', () => {
    render(<ScholarshipFinder />);

    fireEvent.click(screen.getByRole('button', { name: 'STEM' }));
    expect(screen.getByText('STEM Research Scholarship')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Save STEM Research Scholarship' }));
    fireEvent.click(screen.getByRole('button', { name: 'Apply' }));

    expect(toggleBookmarkScholarship).toHaveBeenCalledWith('scholarship-1');
    expect(applyToScholarship).toHaveBeenCalledWith('scholarship-1');
  });

  it('keeps the shared search connected to the opportunity list', () => {
    render(<ScholarshipFinder />);

    fireEvent.change(screen.getByPlaceholderText('Search scholarships by name, foundation, or field...'), {
      target: { value: 'not listed' },
    });

    expect(screen.getByText('No scholarships found matching criteria')).toBeInTheDocument();
  });
});
