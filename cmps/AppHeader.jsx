const { Link, NavLink, useParams, useLocation } = ReactRouterDOM
const { useState, useEffect } = React

export function AppHeader() {
  const { pathname } = useLocation()

  function toggleMenu() {
    if (pathname === '/note') {
      document.body.classList.toggle('note-menu-open')
    }
    if (pathname === '/mail') {
      document.body.classList.toggle('note-menu-open')
    }
  }

  return (
    <header className="app-header">
      <div
        onClick={toggleMenu}
        className={`burger-container ${
          pathname.includes('/note') || pathname.includes('/mail')
            ? ''
            : 'noBurger'
        }`}
      >
        <img className="burger" src="assets/img/note/burger.png" />
      </div>

      <Link to="/">
        {(pathname === '/' || pathname === '/about') && (
          <img className="logo" src="assets/img/main/logo-hub.png" />
        )}
        {pathname.includes('/mail') && (
          <img className="logo" src="assets/img/main/logo-email.png" />
        )}
        {pathname.includes('/note') && (
          <img className="logo" src="assets/img/main/logo-notes.png" />
        )}
        {pathname.includes('/book') && (
          <img className="logo" src="assets/img/main/logo-books.png" />
        )}
      </Link>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/mail">Email</NavLink>
        <NavLink to="/note">Notes</NavLink>
        <NavLink to="/book">Books</NavLink>
        <NavLink to="/about">About us</NavLink>
      </nav>
    </header>
  )
}
