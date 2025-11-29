import { mailService } from "../services/mail.service.js"
const { useState } = React
const { Link } = ReactRouterDOM

export function SideNav({ onSetFilterBy }) {
    const [unreadCount, setUnreadCount] = useState()
    mailService.getUnreadMails().then(setUnreadCount)

    return (
        <nav className="side-nav note-side-bar">
            <Link to="/mail/compose">
                <button>
                    <img src="assets/img/mail/compose.svg" />
                    Compose
                </button>
            </Link>
            <div className="side-bar-row" onClick={() => onSetFilterBy({ nav: 'inbox' })} >
                <img src="assets/img/mail/inbox.svg" />
                <p>Inbox {unreadCount}</p>
            </div>
            <div className="side-bar-row" onClick={() => onSetFilterBy({ nav: 'starred' })}>
                <img src="assets/img/mail/star.svg" />
                <p>Starred</p>
            </div>
            <div className="side-bar-row" onClick={() => onSetFilterBy({ nav: 'sent' })}>
                <img src="assets/img/mail/sent.svg" />
                <p>Sent</p>
            </div>
            <div className="side-bar-row" onClick={() => onSetFilterBy({ nav: 'draft' })}>
                <img src="assets/img/mail/draft.svg" />
                <p>Drafts</p>
            </div>
            <div className="side-bar-row" onClick={() => onSetFilterBy({ nav: 'trash' })}>
                <img src="assets/img/mail/trash.svg" />
                <p>Trash</p>
            </div>
        </nav>
    )
}