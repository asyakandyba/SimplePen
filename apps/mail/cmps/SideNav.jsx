import { mailService } from "../services/mail.service.js"
const { useState } = React
const { Link } = ReactRouterDOM

export function SideNav({ onSetFilterBy }) {
    const [unreadCount, setUnreadCount] = useState()
    const [activeFilter, setActivFilter] = useState('inbox')
    mailService.getUnreadMails().then(setUnreadCount)

    function setFilter(nav) {
        onSetFilterBy({ nav })
        setActivFilter(nav)
    }


    return (
        <nav className="side-nav">
            <Link to="/mail/compose">
                <button>
                    <img src="assets/img/mail/compose.svg" />
                    <p>Compose</p>
                </button>
            </Link>
            <section className="mail-navs">
                <div className={`nav-row ${activeFilter === 'inbox' ? 'active' : ''}`}
                    onClick={() => setFilter('inbox')} >
                    <img src="assets/img/mail/inbox.svg" />
                    <p>Inbox <span>{unreadCount}</span></p>
                </div>
                <div className={`nav-row ${activeFilter === 'starred' ? 'active' : ''}`}
                    onClick={() => setFilter('starred')}>
                    <img src="assets/img/mail/star.svg" />
                    <p>Starred</p>
                </div>
                <div className={`nav-row ${activeFilter === 'sent' ? 'active' : ''}`}
                    onClick={() => setFilter('sent')}>
                    <img src="assets/img/mail/sent.svg" />
                    <p>Sent</p>
                </div>
                <div className={`nav-row ${activeFilter === 'draft' ? 'active' : ''}`}
                    onClick={() => setFilter('draft')}>
                    <img src="assets/img/mail/draft.svg" />
                    <p>Drafts</p>
                </div>
                <div className={`nav-row ${activeFilter === 'trash' ? 'active' : ''}`}
                    onClick={() => setFilter('trash')}>
                    <img src="assets/img/mail/trash.svg" />
                    <p>Trash</p>
                </div>
            </section>
        </nav >
    )
}