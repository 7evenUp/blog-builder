 import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
 import {AutoScrollPlugin} from '@lexical/react/LexicalAutoScrollPlugin';
 import {CheckListPlugin} from '@lexical/react/LexicalCheckListPlugin';
 import {ClearEditorPlugin} from '@lexical/react/LexicalClearEditorPlugin';
 import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
 import {LinkPlugin} from '@lexical/react/LexicalLinkPlugin';
 import {ListPlugin} from '@lexical/react/LexicalListPlugin';
 import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
 import {LexicalComposer} from '@lexical/react/LexicalComposer';
 import * as React from 'react';
 import {useRef} from 'react';
 
 import AutoLinkPlugin from './plugins/AutoLinkPlugin';
 import ClickableLinkPlugin from './plugins/ClickableLinkPlugin';
 import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
 import HorizontalRulePlugin from './plugins/HorizontalRulePlugin';
 import ImagesPlugin from './plugins/ImagesPlugin';
 import ToolbarPlugin from './plugins/ToolbarPlugin';
 import ContentEditable from './ui/ContentEditable';
 import Placeholder from './ui/Placeholder';
 import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme';
 import PlaygroundNodes from './nodes/PlaygroundNodes';
 
 export default function Editor(): JSX.Element {
   const text = 'Enter some plain text...'
   const placeholder = <Placeholder>{text}</Placeholder>;
   const scrollRef = useRef(null);

   const initialConfig = {
    editorState: undefined,
    namespace: 'Playground',
    nodes: [...PlaygroundNodes],
    onError: (error: Error) => {
      throw error;
    },
    theme: PlaygroundEditorTheme,
  };
 
   return (
     <LexicalComposer initialConfig={initialConfig}>
       <ToolbarPlugin />
       <div
         className="editor-container"
         ref={scrollRef}>
         <AutoFocusPlugin />
         <ClearEditorPlugin />
         <AutoLinkPlugin />
         <AutoScrollPlugin scrollRef={scrollRef} />
        <>
          <HistoryPlugin />
          <RichTextPlugin
            contentEditable={
              <div className="editor-scroller">
                <div className="editor">
                  <ContentEditable />
                </div>
              </div>
            }
            placeholder={placeholder}
            // TODO Collab support until 0.4
            initialEditorState={undefined}
          />
          <CodeHighlightPlugin />
          <ListPlugin />
          <CheckListPlugin />
          <ImagesPlugin />
          <LinkPlugin />
          <ClickableLinkPlugin />
          <HorizontalRulePlugin />
        </>
       </div>
     </LexicalComposer>
   );
 }