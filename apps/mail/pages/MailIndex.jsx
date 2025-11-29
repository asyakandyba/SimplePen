import { mailService } from "../services/mail.service.js"
import { SideNav } from "../cmps/SideNav.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"
import { Loader } from '../../../cmps/Loader.jsx'

const { useState, useEffect } = React
const { Outlet, useParams, useNavigate, useLocation } = ReactRouterDOM

export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState({ nav: 'inbox' })
    const [sortBy, setSortBy] = useState({ sort: 'date-down' })
    const { mailId } = useParams()
    const { pathname } = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        loadMails()
    }, [filterBy, sortBy])

    function loadMails() {
        mailService.query(filterBy, sortBy)
            .then(setMails)
            .catch(console.log)
    }

    function onSetFilterBy(filterByToEdit) {
        if (filterByToEdit.nav) navigate('/mail')
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterByToEdit }))
    }

    function onSetSortBy(sortByToEdit) {
        setSortBy(sortByToEdit)
    }

    function saveMail(mail) {
        mail.sentAt = Date.now()
        mailService.save(mail)
            .then(() => {
                setMails([mail, ...mails])
                showSuccessMsg('Sent')
            })
            .catch(() => showErrorMsg('Failed to send Mail'))
    }

    function closeCompose(mail) {
        if (mail.subject || mail.body || mail.to) {
            mailService.save(mail)
                .then(() => {
                    setMails([mail, ...mails])
                    showSuccessMsg('Added to drafts')
                })
        }
    }

    function onRemoveMail(ev, mail) {
        ev.stopPropagation()

        const mailId = mail.id
        const newMails = mail.removedAt ? mailService.remove(mailId) : mailService.save(mail)
        mail.removedAt = Date.now()

        newMails.then(() => {
            setMails(mails =>
                mails.filter(mail => mail.id !== mailId))
            showSuccessMsg('Deleted')
        })
            .catch(() => showErrorMsg('failed to delete'))
    }

    function onToggleRead(mail, ev = null) {
        if (ev) ev.stopPropagation()

        mail.isRead = !mail.isRead
        mailService.save(mail)
            .then(savedMail => {
                setMails(mails.map(mail => mail.id === savedMail.id ? savedMail : mail))
            })
    }

    function onToggleStar(mail, ev = null) {
        ev.stopPropagation()

        mail.isStarred = !mail.isStarred
        mailService.save(mail)
            .then(savedMail => {
                setMails(mails.map(mail => mail.id === savedMail.id ? savedMail : mail))
            })
    }

    if (!mails) return <Loader />

    return (
        <section className="mail-index flex space-between">
            <MailFilter onSetFilterBy={onSetFilterBy} />
            <SideNav onSetFilterBy={onSetFilterBy} />
            <main>
                {(!mailId || pathname.includes('compose')) &&
                    (<MailList mails={mails}
                        onSetSortBy={onSetSortBy}
                        onRemoveMail={onRemoveMail}
                        onToggleRead={onToggleRead}
                        onToggleStar={onToggleStar}
                    />)
                }
                <Outlet context={{ onToggleRead, saveMail, closeCompose }} />
            </main>
        </section>
    )
}

