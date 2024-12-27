import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

interface QuillEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange }) => {
  const quillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (quillRef.current) {
      const quill = new Quill(quillRef.current, {
        theme: 'snow',
      });

      quill.on('text-change', () => {
        onChange(quill.root.innerHTML);
      });

      quill.clipboard.dangerouslyPasteHTML(value);
    }
  }, [value, onChange]);

  return <div ref={quillRef} />;
};

export default QuillEditor;
