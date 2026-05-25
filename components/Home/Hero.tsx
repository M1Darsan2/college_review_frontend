import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-8">

        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Educational Institutes{" "}
            <span className="text-blue-600">Review Platform</span>
          </h1>
          <p className="text-gray-500 text-base sm:text-lg max-w-xl">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis autem odio atque soluta molestiae, labore incidunt voluptas error?
          </p>
        </div>

        <div className="flex items-center gap-4 flex-wrap justify-center">
          <Link
            href="/share-story"
            className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
          >
            Share your story
          </Link>
          <Link
            href="/reviews"
            className="px-6 py-3 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 text-sm font-medium transition-colors"
          >
            Browse Reviews
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Hero