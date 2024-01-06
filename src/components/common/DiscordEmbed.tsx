export default function DiscordEmbed() {
    return (
        <iframe
            title={"Discord"}
            src="https://discord.com/widget?id=830091888332767253&theme=dark"
            height={500}
            className="discord"
            frameBorder={0}
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
            style={{ flex: 1, width: "70%", marginTop: 20, borderRadius: 8 }}
        />
    )
}