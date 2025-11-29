const { NavLink, Link } = ReactRouterDOM

export function Home() {
  return (
    <section className="home">
      <img src="assets/img/home-bg.png" />
      <div className="txt">
        <h2>Where Am I?</h2>

        <p>
          Think of this as your new digital home base. We created this easy-to-use site
          to bring the three things you use most: your emails, your notes, and your books,
          into one simple spot. It's all about cutting down on the digital clutter and
          giving you a smooth, straightforward place to get things done, learn new things,
          and stay organised. Welcome in!
        </p>

        <p>
          We are the main starting point that connects you instantly to three separate,
          but very helpful, services: a private Email system, a handy space for all your Notes,
          and a great Digital Bookstore.
        </p>
      </div>
      <section className="app-links flex">

        <div className="books">
          <div className="icon">
            <img src="assets/img/book.png" />
          </div>
          <h3>Books</h3>
        </div>

        <div className="mail">
          <NavLink to="/mail">
            <div className="icon">
              <img src="assets/img/email.png" />
            </div>
            <h3>Email</h3>
          </NavLink>
        </div>

        <div className="notes">
          <NavLink to="/note">
            <div className="icon">
              <img src="assets/img/notebook.png" />
            </div>
            <h3>Notes</h3>
          </NavLink>
        </div>
      </section>

      <footer className="flex">
        footer
      </footer>

    </section>
  )
}
