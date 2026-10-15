'use client'

import {categoryOptions, regionOptions} from '../../lib/calendarTaxonomy'

export default function CalendarFilters({
  category,
  region,
  onlyHighlights,
  onCategoryChange,
  onRegionChange,
  onHighlightsChange,
  onReset,
  resultCount,
}) {
  const filtersActive = Boolean(category || region || onlyHighlights)

  return (
    <div className="spieltipps-toolbar" aria-label="Spieltipps filtern">
      <label className="spieltipps-filter">
        <span>KATEGORIE</span>
        <select value={category} onChange={(event) => onCategoryChange(event.target.value)}>
          <option value="">Alle Kategorien</option>
          {categoryOptions.map(({value, label}) => <option key={value} value={value}>{label}</option>)}
        </select>
      </label>
      <label className="spieltipps-filter">
        <span>REGION</span>
        <select value={region} onChange={(event) => onRegionChange(event.target.value)}>
          <option value="">Alle Regionen</option>
          {regionOptions.map(({value, label}) => <option key={value} value={value}>{label}</option>)}
        </select>
      </label>
      <label className="spieltipps-highlight-filter">
        <input type="checkbox" checked={onlyHighlights} onChange={(event) => onHighlightsChange(event.target.checked)} />
        <span>Nur Tandemhopper-Highlights</span>
      </label>
      <div className="spieltipps-toolbar-end">
        <span aria-live="polite">{resultCount} {resultCount === 1 ? 'Tipp' : 'Tipps'}</span>
        {filtersActive && <button type="button" onClick={onReset}>Zurücksetzen ×</button>}
      </div>
    </div>
  )
}
