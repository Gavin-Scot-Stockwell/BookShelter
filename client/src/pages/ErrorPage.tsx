const ErrorPage = () => {
    return (
      <>
        <main className="grid min-h-full place-items-center bg-[#e3d4b9] px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-[#4b3d2d]">404</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
              Page not found
            </h1>
            <p className="mt-6 text-lg font-medium text-gray-500 sm:text-xl/8">
              Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div className="mt-10 flex items-left justify-center gap-x-6">
              <a
                href= "/"
                className="rounded-md bg-[#4b3d2d] px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-[#8B5B29] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go back home
              </a>
              <a
                href="/Contact"
                className="rounded-md bg-[#4b3d2d] px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-[#8B5B29] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Contact Support
              </a>
         
          </div>
        </div>
        </main>
      </>
    )
  }
  // Split with image
  
export default ErrorPage;
