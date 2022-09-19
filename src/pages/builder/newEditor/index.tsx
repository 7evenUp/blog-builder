import {$getRoot, $getSelection} from 'lexical';
import {useEffect, useRef} from 'react';

import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import {AutoScrollPlugin} from '@lexical/react/LexicalAutoScrollPlugin';
import {CheckListPlugin} from '@lexical/react/LexicalCheckListPlugin';
import {ClearEditorPlugin} from '@lexical/react/LexicalClearEditorPlugin';
import {LinkPlugin} from '@lexical/react/LexicalLinkPlugin';
import {ListPlugin} from '@lexical/react/LexicalListPlugin';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import Buttons from './components/Buttons';
import TreeViewPlugin from './plugins/TreeViewPlugin';

// const theme = {
//   // Theme styling goes here
//   ...
// }

// When the editor changes, you can get notified via the
// LexicalOnChangePlugin!
function onChange(editorState) {
  editorState.read(() => {
    // Read the contents of the EditorState here.
    const root = $getRoot();
    const selection = $getSelection();
    console.log('NODEs', selection?.getNodes())

    root.

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
  const scrollRef = useRef(null);
  const initialConfig = {
    namespace: 'MyEditor', 
    // theme,
    onError,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div
        className="w-2/3 border-l border-slate-300 relative pl-2"
        ref={scrollRef}
      >
        <AutoFocusPlugin />
        <ClearEditorPlugin />
        <AutoScrollPlugin scrollRef={scrollRef} />
        <RichTextPlugin
          contentEditable={
            <div className="editor-scroller">
              <div className="editor">
                <ContentEditable className="outline-none" />
              </div>
            </div>
          }
          placeholder={<div className="absolute top-0 left-2 select-none text-slate-400">Enter some text...</div>}
        />
        <OnChangePlugin onChange={onChange} />
        <HistoryPlugin />
        <MyCustomAutoFocusPlugin />
        {/* <ListPlugin /> */}
        <CheckListPlugin />
        {/* <LinkPlugin /> */}
        <TreeViewPlugin />
      </div>
      <Buttons />
      
    </LexicalComposer>
  );
}