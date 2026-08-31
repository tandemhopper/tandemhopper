'use client'

import {useEffect} from 'react'

export const filterCategories = [
  {value: 'fanszene', label: 'Fanszene'},
  {value: 'rivalitaet', label: 'Rivalität'},
  {value: 'anlass', label: 'Besonderer Anlass'},
  {value: 'unter_dem_radar', label: 'Unter dem Radar'},
]

export const filterRegions = [
  {value: 'europe', label: 'Europa'},
  {value: 'africa', label: 'Afrika'},
  {value: 'asia', label: 'Asien'},
  {value: 'south_america', label: 'Südamerika'},
  {value: 'north_central_america', label: 'Nord- & Mittelamerika'},
]

function FilterChoice({active, children, onClick}) {
  return <button type="button" className={active ? 'is-active' : ''} aria-pressed={active} onClick={onClick}>{children}</button>
}

export default function CalendarFilters({
  open,
  onClose,
  categories,
  regions,
  onlyConfirmed,
  onToggleCategory,
  onToggleRegion,
  onToggleConfirmed,
  onReset,
  resultCount,
  activeCount,
}) {
  useEffect(() => {
    if (!open) return undefined

    function onKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKeyDown)
    const shouldLock = window.matchMedia('(max-width: 760px)').matches
    const previousOverflow = document.body.style.overflow
    if (shouldLock) document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      if (shouldLock) document.body.style.overflow = previousOverflow
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="calendar-filter-layer" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget && window.matchMedia('(max-width: 760px)').matches) onClose()
    }}>
      <section className="calendar-filters" role="dialog" aria-modal="false" aria-labelledby="calendar-filter-title">
        <div className="calendar-filter-handle" aria-hidden="true" />
        <header className="calendar-filter-head">
          <div>
            <p className="eyebrow">AUSWAHL EINGRENZEN</p>
            <h3 id="calendar-filter-title">Filter</h3>
          </div>
          <button type="button" className="calendar-filter-close" aria-label="Filter schließen" onClick={onClose}>×</button>
        </header>

        <fieldset className="calendar-filter-group">
          <legend>KATEGORIE</legend>
          <div className="calendar-filter-options">
            {filterCategories.map((option) => (
              <FilterChoice key={option.value} active={categories.includes(option.value)} onClick={() => onToggleCategory(option.value)}>
                {option.label}
              </FilterChoice>
            ))}
          </div>
        </fieldset>

        <fieldset className="calendar-filter-group">
          <legend>REGION</legend>
          <div className="calendar-filter-options">
            {filterRegions.map((option) => (
              <FilterChoice key={option.value} active={regions.includes(option.value)} onClick={() => onToggleRegion(option.value)}>
                {option.label}
              </FilterChoice>
            ))}
          </div>
        </fieldset>

        <fieldset className="calendar-filter-group calendar-filter-confirmed">
          <legend>TERMIN</legend>
          <label>
            <input type="checkbox" checked={onlyConfirmed} onChange={onToggleConfirmed} />
            <span>Nur fix terminierte Spiele</span>
          </label>
        </fieldset>

        <footer className="calendar-filter-foot">
          <button type="button" className="calendar-filter-reset" onClick={onReset} disabled={!activeCount}>Zurücksetzen</button>
          <button type="button" className="calendar-filter-apply" onClick={onClose}>{resultCount} {resultCount === 1 ? 'Tipp' : 'Tipps'} anzeigen</button>
        </footer>
      </section>
    </div>
  )
}
