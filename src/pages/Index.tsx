
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { EmailList } from '@/components/EmailList';

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-6 py-8">
        <EmailList />
        
        {/* Demo Notice */}
        <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-3">
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Gmail Integration Status</h3>
              <div className="space-y-2 text-sm text-blue-800">
                <p>• <strong>Database:</strong> Connected and ready ✅</p>
                <p>• <strong>Authentication:</strong> Active with Google OAuth ✅</p>
                <p>• <strong>Gmail API:</strong> Ready for integration ⏳</p>
                <p>• <strong>AI Processing:</strong> Waiting for email data ⏳</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
