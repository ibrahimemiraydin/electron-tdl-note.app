import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface QuillEditorProps {
  content: string;
  onEditorChange: (content: string) => void;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ content, onEditorChange }) => {
  const [editorContent, setEditorContent] = useState<string>(content);

  useEffect(() => {
    setEditorContent(content); // Ensure editor updates when the content prop changes

    // Apply Tailwind classes to Quill toolbar for light and dark mode
    const toolbar = document.querySelector('.ql-toolbar');
    if (toolbar) {
      toolbar.classList.add('bg-gray-100', 'border-gray-300', 'dark:bg-slate-100', 'dark:border-gray-600', 'dark:text-white', 'rounded-t-lg');
      const buttons = toolbar.querySelectorAll('button');
      buttons.forEach(button => {
        button.classList.add('text-black', 'dark:text-white');
      });
      const pickers = toolbar.querySelectorAll('.ql-picker');
      pickers.forEach(picker => {
        picker.classList.add('text-black', 'dark:text-white');
      });
      const pickerOptions = toolbar.querySelectorAll('.ql-picker-options');
      pickerOptions.forEach(options => {
        options.classList.add('bg-gray-200', 'border-gray-300', 'dark:bg-gray-800', 'dark:border-gray-600', 'text-black', 'dark:text-black');
      });
    }

    // Apply Tailwind classes to Quill editor for dark mode text
    const editor = document.querySelector('.ql-editor');
    if (editor) {
      editor.classList.add('text-black', 'dark:text-white', 'dark:bg-slate-700', 'overflow-y-auto', 'max-h-[76vh]', 'rounded-b-lg', 'scrollbar-thin', 'scrollbar-thumb-gray-400', 'scrollbar-track-gray-200', 'dark:scrollbar-thumb-gray-600', 'dark:scrollbar-track-gray-800');
    }

    // Apply Tailwind classes to the Quill container for the rounded bottom
    const container = document.querySelector('.ql-container');
    if (container) {
      container.classList.add('rounded-b-lg', 'border', 'border-gray-300', 'dark:border-gray-600', 'h-full');
      (container as HTMLElement).style.maxHeight = '76vh'; // Set the max height of the container
    }
  }, [content]);

  const handleEditorChange = (value: string) => {
    setEditorContent(value);
    onEditorChange(value);
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }], // Headers from h1 to h6
      [{ 'size': ['small', false, 'large', 'huge'] }], // Custom font sizes
      [{ 'align': [] }], // Text alignment including justify
      [{ 'color': [] }, { 'background': [] }], // Color and background color
      [{ 'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'script': 'sub' }, { 'script': 'super' }], // Subscript and superscript
      [{ 'direction': 'rtl' }], // Right-to-left text direction
      ['link', 'image', 'video'],
      ['code-block'], // Code block
      ['code'], // Inline code
      ['clean'] // Remove formatting
    ],
  };

  const formats = [
    'header', 'font', 'align', 'color', 'background', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent', 'script', 'direction',
    'link', 'image', 'video', 'code-block', 'code'
  ];

  return (
    <div className="flex flex-col h-full">
      <ReactQuill
        value={editorContent}
        onChange={handleEditorChange}
        modules={modules}
        formats={formats}
        className="flex-grow bg-white dark:bg-slate-700 dark:text-white rounded-lg"
      />
    </div>
  );
};

export default QuillEditor;
