
import { useState } from 'react';
import { Bell, Mail, Clock, Filter, Search, BookOpen, Plane, DollarSign, Briefcase, Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

// Mock email data to demonstrate the concept
const mockEmails = [
  {
    id: 1,
    sender: "Divyansh Sharma",
    summary: "College loan needed",
    category: "Education",
    time: "2 min ago",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800"
  },
  {
    id: 2,
    sender: "Travel Agency",
    summary: "Flight booking confirmed",
    category: "Travel",
    time: "15 min ago",
    icon: Plane,
    color: "bg-green-100 text-green-800"
  },
  {
    id: 3,
    sender: "Bank of America",
    summary: "Monthly statement ready",
    category: "Finance",
    time: "1 hour ago",
    icon: DollarSign,
    color: "bg-yellow-100 text-yellow-800"
  },
  {
    id: 4,
    sender: "LinkedIn",
    summary: "Job opportunity match",
    category: "Work",
    time: "3 hours ago",
    icon: Briefcase,
    color: "bg-purple-100 text-purple-800"
  },
  {
    id: 5,
    sender: "Mom",
    summary: "Birthday party invitation",
    category: "Personal",
    time: "5 hours ago",
    icon: Heart,
    color: "bg-pink-100 text-pink-800"
  },
  {
    id: 6,
    sender: "Amazon",
    summary: "Order shipped today",
    category: "Shopping",
    time: "8 hours ago",
    icon: ShoppingCart,
    color: "bg-orange-100 text-orange-800"
  }
];

const categories = [
  { name: "All", count: 6, active: true },
  { name: "Education", count: 1, active: false },
  { name: "Travel", count: 1, active: false },
  { name: "Finance", count: 1, active: false },
  { name: "Work", count: 1, active: false },
  { name: "Personal", count: 1, active: false },
  { name: "Shopping", count: 1, active: false }
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmails = mockEmails.filter(email => {
    const matchesCategory = selectedCategory === "All" || email.category === selectedCategory;
    const matchesSearch = email.sender.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         email.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-500 rounded-lg">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Gmail Assistant</h1>
                <p className="text-sm text-gray-600">Smart email summaries & notifications</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
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
            {categories.map((category) => (
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
        <div className="flex items-center space-x-2 mb-6">
          <Clock className="h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-semibold text-gray-900">Last 24 Hours</h2>
          <Badge variant="outline">{filteredEmails.length} emails</Badge>
        </div>

        {/* Email Summary Cards */}
        <div className="space-y-3">
          {filteredEmails.map((email) => (
            <div
              key={email.id}
              className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className={`p-2 rounded-lg ${email.color.split(' ')[0]} flex-shrink-0`}>
                      <email.icon className={`h-4 w-4 ${email.color.split(' ')[1]}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-1">
                        <p className="font-medium text-gray-900 truncate">{email.sender}</p>
                        <Badge variant="outline" className={`text-xs ${email.color}`}>
                          {email.category}
                        </Badge>
                      </div>
                      <p className="text-lg font-semibold text-gray-800 group-hover:text-red-600 transition-colors">
                        {email.summary}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right flex-shrink-0 ml-4">
                    <p className="text-sm text-gray-500">{email.time}</p>
                    <div className="mt-2">
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        View Full
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Demo Notice */}
        <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-3">
            <Bell className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">How it works</h3>
              <div className="space-y-2 text-sm text-blue-800">
                <p>• <strong>Smart Notifications:</strong> Get ultra-short 4-6 word summaries instantly</p>
                <p>• <strong>Auto-Categorization:</strong> Emails organized by type automatically</p>
                <p>• <strong>Real-time Processing:</strong> AI analyzes emails as they arrive</p>
                <p>• <strong>Privacy First:</strong> All processing happens securely</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
