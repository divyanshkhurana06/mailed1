
import { useState } from 'react';
import { Clock, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useEmails, useEmailCategories, useMarkEmailRead } from '@/hooks/useEmails';
import { EmailCard } from './EmailCard';
import { Skeleton } from '@/components/ui/skeleton';

export const EmailList = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: emails = [], isLoading: emailsLoading } = useEmails();
  const { data: categories = [], isLoading: categoriesLoading } = useEmailCategories();
  const markEmailRead = useMarkEmailRead();

  const filteredEmails = emails.filter(email => {
    const matchesCategory = selectedCategory === "All" || email.category === selectedCategory;
    const matchesSearch = email.sender_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         email.sender_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         email.ai_summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categoryStats = categories.map(cat => ({
    ...cat,
    count: emails.filter(email => email.category === cat.name).length
  }));

  const allCategories = [
    { name: "All", count: emails.length },
    ...categoryStats
  ];

  const handleEmailClick = (emailId: string) => {
    if (!markEmailRead.isPending) {
      markEmailRead.mutate(emailId);
    }
  };

  if (emailsLoading || categoriesLoading) {
    return (
      <div className="space-y-4">
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <div className="flex space-x-2">
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} className="h-8 w-20" />
            ))}
          </div>
        </div>
        {[1, 2, 3].map(i => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search emails..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          <Filter className="h-4 w-4 text-gray-500 flex-shrink-0" />
          {allCategories.map((category) => (
            <Button
              key={category.name}
              variant={selectedCategory === category.name ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.name)}
              className="flex-shrink-0"
            >
              {category.name}
              <Badge variant="secondary" className="ml-2 text-xs">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      {/* Recent Activity Header */}
      <div className="flex items-center space-x-2">
        <Clock className="h-5 w-5 text-gray-500" />
        <h2 className="text-lg font-semibold text-gray-900">Recent Emails</h2>
        <Badge variant="outline">{filteredEmails.length} emails</Badge>
      </div>

      {/* Email Cards */}
      <div className="space-y-3">
        {filteredEmails.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No emails found</p>
            <p className="text-sm text-gray-400 mt-1">
              {emails.length === 0 ? "Connect your Gmail to see emails here" : "Try adjusting your search or filters"}
            </p>
          </div>
        ) : (
          filteredEmails.map((email) => (
            <EmailCard
              key={email.id}
              email={email}
              categories={categories}
              onClick={() => handleEmailClick(email.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};
