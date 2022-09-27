export type PostsData = Array<PostStateData>

export type PostStateData = {
  children?: Array<{
    text: string
    format: 0 | 1 | 2 | 4 | 8 | 32 | 64
    listType?: 'bullet' | 'number'
    children?: Array<{
      children: Array<{
        type: 'listitem'
        children: Array<{
          text: string
        }>
      }>
    }>
  }>
  tag: 'h1' | 'h2' | 'h3' | 'p' | 'ul' | 'ol' | 'li'
  direction?: 'ltr' | null
  format?: '' | 'left' | 'center' | 'right'
  type: 'heading' | 'paragraph' | 'list' | 'quote' | 'code' | 'horizontalrule'
}