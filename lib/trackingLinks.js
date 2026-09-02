const championsLeagueDestination = '/geschichten/champions-league-fuer-groundhopper';

export const trackingLinks = {
  'cl-whatsapp': {
    destination: championsLeagueDestination,
    source: 'whatsapp',
    medium: 'channel',
    label: 'WhatsApp-Kanal',
  },
  'cl-facebook-page': {
    destination: championsLeagueDestination,
    source: 'facebook',
    medium: 'page',
    label: 'Facebook-Seite',
  },
  'cl-facebook-groundhopper': {
    destination: championsLeagueDestination,
    source: 'facebook',
    medium: 'group',
    label: 'Facebook-Gruppe Groundhopper',
  },
  'cl-facebook-ultras': {
    destination: championsLeagueDestination,
    source: 'facebook',
    medium: 'group',
    label: 'Facebook-Gruppe Ultras',
  },
  'cl-facebook-gruppe-a': {
    destination: championsLeagueDestination,
    source: 'facebook',
    medium: 'group',
    label: 'Facebook-Gruppe A',
  },
  'cl-facebook-gruppe-b': {
    destination: championsLeagueDestination,
    source: 'facebook',
    medium: 'group',
    label: 'Facebook-Gruppe B',
  },
  'cl-instagram-story': {
    destination: championsLeagueDestination,
    source: 'instagram',
    medium: 'story',
    label: 'Instagram Story',
  },
  'cl-instagram-bio': {
    destination: championsLeagueDestination,
    source: 'instagram',
    medium: 'bio',
    label: 'Instagram Bio',
  },
};

export function getTrackingLink(slug) {
  return trackingLinks[slug] || null;
}
