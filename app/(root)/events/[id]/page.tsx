// app/(root)/events/[id]/page.tsx
import { fetchEventById } from '@/lib/actions/user.actions';
import EventDetails from '@/components/events/EventDetails';
import React from 'react';

interface EventDetailsPageProps {
  params: {
    id: string;
  };
  searchParams: {
    shared?: string;
  };
}

const EventDetailsPage: React.FC<EventDetailsPageProps> = async ({ params, searchParams }) => {
  const event: Event | null = await fetchEventById(params.id);
  const isShared = searchParams.shared === 'true';

  if (!event) {
    return <div>Event not found</div>;
  }

  return <EventDetails event={event} isShared={isShared} />;
};

export default EventDetailsPage;
