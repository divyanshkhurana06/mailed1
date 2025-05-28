
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Email, EmailCategory } from '@/hooks/useEmails';
import * as Icons from 'lucide-react';

interface EmailCardProps {
  email: Email;
  categories: EmailCategory[];
  onClick: () => void;
}

export const EmailCard = ({ email, categories, onClick }: EmailCardProps) => {
  const category = categories.find(cat => cat.name === email.category);
  const IconComponent = category ? (Icons as any)[category.icon] : Icons.Mail;
  
  const timeAgo = formatDistanceToNow(new Date(email.received_at), { addSuffix: true });

  return (
    <div
      className={`bg-white rounded-lg border shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group ${
        !email.is_read ? 'ring-2 ring-blue-200' : ''
      }`}
      onClick={onClick}
    >
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className={`p-2 rounded-lg ${category?.color_class?.split(' ')[0] || 'bg-gray-100'} flex-shrink-0`}>
              <IconComponent className={`h-4 w-4 ${category?.color_class?.split(' ')[1] || 'text-gray-600'}`} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3 mb-1">
                <p className="font-medium text-gray-900 truncate">
                  {email.sender_name || email.sender_email}
                </p>
                <Badge variant="outline" className={`text-xs ${category?.color_class || 'bg-gray-100 text-gray-600'}`}>
                  {email.category}
                </Badge>
                {!email.is_read && (
                  <Badge variant="default" className="text-xs bg-blue-500">
                    New
                  </Badge>
                )}
              </div>
              <p className="text-lg font-semibold text-gray-800 group-hover:text-red-600 transition-colors mb-1">
                {email.ai_summary}
              </p>
              <p className="text-sm text-gray-600 truncate">
                {email.subject}
              </p>
            </div>
          </div>
          
          <div className="text-right flex-shrink-0 ml-4">
            <p className="text-sm text-gray-500">{timeAgo}</p>
            <div className="mt-2">
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                View Full
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
