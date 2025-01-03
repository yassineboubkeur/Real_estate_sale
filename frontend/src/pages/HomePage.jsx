import React from 'react'

const HomePage = () => {
  return (
    <div>
      {/* Banner */}
      <div
        id="intro"
        className="bg-image shadow-2-strong"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG91c2UlMjB2ZW50ZXxlbnwwfHwwfHx8MA%3D%3D')",
          height: "100vh",
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
        }}
      >
        <div
          className="mask d-flex align-items-center justify-content-center text-center text-white"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            height: "100%",
            padding: "0 20px",
          }}
        >
          <div className="container">
            <h1 className="mb-3 display-3 fw-bold" style={{ fontSize: "4rem" }}>
              Real Estate Sale
            </h1>
            <p className="mb-4 lead" style={{ fontSize: "1.25rem" }}>
              Discover the best properties for sale
            </p>
            <div>
              <a
                className="btn btn-outline-light btn-lg"
                href="https://mdbootstrap.com"
                target="_blank"
                rel="noreferrer"
              >
                Download MDB
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
