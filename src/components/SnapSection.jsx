function SnapSection({ background, mobileBackground, children, id }) {
  return (
    <section
      id={id}
      className="snap-start h-screen relative w-full overflow-hidden"
    >
      {/* Background image for desktop */}
      <img
        src={background}
        alt="section background"
        className="hidden md:block absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Background image for mobile */}
      <img
        src={mobileBackground || background}
        alt="mobile background"
        className="block md:hidden absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Section content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </section>
  )
}

export default SnapSection