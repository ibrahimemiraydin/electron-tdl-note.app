import React, { useEffect, useRef } from 'react';
import QuillEditor from './QuillEditor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faSave } from '@fortawesome/free-solid-svg-icons';

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskName: string;
  noteContent: string;
  onNotesChange: (content: string) => void;
}

const NoteModal: React.FC<NoteModalProps> = ({ isOpen, onClose, taskName, noteContent, onNotesChange }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const autoSaveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    if (isOpen && autoSaveRef.current) {
      autoSaveRef.current.classList.add('smooth-blink');
      setTimeout(() => {
        if (autoSaveRef.current) {
          autoSaveRef.current.classList.remove('smooth-blink');
          autoSaveRef.current.classList.add('smooth-fade-out');
        }
      }, 4000); // 4 seconds for two smooth blinks
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div ref={modalRef} className="bg-white dark:bg-slate-700 p-8 rounded-xl shadow-2xl h-[95vh] w-full max-w-4xl mx-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <i className="fas fa-times text-3xl"></i>
        </button>
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold text-stone-950 dark:text-slate-200">{taskName}</h2> {/* Display task name */}
          </div>
          <div className="flex-grow flex flex-col mb-4">
            <QuillEditor content={noteContent} onEditorChange={onNotesChange} />
          </div>
          <div ref={autoSaveRef} className="absolute bottom-2 right-9 flex items-center text-sm text-gray-500 dark:text-gray-400">
            <FontAwesomeIcon icon={faSave} className="mr-2" />
            <p>Auto Saving</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
