import { utilService } from "../../../services/util.service.js"

const { useState } = React
const { useNavigate } = ReactRouterDOM

export function MailPreview({ mail, onRemoveMail, onToggleRead, onToggleStar }) {
    const { from, subject, body, sentAt, isRead, isStarred } = mail

    const [isHovering, setIsHovering] = useState(false)
    const navigate = useNavigate()

    function handleMouseEnter() {
        setIsHovering(true)
    }

    function handleMouseLeave() {
        setIsHovering(false)
    }

    function navigation() {
        if (mail.sentAt) navigate(`/mail/${mail.id}`)
        else navigate(`/mail/compose/${mail.id}`)
    }

    let month = ''
    let day = ''
    if (sentAt) {
        const date = new Date(sentAt)
        month = utilService.getMonthNameShort(date)
        day = date.getDate()
    }

    const userName = utilService.getUserName(from)

    const classRead = isRead ? 'read' : ''
    const readImg = isRead ? 'mail-read' : 'mail-unread'
    const starImg = isStarred ? 'full-star.png' : 'star.svg'

    return (
        <article className={`mail-preview ${classRead}`}
            onClick={navigation}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div onClick={event => onToggleStar(mail, event)}>
                <img src={`assets/img/mail/${starImg}`} />
            </div>
            <p><span>{userName}</span></p>
            <p className="content">{subject} - {body}</p>

            {!isHovering && <p>{day} {month}</p>}
            {isHovering &&
                <section className="flex">

                    <div onClick={event => onRemoveMail(event, mail)}>
                        <img src="assets/img/mail/trash.svg" />
                    </div>

                    <div onClick={event => onToggleRead(mail, event)}>
                        <img src={`assets/img/mail/${readImg}.svg`} />
                    </div>

                </section>
            }
        </article>
    )
}