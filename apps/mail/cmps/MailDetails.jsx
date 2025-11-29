import { mailService } from "../services/mail.service.js"
import { Loader } from "../../../cmps/Loader.jsx"

const { useState, useEffect } = React
const { useParams, Link, useOutletContext } = ReactRouterDOM

export function MailDetails() {
    const [mail, setMail] = useState(null)
    const { mailId } = useParams()
    const { onToggleRead } = useOutletContext()

    useEffect(() => {
        loadMail()
    }, [])

    function loadMail() {
        mailService.get(mailId)
            .then(setMail)
            .catch(console.log)
    }

    if (!mail) return <Loader />
    if (!mail.isRead) onToggleRead(mail)

    const { from, subject, body, sentAt } = mail
    
    return (
        <section className="mail-details">
            <h1>{subject}</h1>
            <h3>{from}</h3>
            <p>{body}</p>
            <button><Link to="/mail">Back</Link></button>
        </section>
    )
}