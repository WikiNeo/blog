import { ReactNode } from 'react'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import RandomBlogButton from '@/components/RandomBlogButton'

interface LayoutProps {
  content: CoreContent<Blog>
  children: ReactNode
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  tagNext?: { path: string; title: string }
  tagPrev?: { path: string; title: string }
  primaryTag?: string
}

export default function PostLayout({
  content,
  next,
  prev,
  tagNext,
  tagPrev,
  primaryTag,
  children,
}: LayoutProps) {
  const { path, slug, date, title } = content

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div>
          <header>
            <div className="space-y-1 border-b border-gray-200 pb-10 text-center dark:border-gray-700">
              <dl>
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 xl:divide-y-0 dark:divide-gray-700">
            <div className="divide-y divide-gray-200 xl:col-span-3 xl:row-span-2 xl:pb-0 dark:divide-gray-700">
              <div className="prose dark:prose-invert max-w-none pt-10 pb-8">{children}</div>
            </div>
            {siteMetadata.comments && (
              <div className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300" id="comment">
                <Comments slug={slug} />
              </div>
            )}
            <footer>
              {/* Tag-specific navigation - only show if different from general navigation */}
              {primaryTag &&
                (tagNext || tagPrev) &&
                (tagPrev?.path !== prev?.path || tagNext?.path !== next?.path) && (
                  <div className="mb-4 border-b border-gray-200 pb-4 dark:border-gray-700">
                    <h2 className="mb-2 text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                      In "{primaryTag}" tag
                    </h2>
                    <div className="flex flex-col space-y-2 text-sm font-medium sm:flex-row sm:justify-between sm:space-y-0 sm:text-base">
                      {tagPrev && tagPrev.path && (
                        <div>
                          <div className="text-xs tracking-wide text-gray-400 uppercase dark:text-gray-500">
                            Previous in tag
                          </div>
                          <Link
                            href={`/${tagPrev.path}`}
                            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            aria-label={`Previous post in ${primaryTag}: ${tagPrev.title}`}
                          >
                            &larr; {tagPrev.title}
                          </Link>
                        </div>
                      )}
                      {tagNext && tagNext.path && (
                        <div className="text-right">
                          <div className="text-xs tracking-wide text-gray-400 uppercase dark:text-gray-500">
                            Next in tag
                          </div>
                          <Link
                            href={`/${tagNext.path}`}
                            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            aria-label={`Next post in ${primaryTag}: ${tagNext.title}`}
                          >
                            {tagNext.title} &rarr;
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              {/* General navigation */}
              <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
                {prev && prev.path && (
                  <div className="pt-4 xl:pt-8">
                    <Link
                      href={`/${prev.path}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                      aria-label={`Previous post: ${prev.title}`}
                    >
                      &larr; {prev.title}
                    </Link>
                  </div>
                )}
                {next && next.path && (
                  <div className="pt-4 xl:pt-8">
                    <Link
                      href={`/${next.path}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                      aria-label={`Next post: ${next.title}`}
                    >
                      {next.title} &rarr;
                    </Link>
                  </div>
                )}
              </div>
              <div className="flex justify-center pt-4 xl:pt-8">
                <RandomBlogButton />
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
