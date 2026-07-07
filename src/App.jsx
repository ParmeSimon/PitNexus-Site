import React, { useEffect, useState } from 'react'
import { MODULES, TEAM, RADIO, STATS, SHOWCASE } from './data.js'
import { useReveal, useCountUp } from './hooks.js'

// ── Média (image ou vidéo) avec repli gracieux ───────────────────────────────
// Rend une <video> (autoplay/muet/boucle) ou une <img> selon l'extension. Si le
// fichier manque ou casse, bascule sur un placeholder aux couleurs de l'accent —
// la page reste propre tant qu'aucun asset n'est déposé dans public/media/.
function isVideo(src) {
  return /\.(mp4|webm|mov)$/i.test(src || '')
}

function Media({ src, poster, alt, accent, className = '' }) {
  const [err, setErr] = useState(false)
  const style = accent ? { '--accent': accent } : undefined
  if (!src || err) {
    return (
      <div className={`media-ph ${className}`} style={style} role="img" aria-label={alt || 'Aperçu à venir'}>
        <span className="media-ph-ico" aria-hidden="true" />
        <span className="media-ph-label">{alt || 'Aperçu à venir'}</span>
      </div>
    )
  }
  if (isVideo(src)) {
    return (
      <video
        className={className}
        src={src}
        poster={poster}
        muted
        loop
        autoPlay
        playsInline
        preload="metadata"
        onError={() => setErr(true)}
      />
    )
  }
  return (
    <img className={className} src={src} alt={alt || ''} loading="lazy" onError={() => setErr(true)} />
  )
}

// ── Jauge animée du hero ─────────────────────────────────────────────────────
// Un cadran style tachymètre qui balaie en boucle. SVG pur, aucune image.
function Gauge() {
  const [rpm, setRpm] = useState(0)
  useEffect(() => {
    let raf
    const loop = (t) => {
      // Montée en régime, coupure, redescente : sinus décalé pour un vrai rythme.
      const v = (Math.sin(t / 900) * 0.5 + 0.5) * 0.82 + Math.sin(t / 210) * 0.06
      setRpm(Math.max(0, Math.min(1, v)))
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  const start = -220
  const end = 40
  const angle = start + (end - start) * rpm
  const ticks = Array.from({ length: 21 }, (_, i) => i / 20)

  return (
    <div className="gauge" aria-hidden="true">
      <svg viewBox="0 0 260 260">
        <defs>
          <linearGradient id="arc" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3ddc97" />
            <stop offset="0.6" stopColor="#f5b301" />
            <stop offset="1" stopColor="#ff5a3c" />
          </linearGradient>
        </defs>
        {ticks.map((f, i) => {
          const a = ((start + (end - start) * f) * Math.PI) / 180
          const r1 = 108
          const r2 = f > 0.8 ? 92 : 98
          const big = i % 5 === 0
          return (
            <line
              key={i}
              x1={130 + Math.cos(a) * r1}
              y1={130 + Math.sin(a) * r1}
              x2={130 + Math.cos(a) * r2}
              y2={130 + Math.sin(a) * r2}
              stroke={f > 0.8 ? '#ff5a3c' : 'rgba(255,255,255,.45)'}
              strokeWidth={big ? 2.4 : 1}
            />
          )
        })}
        <path
          d="M 46 206 A 108 108 0 1 1 214 206"
          fill="none"
          stroke="url(#arc)"
          strokeWidth="5"
          strokeLinecap="round"
          opacity="0.85"
        />
        <line
          x1="130"
          y1="130"
          x2={130 + Math.cos((angle * Math.PI) / 180) * 88}
          y2={130 + Math.sin((angle * Math.PI) / 180) * 88}
          stroke="#fff"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="130" cy="130" r="9" fill="#12161b" stroke="#fff" strokeWidth="2" />
      </svg>
      <div className="gauge-read">
        <span className="gauge-num">{Math.round(rpm * 9400).toLocaleString('fr-FR')}</span>
        <span className="gauge-unit">tr/min</span>
      </div>
    </div>
  )
}

// ── Bandeau radio défilant ───────────────────────────────────────────────────
function RadioTicker() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % RADIO.length), 3200)
    return () => clearInterval(id)
  }, [])
  const line = RADIO[i]
  return (
    <div className="radio" role="status" aria-live="polite">
      <span className="radio-dot" />
      <span className="radio-tag">{line.t}</span>
      <span key={i} className="radio-msg">
        {line.m}
      </span>
    </div>
  )
}

// ── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <header className="hero">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-copy">
          <span className="eyebrow">Le stand des pilotes sim</span>
          <h1>
            Un seul compte,
            <br />
            toute ton <span className="hl">écurie</span> de course.
          </h1>
          <p className="lead">
            PitNexus réunit ton ingénieur de course, ta stratégie d’arrêt, tes plannings, ton palmarès et
            ton écurie dans une seule appli. Tu roules, il note tout. Tu gagnes, il s’en souvient.
          </p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#telecharger">
              Télécharger pour Windows
            </a>
            <a className="btn btn-ghost" href="#modules">
              Voir les modules
            </a>
          </div>
          <RadioTicker />
        </div>
        <div className="hero-visual">
          <Gauge />
        </div>
      </div>
      <a className="scroll-hint" href="#stats" aria-label="Descendre">
        <span />
      </a>
    </header>
  )
}

// ── Bandeau chiffres ─────────────────────────────────────────────────────────
function StatCell({ value, prefix = '', suffix, label }) {
  const [ref, shown] = useReveal(0.4)
  const n = useCountUp(value, shown)
  const display = value % 1 === 0 ? Math.round(n) : n.toFixed(0)
  return (
    <div className={`stat ${shown ? 'in' : ''}`} ref={ref}>
      <div className="stat-num">
        {prefix && <span className="stat-prefix">{prefix}</span>}
        {display}
        <span>{suffix}</span>
      </div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

function Stats() {
  return (
    <div className="stats-wrap">
      <section id="stats" className="stats">
        {STATS.map((s) => (
          <StatCell key={s.label} {...s} />
        ))}
      </section>
      <p className="stats-disclaimer">
        Données observées lors de périodes de test internes. Les gains varient selon le pilote, la simulation et le contexte de course. Ces résultats ne sont pas garantis pour toute personne achetant une offre PitNexus.
      </p>
    </div>
  )
}

// ── En action : vidéo démo + galerie sélectionnable ──────────────────────────
function Showcase() {
  const [ref, shown] = useReveal(0.15)
  // Démarre sur un vrai screenshot ; la vidéo démo reste accessible via son onglet
  // (placeholder tant que demo.mp4 n'est pas déposé).
  const [active, setActive] = useState(SHOWCASE.shots[0])
  const featured = active ?? SHOWCASE.demo

  return (
    <section id="apercu" className={`showcase ${shown ? 'in' : ''}`} ref={ref}>
      <div className="section-head">
        <span className="eyebrow">En action</span>
        <h2>Regarde PitNexus tourner.</h2>
        <p>
          Le stand au complet, en mouvement : l’ingénieur qui parle, la stratégie qui s’ajuste, le
          palmarès qui se remplit tout seul.
        </p>
      </div>

      <div className="show-frame" style={{ '--accent': featured.accent || 'var(--red)' }}>
        <div className="show-bar" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <Media
          key={featured.src}
          src={featured.src}
          poster={featured.poster}
          alt={featured.label}
          accent={featured.accent}
          className="show-media"
        />
        <span className="show-cap">{featured.label}</span>
      </div>

      <div className="show-thumbs" role="tablist">
        <button
          role="tab"
          aria-selected={active === null}
          className={`show-thumb ${active === null ? 'on' : ''}`}
          onClick={() => setActive(null)}
        >
          <span className="show-thumb-dot play" />
          Démo
        </button>
        {SHOWCASE.shots.map((s) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={active === s}
            className={`show-thumb ${active === s ? 'on' : ''}`}
            style={{ '--accent': s.accent }}
            onClick={() => setActive(s)}
          >
            <span className={`show-thumb-dot ${isVideo(s.src) ? 'play' : ''}`} />
            {s.label}
          </button>
        ))}
      </div>
    </section>
  )
}

// ── Modules : onglets + fiche détaillée ──────────────────────────────────────
function Modules() {
  const [active, setActive] = useState(0)
  const [ref, shown] = useReveal(0.15)
  const m = MODULES[active]

  return (
    <section id="modules" className={`modules ${shown ? 'in' : ''}`} ref={ref}>
      <div className="section-head">
        <span className="eyebrow">Quatre modules, un abonnement à la carte</span>
        <h2>Chaque module fait un vrai métier du stand.</h2>
        <p>
          Les modules locaux sont gratuits. Tu ne paies que les surcouches IA, ou le pack complet si tu
          veux tout. Choisis ceux qui te parlent.
        </p>
      </div>

      <div className="mod-tabs" role="tablist">
        {MODULES.map((mod, i) => (
          <button
            key={mod.id}
            role="tab"
            aria-selected={i === active}
            className={`mod-tab ${i === active ? 'on' : ''}`}
            style={{ '--accent': mod.accent }}
            onClick={() => setActive(i)}
          >
            <span className="mod-tab-dot" />
            {mod.name}
          </button>
        ))}
      </div>

      <div className="mod-card" style={{ '--accent': m.accent }} key={m.id}>
        <div className="mod-media">
          <div className="mod-media-bar" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <Media
            key={m.shot || m.clip}
            src={m.shot || m.clip}
            alt={`Aperçu ${m.name}`}
            accent={m.accent}
            className="mod-shot"
          />
        </div>
        <div className="mod-card-left">
          <span className="mod-kicker">{m.kicker}</span>
          <h3>{m.name}</h3>
          <p className="mod-tagline">{m.tagline}</p>
          <p className="mod-body">{m.body}</p>
          <span className="mod-price">{m.price}</span>
        </div>
        <div className="mod-card-right">
          <div className="feat-col">
            <span className="feat-label">Inclus</span>
            <ul>
              {m.standard.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
          <div className="feat-col pro">
            <span className="feat-label">Pro</span>
            <ul>
              {m.pro.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── PitTeam ──────────────────────────────────────────────────────────────────
function Team() {
  const [ref, shown] = useReveal(0.2)
  return (
    <section id="team" className={`team ${shown ? 'in' : ''}`} ref={ref}>
      <div className="team-inner">
        <div className="team-copy">
          <span className="eyebrow">{TEAM.kicker}</span>
          <h2>{TEAM.tagline}</h2>
          <p>{TEAM.body}</p>
          <span className="team-badge">Cœur gratuit pour tout pilote connecté</span>
        </div>
        <ul className="team-points">
          {TEAM.points.map((p, i) => (
            <li key={p} style={{ '--d': `${i * 90}ms` }}>
              <span className="tp-num">{String(i + 1).padStart(2, '0')}</span>
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// ── Goodies + pack ───────────────────────────────────────────────────────────
function Extras() {
  const [ref, shown] = useReveal(0.2)
  return (
    <section id="pack" className={`extras ${shown ? 'in' : ''}`} ref={ref}>
      <div className="pack-card">
        <div>
          <span className="eyebrow">Le pack complet</span>
          <h2>Les quatre modules en Pro, moins cher qu’à la carte.</h2>
          <p>
            Un tarif unique pour tout débloquer : ingénieur, stratégie, plannings et palmarès en Pro,
            avec la sync cloud multi PC sur chacun. Mensuel ou annuel, deux mois offerts sur l’année.
          </p>
          <a className="btn btn-primary" href="#telecharger">
            Prendre le pack
          </a>
        </div>
        <div className="pack-price">
          <span className="pack-amount">19,99 €</span>
          <span className="pack-per">par mois</span>
          <span className="pack-note">ou 199 € l’année</span>
        </div>
      </div>

      <div className="goodies">
        <span className="eyebrow">Et pour le plaisir</span>
        <h3>Des goodies achetés une fois, gardés pour toujours.</h3>
        <div className="goodie-grid">
          {[
            ['Thèmes', 'Le Mans Night, Rosso Corsa, Gulf, Carbone, Neon'],
            ['Voix ingénieur', 'Voix Pro FR et EN, féminines, copilote rallye'],
            ['Sons radio', 'Classic Radio, F1 Team Radio, intercom, alertes'],
            ['Cartes partageables', 'Classic, Neon, Podium pour tes exports'],
            ['Badges de carrière', 'Titres et vitrine à trophées'],
            ['Skins', 'Habillages de jauges et de circuits']
          ].map(([t, d]) => (
            <div className="goodie" key={t}>
              <strong>{t}</strong>
              <span>{d}</span>
            </div>
          ))}
        </div>
        <p className="goodie-foot">Aucun abonnement caché. Un goodie acheté reste dans ton inventaire à vie.</p>
      </div>
    </section>
  )
}

// ── Téléchargement ───────────────────────────────────────────────────────────
function Download() {
  const [ref, shown] = useReveal(0.3)
  return (
    <section id="telecharger" className={`download ${shown ? 'in' : ''}`} ref={ref}>
      <h2>Prêt à passer au stand ?</h2>
      <p>
        PitNexus tourne sur Windows, se met à jour tout seul et détecte tes sims au lancement. Ton compte
        pilote te suit d’un PC à l’autre.
      </p>
      <div className="dl-cta">
        <a className="btn btn-primary btn-lg" href="#">
          Télécharger pour Windows
        </a>
        <span className="dl-meta">Compte pilote unique · Mises à jour auto · Signé</span>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <span className="logo">Pit<span>Nexus</span></span>
        <p>Le stand qui suit chacune de tes courses.</p>
      </div>
      <nav className="footer-nav">
        <a href="#modules">Modules</a>
        <a href="#team">PitTeam</a>
        <a href="#pack">Pack et goodies</a>
        <a href="#telecharger">Télécharger</a>
      </nav>
      <span className="footer-copy">© 2026 PitNexus · pitnexus.com</span>
    </footer>
  )
}

function Nav() {
  const [solid, setSolid] = useState(false)
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <nav className={`nav ${solid ? 'solid' : ''}`}>
      <a className="logo" href="#top">
        Pit<span>Nexus</span>
      </a>
      <div className="nav-links">
        <a href="#apercu">Aperçu</a>
        <a href="#modules">Modules</a>
        <a href="#team">Écurie</a>
        <a href="#pack">Tarifs</a>
      </div>
      <a className="btn btn-primary btn-sm" href="#telecharger">
        Télécharger
      </a>
    </nav>
  )
}

export default function App() {
  return (
    <div id="top">
      <Nav />
      <Hero />
      <Stats />
      <Showcase />
      <Modules />
      <Team />
      <Extras />
      <Download />
      <Footer />
    </div>
  )
}
