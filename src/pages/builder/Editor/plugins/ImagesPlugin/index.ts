/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
 import type {LexicalCommand} from 'lexical';

 import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
 import {mergeRegister} from '@lexical/utils';
 import {
   $getSelection,
   $isRangeSelection,
   $isRootNode,
   COMMAND_PRIORITY_EDITOR,
   createCommand,
 } from 'lexical';
 import {useEffect} from 'react';
 
 import {
   $createImageNode,
   ImageNode,
   ImagePayload,
 } from '../../nodes/ImageNode';
 
 export type InsertImagePayload = Readonly<ImagePayload>;
 
 export const INSERT_IMAGE_COMMAND: LexicalCommand<InsertImagePayload> =
   createCommand();
 export default function ImagesPlugin({
   captionsEnabled,
 }: {
   captionsEnabled?: boolean;
 }): JSX.Element | null {
   const [editor] = useLexicalComposerContext();
 
   useEffect(() => {
     if (!editor.hasNodes([ImageNode])) {
       throw new Error('ImagesPlugin: ImageNode not registered on editor');
     }
 
     return mergeRegister(
       editor.registerCommand<InsertImagePayload>(
         INSERT_IMAGE_COMMAND,
         (payload) => {
           const selection = $getSelection();
           if ($isRangeSelection(selection)) {
             if ($isRootNode(selection.anchor.getNode())) {
               selection.insertParagraph();
             }
             const imageNode = $createImageNode({captionsEnabled, ...payload});
             selection.insertNodes([imageNode]);
           }
           return true;
         },
         COMMAND_PRIORITY_EDITOR,
       ),
     );
   }, [captionsEnabled, editor]);
 
   return null;
 }