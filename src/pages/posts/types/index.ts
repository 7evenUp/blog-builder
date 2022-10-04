export type PostsDataType = Array<PostDataType>

export type PostDataType = {
  children: Array<{
    text: string
    format: 0 | 1 | 2 | 4 | 8 | 32 | 64
    children?: Array<{
      children: Array<{
        type: 'listitem'
        children: Array<{
          text: string
        }>
      }>
    }>
  }>
  listType?: 'bullet' | 'number' | 'check'
  tag: 'h1' | 'h2' | 'h3' | 'p' | 'ul' | 'ol' | 'li'
  direction?: 'ltr' | null
  format?: '' | 'left' | 'center' | 'right'
  type: 'heading' | 'paragraph' | 'list' | 'quote' | 'code' | 'horizontalrule'
}

export type PostParagraphType = {
  type: 'text' | 'link' | 'linebreak'
  url?: string
}

export type TextNodeType = {
  format: 0 | 1 | 2 | 4 | 8 | 32 | 64
  text: string
}

export type PostImageType = {
  altText: string
  src: string
}

export type PostListType = {
  listType: 'bullet' | 'number' | 'check'
  children: Array<{
    children: Array<TextNodeType>
    type: 'listitem'
  }>
}