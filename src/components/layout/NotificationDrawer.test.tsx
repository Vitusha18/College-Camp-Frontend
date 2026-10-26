import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NotificationDrawer } from './NotificationDrawer';

const appMocks = vi.hoisted(() => ({ useApp: vi.fn() }));
vi.mock('../../context/AppContext', () => ({ useApp: appMocks.useApp }));

describe('notification drawer navigation', () => {
  const setActiveTab = vi.fn();
  const markNotificationRead = vi.fn();
  const setIsNotificationDrawerOpen = vi.fn();

  beforeEach(() => {
    appMocks.useApp.mockReturnValue({
      notifications: [{
        id: 'notification-1',
        title: 'New internship update',
        message: 'Your application status changed.',
        category: 'internship',
        isRead: false,
        timeAgo: 'Just now',
        actionUrl: 'internships',
      }],
      markNotificationRead,
      markAllNotificationsRead: vi.fn(),
      unreadNotificationsCount: 1,
      addToast: vi.fn(),
      setActiveTab,
      isNotificationDrawerOpen: true,
      setIsNotificationDrawerOpen,
    });
  });

  it('marks an item read and navigates to its destination', async () => {
    render(<NotificationDrawer />);

    fireEvent.click(screen.getByText('New internship update'));

    expect(markNotificationRead).toHaveBeenCalledWith('notification-1');
    await waitFor(() => expect(setActiveTab).toHaveBeenCalledWith('internships'));
    expect(setIsNotificationDrawerOpen).toHaveBeenCalledWith(false);
  });

  it('opens the full notifications view from the drawer', () => {
    render(<NotificationDrawer />);

    fireEvent.click(screen.getByRole('button', { name: 'View all' }));

    expect(setActiveTab).toHaveBeenCalledWith('notifications');
    expect(setIsNotificationDrawerOpen).toHaveBeenCalledWith(false);
  });

  it('shows summary counts and filters to unread notifications when embedded', () => {
    render(<NotificationDrawer embedded />);

    expect(screen.getByText('Total notifications')).toBeInTheDocument();
    expect(screen.getByText('Needs attention')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /unread/i }));
    expect(screen.getByText('New internship update')).toBeInTheDocument();
  });
});
