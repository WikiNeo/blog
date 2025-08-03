'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RandomBlogButton() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleRandomBlog = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/random-blog')
      if (response.ok) {
        const data = await response.json()
        router.push(data.path)
      } else {
        console.error('Failed to get random blog post')
        alert('Sorry, could not load a random blog post. Please try again.')
      }
    } catch (error) {
      console.error('Error fetching random blog:', error)
      alert('Sorry, could not load a random blog post. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleRandomBlog}
      disabled={loading}
      className="rounded-full bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {loading ? 'Loading...' : '🎲 Random Blog'}
    </button>
  )
}