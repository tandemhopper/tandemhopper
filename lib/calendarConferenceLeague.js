const conferenceLeagueSource = 'https://www.uefa.com/uefaconferenceleague/news/02a6-20d57d15f093-a90cf54c928f-1000--2026-27-conference-league-teams-dates-draws-format-final/'

function ueclPhase(id, phase, startDate, endDate = startDate, note) {
  return {
    _id: `starter-competition-uecl-${id}`,
    name: 'UEFA Conference League',
    shortName: 'CONFERENCE LEAGUE',
    region: 'europe',
    competitionType: 'continental_club',
    phase,
    startDate,
    endDate,
    status: 'confirmed',
    ...(note ? {note} : {}),
    sourceUrls: [conferenceLeagueSource],
  }
}

export const conferenceLeagueCompetitions = [
  ueclPhase('md1-2026', 'Ligaphase · Spieltag 1', '2026-10-15'),
  ueclPhase('md2-2026', 'Ligaphase · Spieltag 2', '2026-10-22'),
  ueclPhase('md3-2026', 'Ligaphase · Spieltag 3', '2026-11-05'),
  ueclPhase('md4-2026', 'Ligaphase · Spieltag 4', '2026-11-26'),
  ueclPhase('md5-2026', 'Ligaphase · Spieltag 5', '2026-12-10'),
  ueclPhase('md6-2026', 'Ligaphase · Spieltag 6', '2026-12-17'),
  ueclPhase('playoffs-first-2027', 'K.-o.-Playoffs · Hinspiele', '2027-02-18'),
  ueclPhase('playoffs-second-2027', 'K.-o.-Playoffs · Rückspiele', '2027-02-25'),
  ueclPhase('r16-first-2027', 'Achtelfinale · Hinspiele', '2027-03-11'),
  ueclPhase('r16-second-2027', 'Achtelfinale · Rückspiele', '2027-03-18'),
  ueclPhase('qf-first-2027', 'Viertelfinale · Hinspiele', '2027-04-08'),
  ueclPhase('qf-second-2027', 'Viertelfinale · Rückspiele', '2027-04-15'),
  ueclPhase('sf-first-2027', 'Halbfinale · Hinspiele', '2027-04-29'),
  ueclPhase('sf-second-2027', 'Halbfinale · Rückspiele', '2027-05-06'),
  ueclPhase('final-2027', 'Finale', '2027-06-02', '2027-06-02', 'Finale im Beşiktaş Park in Istanbul.'),
]
