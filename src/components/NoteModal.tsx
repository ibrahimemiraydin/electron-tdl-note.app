import React, { useEffect, useRef } from 'react';

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  noteContent: string;
  onNotesChange: (notes: string) => void;
}

const NoteModal: React.FC<NoteModalProps> = ({ isOpen, onClose, noteContent, onNotesChange }) => {
  const [noteContentState, setNoteContentState] = React.useState(noteContent);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setNoteContentState(noteContent);
    }
  }, [isOpen, noteContent]);

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

  const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteContentState(event.target.value);
    onNotesChange(event.target.value);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div ref={modalRef} className="bg-white dark:bg-slate-700 p-8 rounded-xl shadow-2xl h-[95vh] w-full max-w-2xl mx-6 animate-fadeIn">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-stone-950 dark:text-slate-200">Edit Notes</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <i className="fas fa-times text-3xl"></i>
          </button>
        </div>
        <textarea
          value={noteContentState}
          onChange={handleNotesChange}
          className="w-full h-[75vh] p-4 mt-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-600 dark:border-slate-500 dark:text-white"
          placeholder="Type your notes here..."
        />
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
