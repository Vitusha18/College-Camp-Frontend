import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UserProfile } from '../../types';
import { Settings } from './Settings';

const appMocks = vi.hoisted(() => ({ useApp: vi.fn() }));
vi.mock('../../context/AppContext', () => ({ useApp: appMocks.useApp }));

const profile: UserProfile = {
  id: 'user-1',
  name: 'Taylor Student',
  email: 'taylor@example.test',
  role: 'student',
  avatar: '',
  department: '',
  degree: '',
  year: '',
  college: '',
  rollNumber: '',
  cgpa: 0,
  skills: [],
  bio: '',
  githubUrl: '',
  linkedinUrl: '',
  resumeUrl: '',
  familyIncome: undefined,
  category: undefined,
  gender: undefined,
  profileCompletion: 11,
};

describe('student profile settings', () => {
  const updateProfile = vi.fn();
  const fieldFor = (label: string, selector: 'input' | 'textarea') => {
    const field = screen.getByText(label, { exact: true }).parentElement?.querySelector(selector);
    if (!field) throw new Error(`Unable to find ${selector} control for ${label}.`);
    return field;
  };

  beforeEach(() => {
    updateProfile.mockResolvedValue(undefined);
    appMocks.useApp.mockReturnValue({
      userProfile: profile,
      updateProfile,
      isDark: false,
      toggleTheme: vi.fn(),
      addToast: vi.fn(),
    });
  });

  it('saves profile changes through the shared profile update action', async () => {
    render(<Settings />);

    fireEvent.change(fieldFor('Department', 'input'), { target: { value: 'Computer Science' } });
    fireEvent.change(fieldFor('CGPA (out of 10)', 'input'), { target: { value: '8.5' } });
    fireEvent.change(fieldFor('Bio', 'textarea'), { target: { value: 'Building useful tools.' } });
    fireEvent.click(screen.getByRole('button', { name: /save changes/i }));

    await waitFor(() => expect(updateProfile).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Taylor Student',
      department: 'Computer Science',
      cgpa: 8.5,
      bio: 'Building useful tools.',
    })));
  });
});
