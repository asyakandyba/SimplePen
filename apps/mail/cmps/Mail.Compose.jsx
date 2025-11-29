import { mailService } from '../services/mail.service.js'
import { utilService } from '../../../services/util.service.js'
import { showErrorMsg } from '../../../services/event-bus.service.js'

const { useState, useEffect } = React
const { useNavigate, useParams, useSearchParams, useOutletContext } =
    ReactRouterDOM

export function MailCompose() {
    const [mail, setMail] = useState(mailService.getEmptyMail())
    const [isLoading, setIsLoading] = useState(false)
    const { saveMail, closeCompose } = useOutletContext()

    const [searchParams, setSearchParams] = useSearchParams()
    const { mailId } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        setSearchParams(utilService.getValidValues({ subject, body }))
    }, [mail])

    useEffect(() => {
        if (mailId) loadMail()
        if (searchParams.get('subject')) {
            mail.subject = searchParams.get('subject')
            setMail(mail)
        }
        if (searchParams.get('body')) {
            mail.body = searchParams.get('body')
            setMail(mail)
        }
    }, [])

    function loadMail() {
        setIsLoading(true)
        mailService
            .get(mailId)
            .then(setMail)
            .catch(() => showErrorMsg('Failed to load mail'))
            .finally(() => setIsLoading(false))
    }

    function onSaveMail(ev, mail) {
        ev.preventDefault()
        onCloseCompose(mail)
        saveMail(mail)
    }

    function onCloseCompose(mail) {
        navigate('/mail')
        closeCompose(mail)
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break

            case 'checkbox':
                value = target.checked
                break
        }
        setMail(prevMail => ({ ...prevMail, [field]: value }))
    }

    function mailToNote() {
        let subject = searchParams.get('subject')
        let body = searchParams.get('body')

        if (!subject) subject = ''
        if (!body) body = ''

        navigate(`/note?title=${subject}&txt=${body}&fromMail=${true}`)
    }

    const loadingClass = isLoading ? 'loading' : ''
    let { to, subject, body } = mail

    return (
        <form
            className={`mail-compose flex column ${loadingClass}`}
            onSubmit={event => onSaveMail(event, mail)}
        >
            <section className="flex">
                <p>New Message</p>

                <button onClick={mailToNote}>
                    <img src="assets/img/mail/make-note.svg" />
                </button>

                <button type="button" onClick={() => onCloseCompose(mail)}>
                    <img src="assets/img/mail/close.svg" />
                </button>
            </section>

            <input
                onChange={handleChange}
                type="text"
                name="to"
                id="to"
                value={to}
                placeholder="To"
            ></input>

            <input
                onChange={handleChange}
                type="text"
                name="subject"
                id="subject"
                value={subject}
                placeholder="Subject"
            ></input>

            <textarea
                onChange={handleChange}
                name="body"
                id="body"
                value={body}
            ></textarea>
            <button>Send</button>
        </form>
    )
}
