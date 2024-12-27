import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProfileContextMenuProps {
  isVisible: boolean;
  onClose: () => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
  onSettingsOpen: () => void;
}

const ProfileContextMenu: React.FC<ProfileContextMenuProps> = ({ isVisible, onClose, buttonRef, onSettingsOpen }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, onClose, buttonRef]);

  if (!isVisible) {
    return null;
  }

  const handleProfileClick = () => {
    navigate('/settings/my-account');
    onSettingsOpen();
    onClose();
  };

  const handleSettingsClick = () => {
    navigate('/settings/general');
    onSettingsOpen();
    onClose();
  };

  const buttonRect = buttonRef.current?.getBoundingClientRect();
  const style = buttonRect
    ? {
        top: `${buttonRect.bottom + window.scrollY}px`,
        left: `${buttonRect.left + window.scrollX}px`,
      }
    : {};

  return (
    <div
      ref={menuRef}
      className="absolute mt-2 py-2 w-56 bg-stone-50 dark:bg-slate-800 rounded-md shadow-lg z-10"
      style={style}
    >
      <button onClick={handleProfileClick} className="block px-4 py-2 text-stone-950 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-600 w-full text-left">
        Profile
      </button>
      <button onClick={handleSettingsClick} className="block px-4 py-2 text-stone-950 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-600 w-full text-left">
        Settings
      </button>
    </div>
  );
};

export default ProfileContextMenu;
