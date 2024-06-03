import React from 'react';
import Link from 'next/link';
import { fetchEvents } from '@/lib/actions/user.actions';

const Events = async () => {
  const events: Event[] = await fetchEvents();

  return (
    <div>
      <div className='flex items-center h-16 p-4 pt-6'>
        <h1 className='text-3xl font-bold text-gray-900'>Events</h1>
      </div>
      <ul>
        {events.map(event => (
          <li key={event.$id}>
            <Link href={`/events/${event.$id}`}>
                <h2>{event.title}</h2>
                <p>{event.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Events;
