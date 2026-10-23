// Nur die gezielt reparierten Vereine sollen ihren alten Bildcache verlieren.
const PATCHED_BADGES = new Set([
  'Red Star FC',
  'AS Saint-Étienne',
  'RAEC Mons',
  'KSK Heist',
  'APOEL Nikosia',
  'APOEL Nicosia',
  'Omonia Nikosia',
  'Omonia Nicosia',
  'ALS Omonia 29M',
  'Omonia 29M',
  'Omonia 29is Maiou',
])

// Bump nur bei den drei neuen Logo-Zuordnungen. Alle übrigen URLs bleiben identisch.
const NEWLY_PATCHED_BADGES = new Set(['BSC Süd 05', 'BSG Stahl Brandenburg', 'HBS'])

export default function ClubMarks({homeTeam, awayTeam, variant = 'default', priority = false}) {
  if (!homeTeam || !awayTeam) return null

  const teams = [homeTeam, awayTeam]
  const eager = priority || variant === 'calendar'

  return (
    <div className={`club-marks club-marks-${variant}`} aria-hidden="true">
      {teams.map((team) => (
        <span className="club-mark" key={team} title={team}>
          <img
            src={`/api/club-mark?team=${encodeURIComponent(team)}&v=${NEWLY_PATCHED_BADGES.has(team) ? 5 : PATCHED_BADGES.has(team) ? 4 : 2}`}
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
