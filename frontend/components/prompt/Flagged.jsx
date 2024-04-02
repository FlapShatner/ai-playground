const FlagMessage = () => {
    return (
        <div>
            <p className="text-black font-bold">Sorry! Our AI moderator thinks this prompt is probably against our community standards.</p>
            <p className="text-black mt-2 text-sm font-bold">ALLOWED</p>
            <ul className="text-sm list-disc">
                <li>Any image up to PG-13 rating involving fiction, fantasy, mythology.</li>
                <li>Real images that may be seen as respectful or light-hearted parodies, satire, caricatures.</li>
                <li>Imaginary or exaggerated real-life scenarios, including absurd or humorous situations.</li>
            </ul>
            <p className="text-black mt-2 text-sm font-bold" >NOT ALLOWED</p>
            <ul className="text-sm list-disc">
                <li>
                    Disrespectful, harmful, misleading public figures/events portrayals or potential to mislead.
                </li>
                <li>Hate speech, explicit or real-world violence.</li>
                <li>Nudity or unconsented overtly sexualized public figures.</li>
            </ul>
        </div>
    )
}

export default FlagMessage

