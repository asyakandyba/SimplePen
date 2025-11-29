import { mailService } from "../services/mail.service.js"
import { utilService } from "../../../services/util.service.js"
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
    const userName = utilService.getUserName(from)

    return (
        <section className="mail-details">
            <div className="flex column">
                <h1>{subject}</h1>
                <div className="account">
                    <img src="assets/img/mail/account.svg" />
                    <h3>{userName}</h3>
                    <p>{`<${from}>`}</p>
                </div>
                <p>{body}</p>
                <button><Link to="/mail">Back</Link></button>
            </div>
        </section>
    )
}