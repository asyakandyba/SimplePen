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

    return (
        <article className={`mail-preview flex align-center space-between ${classRead}`}
            onClick={navigation}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div onClick={event => onToggleStar(mail, event)}>
                {isStarred &&
                    <svg xmlns="http://www.w3.org/2000/svg"
                        height="18" viewBox="0 0 24 24" width="18" fill="gold">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                }
                {!isStarred &&
                    <svg xmlns="http://www.w3.org/2000/svg" fill="gray"
                        enable-background="new 0 0 24 24" height="18" viewBox="0 0 24 24" width="18">
                        <g><g><path d="M0,0h24v24H0V0z" fill="none" /></g></g>
                        <g><path d="M12,8.89L12.94,12h2.82l-2.27,1.62l0.93,3.01L12,14.79l-2.42,1.84l0.93-3.01L8.24,12h2.82L12,8.89 M12,2l-2.42,8H2 l6.17,4.41L5.83,22L12,17.31L18.18,22l-2.35-7.59L22,10h-7.58L12,2L12,2z" />
                        </g></svg>
                }
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