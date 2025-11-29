const { useState } = React

export function LongTxt({ txt, length = 100 }) {

    // const [isShowFullTxt, setIsShowFullTxt] = useState(false)

    // function onToggleIsShowFullTxt() {
    //     setIsShowFullTxt(isShowFullTxt => !isShowFullTxt)
    // }

    const isLongerThanLimit = txt.length > length
    const textToShow = isLongerThanLimit? (txt.substring(0, length)) + '...' : txt
    return (
        <section className="long-txt">
                <p className="txt">{textToShow}</p>
        </section>
    );
}