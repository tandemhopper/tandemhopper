export default function ClubMarks({homeTeam, awayTeam, variant = 'default', priority = false}) {
  if (!homeTeam || !awayTeam) return null

  const teams = [homeTeam, awayTeam]
  const eager = priority || variant === 'calendar'

  return (
    <div className={`club-marks club-marks-${variant}`} aria-hidden="true">
      {teams.map((team) => (
        <span className="club-mark" key={team} title={team}>
          <img
            src={`/api/club-mark?team=${encodeURIComponent(team)}`}
            alt=""
            loading={eager ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
          />
        </span>
      ))}
    </div>
  )
}
