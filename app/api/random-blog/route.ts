import { allBlogs } from 'contentlayer/generated'
import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Get all published blog posts
    const sortedPosts = allCoreContent(sortPosts(allBlogs))

    // Filter out drafts in production
    const publishedPosts = sortedPosts.filter((post) => {
      if (process.env.NODE_ENV === 'production') {
        return !post.draft
      }
      return true
    })

    if (publishedPosts.length === 0) {
      return NextResponse.json({ error: 'No blog posts found' }, { status: 404 })
    }

    // Select a random post
    const randomIndex = Math.floor(Math.random() * publishedPosts.length)
    const randomPost = publishedPosts[randomIndex]

    // Return the random post's path for redirection
    return NextResponse.json({
      slug: randomPost.slug,
      path: `/blog/${randomPost.slug}`,
      title: randomPost.title,
    })
  } catch (error) {
    console.error('Error getting random blog post:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
