import { Editor, Transforms, Text } from 'slate';

export const isFormatActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => Text.isText(n) && n[format] === true,
    universal: true,
  });

  return !!match;
};

export const toggleFormat = (editor, format) => {
  const isActive = isFormatActive(editor, format);
  Transforms.setNodes(
    editor,
    { [format]: isActive ? null : true },
    { match: (n) => Text.isText(n), split: true }
  );
};
