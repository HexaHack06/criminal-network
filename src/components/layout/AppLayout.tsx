import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export const AppLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentCase, setCurrentCase] = useState('CASE-1024');

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#f4f6fc]">
      {/* Topbar spans across the top */}
      <Topbar currentCase={currentCase} setCurrentCase={setCurrentCase} onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />

      {/* Main Container below Topbar */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <main className="flex-1 overflow-y-auto bg-[#f4f6fc]">
          <Outlet context={{ currentCase, setCurrentCase }} />
        </main>
      </div>
    </div>
  );
};
