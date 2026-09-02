export default function ClubMarks({homeTeam, awayTeam, variant = 'default'}) {
  if (!homeTeam || !awayTeam) return null

  const teams = [homeTeam, awayTeam]

  return (
    <div className={`club-marks club-marks-${variant}`} aria-hidden="true">
      {teams.map((team) => (
        <span className="club-mark" key={team} title={team}>
          <img
            src={`/api/club-mark?team=${encodeURIComponent(team)}`}
            alt=""
            loading="lazy"
            decoding="async"
          />
        </span>
      ))}
    </div>
  )
}
