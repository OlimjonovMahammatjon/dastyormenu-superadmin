import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center space-y-6 p-8">
        <div className="flex justify-center">
          <div className="p-4 bg-red-50 rounded-full">
            <AlertCircle className="h-16 w-16 text-red-600" />
          </div>
        </div>
        <div>
          <h1 className="text-6xl font-bold text-gray-900">404</h1>
          <p className="text-xl text-gray-600 mt-2">Page Not Found</p>
          <p className="text-gray-500 mt-2">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>
        <Link to="/">
          <Button>Go Back to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
