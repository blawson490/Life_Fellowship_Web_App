// components/EventDetails.tsx
import React from 'react';
import ShareButton from './ShareButton';
import { getLoggedInUser } from '@/lib/actions/user.actions';

interface EventDetailsProps {
  event: Event;
  isShared: boolean;
}

const EventDetails: React.FC<EventDetailsProps> = async ({ event, isShared }) => {
const user = await getLoggedInUser();
  return (
    <div>
      {isShared && !user && (
        <div className='bg-yellow-200 p-4 text-center'>
          <p>
            Sign up or create an account to get the most out of our events! 
            &nbsp;
            <a href="/sign-in" className="text-blue-500 underline">Sign in</a>
            &nbsp; or &nbsp;
            <a href="/sign-up" className="text-blue-500 underline">Sign up</a>
          </p>
        </div>
      )}
      <div className='flex items-center h-16 p-4 pt-6'>
        <h1 className='text-3xl font-bold text-gray-900'>{event.title}</h1>
      </div>
      <div>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Date:</strong> {new Date(event.eventDateTime).toLocaleString()}</p>
        <p><strong>Description:</strong> {event.description}</p>
        <p><strong>Important Message:</strong> {event.importantMessage}</p>
        <p><strong>Price:</strong> {event.price > 0 ? `$${event.price} per ${event.pricePer}` : 'Free'}</p>
        <p><strong>Action:</strong> {event.hasAction ? event.actionText : 'No action required'}</p>
        <p><strong>Created By:</strong> {event.createdBy.firstName} {event.createdBy.lastName} ({event.createdBy.email})</p>
        <p><strong>Attendees:</strong></p>
        <ul>
          {event.attendees.map(attendee => (
            <li key={attendee.$id}>
              {attendee.firstName} {attendee.lastName} ({attendee.email})
            </li>
          ))}
        </ul>
        <ShareButton eventId={event.$id} />
      </div>
    </div>
  );
};

export default EventDetails;
