export async function GET(
  req: Request,
  { params }: { params: { postId: string } },
) {
  const { postId } = params // URL 파라미터로 전달된 postId를 가져옵니다.

  const post = { id: postId, title: `게시글 ${postId}`, content: '게시글 내용' }

  if (post) {
    return new Response(JSON.stringify(post), { status: 200 })
  } else {
    return new Response(
      JSON.stringify({ message: '게시글을 찾을 수 없습니다.' }),
      { status: 404 },
    )
  }
}
