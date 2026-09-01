const cafSource = 'https://www.cafonline.com/news/caf-announces-match-calendar-for-totalenergies-caf-champions-league-2026-27-and-totalenergies-caf-confederation-cup-2026-27-seasons/'

function cafClPhase(id, phase, startDate, endDate = startDate, status = 'confirmed', note) {
  return {
    _id: `starter-competition-cafcl-${id}`,
    name: 'CAF Champions League',
    shortName: 'CAF CHAMPIONS LEAGUE',
    region: 'africa',
    competitionType: 'continental_club',
    phase,
    startDate,
    endDate,
    status,
    ...(note ? {note} : {}),
    sourceUrls: [cafSource],
  }
}

export const cafChampionsLeagueCompetitions = [
  cafClPhase('prelim1-first-2026', '1. Vorrunde · Hinspiele', '2026-09-04', '2026-09-06'),
  cafClPhase('prelim1-second-2026', '1. Vorrunde · Rückspiele', '2026-09-11', '2026-09-13'),
  cafClPhase('prelim2-first-2026', '2. Vorrunde · Hinspiele', '2026-10-16', '2026-10-18'),
  cafClPhase('prelim2-second-2026', '2. Vorrunde · Rückspiele', '2026-10-23', '2026-10-25'),
  cafClPhase('md1-2026', 'Gruppenphase · Spieltag 1', '2026-11-27', '2026-11-29'),
  cafClPhase('md2-2026', 'Gruppenphase · Spieltag 2', '2026-12-04', '2026-12-06'),
  cafClPhase('md3-2026', 'Gruppenphase · Spieltag 3', '2026-12-18', '2026-12-20'),
  cafClPhase('md4-2027', 'Gruppenphase · Spieltag 4', '2027-01-08', '2027-01-10'),
  cafClPhase('md5-2027', 'Gruppenphase · Spieltag 5', '2027-01-15', '2027-01-17'),
  cafClPhase('md6-2027', 'Gruppenphase · Spieltag 6', '2027-01-22', '2027-01-24'),
  cafClPhase('qf-first-2027', 'Viertelfinale · Hinspiele', '2027-02-26', '2027-02-28'),
  cafClPhase('qf-second-2027', 'Viertelfinale · Rückspiele', '2027-03-05', '2027-03-07'),
  cafClPhase('sf-first-2027', 'Halbfinale · Hinspiele', '2027-04-09', '2027-04-11'),
  cafClPhase('sf-second-2027', 'Halbfinale · Rückspiele', '2027-04-16', '2027-04-18'),
  cafClPhase('final-window-2027', 'Finale · Terminfenster', '2027-05-09', '2027-05-31', 'preliminary', 'CAF nennt derzeit nur das Finalfenster vom 9. bis 31. Mai 2027; der genaue Spieltermin ist noch offen.'),
]
