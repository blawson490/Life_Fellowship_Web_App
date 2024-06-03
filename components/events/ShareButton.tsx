// components/ShareButton.tsx
"use client";

import React from 'react';
import { Button } from '../ui/button';

interface ShareButtonProps {
  eventId: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ eventId }) => {
  const handleShare = () => {
    const shareUrl = `${window.location.origin}/events/${eventId}?shared=true`;
    navigator.clipboard.writeText(shareUrl);
    alert('Link copied to clipboard!');
  };

  return (
    <Button onClick={handleShare} className='mt-4 bg-blue-500 text-white p-2 rounded'>
      Share
    </Button>
  );
};

export default ShareButton;
