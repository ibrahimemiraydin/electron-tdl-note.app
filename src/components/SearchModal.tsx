import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: any) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
    }
  }, [isOpen]);

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    navigate(`/task-list?search=${searchQuery}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div ref={modalRef} className="bg-white dark:bg-slate-700 p-8 rounded-xl shadow-2xl max-w-xl w-full mx-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-stone-950 dark:text-slate-200">Search Tasks</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <i className="fas fa-times text-2xl"></i>
          </button>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-600 dark:border-slate-500 dark:text-white"
          placeholder="Type to search for tasks..."
        />
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
