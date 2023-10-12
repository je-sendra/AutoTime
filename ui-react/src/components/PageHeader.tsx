export default function PageHeader(props: { title: string, subtitle: string }) {
    return (
        <>
            <div
                className="p-4 bg-secondary text-white text-center"
            >
                <h1>{props.title}</h1>
                <p>{props.subtitle}</p>
            </div>
        </>
    )
}