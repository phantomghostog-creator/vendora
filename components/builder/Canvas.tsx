'use client';

import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useBuilder } from '@/context/BuilderContext';
import DraggableSection from './DraggableSection';
import { MousePointer2, Plus } from 'lucide-react';

export default function Canvas() {
  const { pageConfig, reorderSections, setActiveSectionId } = useBuilder();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = pageConfig.sections.findIndex((s) => s.id === active.id);
      const newIndex = pageConfig.sections.findIndex((s) => s.id === over.id);
      reorderSections(oldIndex, newIndex);
    }
  };

  return (
    <div 
      className="min-h-[800px] bg-white shadow-2xl rounded-2xl border border-gray-200 overflow-hidden pb-32"
      onClick={() => setActiveSectionId(null)}
    >
      {/* Browser Chrome Mockup */}
      <div className="h-10 bg-gray-50 border-b border-gray-200 flex items-center px-4 gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 max-w-sm mx-auto h-6 bg-white rounded border border-gray-200 flex items-center justify-center">
          <span className="text-[10px] text-gray-400 font-medium tracking-wide">yourstore.vendora.io</span>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="p-12 space-y-6">
          <SortableContext
            items={pageConfig.sections.map((s) => s.id)}
            strategy={verticalListSortingStrategy}
          >
            {pageConfig.sections.length > 0 ? (
              pageConfig.sections.map((section) => (
                <DraggableSection key={section.id} section={section} />
              ))
            ) : (
              <div className="py-32 flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-100 rounded-3xl">
                <div className="p-5 bg-indigo-50 text-indigo-500 rounded-3xl mb-6">
                  <Plus size={48} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Build your dream store</h3>
                <p className="text-gray-500 max-w-xs mx-auto">
                  Start by adding sections from the sidebar to create a high-converting landing page.
                </p>
              </div>
            )}
          </SortableContext>
        </div>
      </DndContext>
    </div>
  );
}
