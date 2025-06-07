function SnapSection ( {background, children, id} ) {

    const bgImageStyles = {
        backgroundImage: `url(${background})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    }

    return (
        <section style={bgImageStyles} className='snap-start h-screen overflow-hidden' id={id}>
            {children}
        </section>
    )
    
}

export default SnapSection