import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto p-4">
        <Outlet />
      </div>
    </div>
  );
}
