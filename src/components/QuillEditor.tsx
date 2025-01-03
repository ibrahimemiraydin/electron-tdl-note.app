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
    // Apply Tailwind classes to Quill toolbar
    const toolbar = document.querySelector('.ql-toolbar');
    if (toolbar) {
      toolbar.classList.add('bg-gray-800', 'border-gray-600', 'text-gray-300');
      const buttons = toolbar.querySelectorAll('button');
      buttons.forEach(button => {
        button.classList.add('text-gray-300');
      });
      const pickers = toolbar.querySelectorAll('.ql-picker');
      pickers.forEach(picker => {
        picker.classList.add('text-gray-300');
      });
      const pickerOptions = toolbar.querySelectorAll('.ql-picker-options');
      pickerOptions.forEach(options => {
        options.classList.add('bg-gray-800', 'border-gray-600');
      });
    }
  }, []);

  const handleEditorChange = (value: string) => {
    setEditorContent(value);
    onEditorChange(value);
  };

  const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ];

  return (
    <div className="flex flex-col h-full">
      <ReactQuill
        value={editorContent}
        onChange={handleEditorChange}
        modules={modules}
        formats={formats}
        className="flex-grow min-h-[60vh] mb-12"
      />
    </div>
  );
};

export default QuillEditor;
