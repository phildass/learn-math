export function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Learn Math</h3>
            <p className="text-gray-300 text-sm">
              Part of the iiskills.cloud platform - Advanced Mathematics Tutorial Platform
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-300 hover:text-white">Home</a>
              </li>
              <li>
                <a href="/forum" className="text-gray-300 hover:text-white">Forum</a>
              </li>
              <li>
                <a href="/profile" className="text-gray-300 hover:text-white">Profile</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">iiskills.cloud</h3>
            <p className="text-gray-300 text-sm">
              © {new Date().getFullYear()} iiskills.cloud. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
