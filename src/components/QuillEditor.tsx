import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

interface QuillEditorProps {
  content: string;
  onEditorChange: (content: string) => void;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ content, onEditorChange }) => {
  const [editorContent, setEditorContent] = useState<string>(content);

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
        className="flex-grow min-h-[60vh] mb-12" // Added margin-bottom to create space at the bottom
      />
    </div>
  );
};

export default QuillEditor;
