import React from 'react';
import { Menu, Item } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';

interface TaskContextMenuProps {
  onRenameClick: (taskId: number) => void;
  onTrashClick: (taskId: number) => void;
  onPropertiesClick: (taskId: number) => void;
}

const TaskContextMenu: React.FC<TaskContextMenuProps> = ({ onRenameClick, onTrashClick, onPropertiesClick }) => {
  return (
    <>
      <Menu id="task-context-menu" className="dark:bg-slate-100 dark:border-slate-600 dark:text-slate-200">
        <Item onClick={({ props }) => onRenameClick(props.taskId)}>Rename</Item>
        <Item onClick={({ props }) => onTrashClick(props.taskId)}>Move to Trash</Item>
        <Item onClick={({ props }) => onPropertiesClick(props.taskId)}>Properties</Item>
      </Menu>
    </>
  );
};

export default TaskContextMenu;
