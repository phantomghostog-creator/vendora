'use client';

import React from 'react';
import { BuilderProvider } from '@/context/BuilderContext';
import Sidebar from '@/components/builder/Sidebar';
import Canvas from '@/components/builder/Canvas';
import Toolbar from '@/components/builder/Toolbar';

export default function BuilderPage() {
  return (
    <BuilderProvider>
      <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
        {/* Top Toolbar */}
        <Toolbar />
        
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <Sidebar />
          
          {/* Main Canvas Area */}
          <main className="flex-1 overflow-y-auto p-8 flex justify-center">
            <div className="w-full max-w-5xl">
              <Canvas />
            </div>
          </main>
        </div>
      </div>
    </BuilderProvider>
  );
}
