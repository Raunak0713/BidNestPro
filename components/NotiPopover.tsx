import React, { useEffect, useRef, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Bell, X } from 'lucide-react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { Id } from '@/convex/_generated/dataModel';
import { useRouter } from 'next/navigation';

const PopoverPage = () => {
  const { user } = useUser();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const getNotification = useQuery(api.notification.getAllNotificationsByClerkId, { clerkId: user?.id || '' }) || [];
  const deleteNotification = useMutation(api.notification.deleteNotificationById);
  const popoverContentRef = useRef<HTMLDivElement>(null);

  const handleDelete = async (id: Id<'notifications'>) => {
    try {
      await deleteNotification({ notiId: id });
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Early return if user is not available
  if (!user) return null;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className='relative cursor-pointer'>
          <Bell className='w-6 h-6' />
          {getNotification.length !== 0 && (
            <div className='absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center'>
              {getNotification.length > 9 ? '9+' : getNotification.length}
            </div>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent
        align='start'
        className='mt-1 mr-12 w-[350px] h-[800px] md:w-[500px] md:h-[500px] overflow-y-auto gap-4 flex flex-col'
        ref={popoverContentRef}
      >
        {getNotification.map((item) => (
          <div key={item._id.toString()} className='bg-blue-50 hover:bg-blue-100 shadow-md rounded-xl p-4 transition duration-300'>
            <div className='flex items-center justify-between w-full'>
              <div className='flex items-center'>
                <div className={`w-2.5 h-2.5 bg-red-500 rounded-full mr-4 ${item.buttonText ? 'mt-12' : ''}`}></div>
                <p className='text-md text-gray-800 flex-1'>{item.content}</p>
              </div>
              <p
                className={`text-gray-500 hover:text-red-600 text-sm cursor-pointer ${item.buttonText ? 'mt-12' : ''} ml-4`}
                onClick={() => handleDelete(item._id)}
              >
                <X size={20} />
              </p>
            </div>
            {item.buttonText && (
              <div className='flex justify-start ml-6 mt-2'>
                <button
                  onClick={() => router.push(item.buttonUrl!)}
                  className='text-gray-800 bg-blue-200 px-3 focus:outline-none py-1 rounded-md transition w-fit'
                >
                  {item.buttonText}
                </button>
              </div>
            )}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default PopoverPage;