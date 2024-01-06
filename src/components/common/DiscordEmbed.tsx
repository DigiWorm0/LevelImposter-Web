export default function DiscordEmbed() {
    return (
        <iframe
            title={"Discord"}
            src="https://discord.com/widget?id=830091888332767253&theme=dark"
            height={500}
            style={{ maxWidth: 1000 }}
            className="discord rounded w-100 border-0"
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        />
    )
}