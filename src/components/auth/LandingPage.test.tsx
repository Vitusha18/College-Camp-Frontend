import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LandingPage } from './LandingPage';

const apiMocks = vi.hoisted(() => ({
  getUniversities: vi.fn(),
  register: vi.fn(),
  login: vi.fn(),
}));

vi.mock('../../services/api', () => ({ api: apiMocks }));

describe('student registration form', () => {
  beforeEach(() => {
    apiMocks.getUniversities.mockResolvedValue([
      { id: 'university-1', name: 'Example University', domain: 'example.test' },
    ]);
    apiMocks.register.mockResolvedValue({ token: 'test-token', user: { role: 'student' } });
  });

  it('loads the university list, submits the selected campus, and completes registration', async () => {
    const user = userEvent.setup();
    const onAuthSuccess = vi.fn();
    render(<LandingPage onAuthSuccess={onAuthSuccess} />);

    await user.click(screen.getByRole('button', { name: /join as student/i }));
    await screen.findByRole('option', { name: 'Example University' });
    await user.type(screen.getByPlaceholderText('E.g., Alex Johnson'), 'Taylor Student');
    await user.selectOptions(screen.getByRole('combobox'), 'university-1');
    await user.type(screen.getByPlaceholderText('you@university.edu'), 'taylor@example.test');
    await user.type(screen.getByPlaceholderText('••••••••'), 'test-password');
    await user.click(screen.getByRole('button', { name: 'Create Account' }));

    await waitFor(() => expect(apiMocks.register).toHaveBeenCalledWith({
      name: 'Taylor Student',
      email: 'taylor@example.test',
      password: 'test-password',
      universityId: 'university-1',
    }));
    expect(onAuthSuccess).toHaveBeenCalledOnce();
  });

  it('shows actionable feedback when registration fails', async () => {
    apiMocks.register.mockRejectedValueOnce(new Error('Registration failed'));
    render(<LandingPage onAuthSuccess={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: /join as student/i }));
    await screen.findByRole('option', { name: 'Example University' });
    fireEvent.change(screen.getByPlaceholderText('E.g., Alex Johnson'), { target: { value: 'Taylor Student' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'university-1' } });
    fireEvent.change(screen.getByPlaceholderText('you@university.edu'), { target: { value: 'taylor@example.test' } });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: 'test-password' } });
    fireEvent.click(screen.getByRole('button', { name: 'Create Account' }));

    expect(await screen.findByText('Registration failed')).toBeInTheDocument();
  });
});
