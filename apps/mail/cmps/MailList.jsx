import { MailPreview } from "./MailPreview.jsx"

const { useState, useEffect } = React

export function MailList({ mails, onSetSortBy, onRemoveMail, onToggleRead, onToggleStar }) {
    const [isAlphaUp, setIsAlphaUp] = useState(false)
    const [activeSort, setActiveSort] = useState('date-down')

    let alphaDir = ''
    function onSortByAlpha() {
        setIsAlphaUp(isAlphaUp => !isAlphaUp)
        alphaDir = isAlphaUp ? 'alpha-up' : 'alpha-down'
        onSetSortBy({ sort: alphaDir })
        setActiveSort('alpha')
    }

    function onSortByDate(sort) {
        onSetSortBy({ sort: sort })
        setActiveSort(sort)
    }

    console.log('activeSort:', activeSort)

    return (
        <section className="mail-list">
            <section className="sort flex">
                <div
                    className={activeSort === 'date-down' ? 'active' : ''}
                    onClick={() => onSortByDate('date-down')}>
                    <img src="assets/img/mail/sort-time-down.svg" />
                </div>
                <div
                    className={activeSort === 'date-up' ? 'active' : ''}
                    onClick={() => onSortByDate('date-up')}>
                    <img src="assets/img/mail/sort-time-up.svg" />
                </div>
                <div
                    className={activeSort === 'alpha' ? 'active' : ''}
                    onClick={onSortByAlpha}>
                    <img src="assets/img/mail/sort-alpha.svg" />
                </div>
            </section>
            <ul>
                {mails.map(mail =>
                    <li key={mail.id}>
                        <MailPreview
                            mail={mail}
                            onRemoveMail={onRemoveMail}
                            onToggleRead={onToggleRead}
                            onToggleStar={onToggleStar}
                        />
                    </li>
                )}
            </ul>
        </section >
    )
}
