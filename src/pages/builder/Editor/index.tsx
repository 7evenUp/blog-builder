import {$getRoot, $getSelection} from 'lexical';
import {useEffect} from 'react';

import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';

// const theme = {
//   // Theme styling goes here
//   ...
// }

function focusEditor() {
  const [editor] = useLexicalComposerContext()
  
  editor.focus()
}

// When the editor changes, you can get notified via the
// LexicalOnChangePlugin!
function onChange(editorState) {
  editorState.read(() => {
    // Read the contents of the EditorState here.
    const root = $getRoot();
    const selection = $getSelection();

    console.log(root, selection);
  });
}

// Lexical React plugins are React components, which makes them
// highly composable. Furthermore, you can lazy load plugins if
// desired, so you don't pay the cost for plugins until you
// actually use them.
function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Focus the editor when the effect fires!
    editor.focus();
    console.log('FOCUSED!')
  }, [editor]);

  return null;
}

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error) {
  console.error(error);
}

export default function Editor() {
  // const [editor] = useLexicalComposerContext();

  const initialConfig = {
    namespace: 'MyEditor', 
    // theme,
    onError,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div
        className="border rounded-xl focus:outline-none w-5/6 relative h-full flex-grow"
        // onClick={() => editor.focus()}
      >
        <PlainTextPlugin
          contentEditable={<ContentEditable />}
          placeholder={<div className="absolute -top-6">Enter some text...</div>}
        />
        <OnChangePlugin onChange={onChange} />
        <HistoryPlugin />
        <MyCustomAutoFocusPlugin />
      </div>
      
    </LexicalComposer>
  );
}