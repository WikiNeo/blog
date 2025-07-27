import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'

/**
 * Sort posts with pinned posts at the top, then by date (newest first)
 */
export function sortPostsWithPinned(posts: CoreContent<Blog>[]): CoreContent<Blog>[] {
  return posts.sort((a, b) => {
    // First, sort by pinned status
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    
    // If both have same pinned status, sort by date (newest first)
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
} 