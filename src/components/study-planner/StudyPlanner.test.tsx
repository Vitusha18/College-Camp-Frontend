import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { StudyTask } from '../../types';
import { StudyPlanner } from './StudyPlanner';

const appMocks = vi.hoisted(() => ({ useApp: vi.fn() }));
vi.mock('../../context/AppContext', () => ({ useApp: appMocks.useApp }));

const makeTask = (id: string, title: string, dueDate: string): StudyTask => ({
  id,
  title,
  subject: 'Computer Science',
  dueDate,
  dueText: `Due ${dueDate}`,
  priority: 'Medium',
  category: 'Study',
  completed: false,
  estimatedMinutes: 60,
  notes: '',
});

describe('study planner', () => {
  const addTask = vi.fn();
  const toggleTask = vi.fn();
  const deleteTask = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 0, 31, 12));
    addTask.mockResolvedValue(undefined);
    toggleTask.mockResolvedValue(undefined);
    deleteTask.mockResolvedValue(undefined);
    appMocks.useApp.mockReturnValue({
      tasks: [
        makeTask('jan-26', 'Monday review', '2026-01-26'),
        makeTask('jan-31', 'Saturday review', '2026-01-31'),
        makeTask('feb-1', 'Sunday review', '2026-02-01'),
        makeTask('feb-2', 'Next week review', '2026-02-02'),
      ],
      addTask,
      toggleTask,
      deleteTask,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('uses local calendar dates and clamps month navigation at month end', () => {
    render(<StudyPlanner />);

    expect(screen.getByText('Saturday review')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Next calendar month' }));

    expect(screen.getByText('February 2026')).toBeInTheDocument();
    expect(screen.getByText('28 February')).toBeInTheDocument();
  });

  it('shows the Monday-to-Sunday week containing the selected date', () => {
    render(<StudyPlanner />);
    fireEvent.click(screen.getByRole('button', { name: 'Weekly View' }));

    expect(screen.getByText('26 January - 1 February')).toBeInTheDocument();
    expect(screen.getByText('Monday review')).toBeInTheDocument();
    expect(screen.getByText('Saturday review')).toBeInTheDocument();
    expect(screen.getByText('Sunday review')).toBeInTheDocument();
    expect(screen.queryByText('Next week review')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Next week' }));
    expect(screen.getByText('2 February - 8 February')).toBeInTheDocument();
    expect(screen.getByText('Next week review')).toBeInTheDocument();
  });

  it('submits trimmed task details and preserves the form when saving fails', async () => {
    addTask.mockRejectedValueOnce(new Error('Task service unavailable'));
    render(<StudyPlanner />);
    fireEvent.click(screen.getByRole('button', { name: 'Add Task' }));

    fireEvent.change(screen.getByLabelText('Task Title *'), { target: { value: '  Review algorithms  ' } });
    fireEvent.change(screen.getByLabelText('Subject / Course'), { target: { value: '  Algorithms  ' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Schedule Task' }));
      await Promise.resolve();
    });

    expect(addTask).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Review algorithms',
      subject: 'Algorithms',
      dueDate: '2026-01-31',
      estimatedMinutes: 60,
    }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByLabelText('Task Title *')).toHaveValue('  Review algorithms  ');
  });
});
