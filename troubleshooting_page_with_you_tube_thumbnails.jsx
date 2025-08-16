import React, { useMemo, useState } from "react";

// --- Video catalog used for thumbnails inside details modals ---
const RELATED_VIDEOS = {
  overproofed: [
    { title: "How to Read a Sourdough Crumb", note: "Identify under vs overproofed", url: "https://youtu.be/JzvZ6vMxHcw", thumb: "https://img.youtube.com/vi/JzvZ6vMxHcw/hqdefault.jpg" },
    { title: "Underproofed or Overproofed: Four Loaves", note: "Countertop proofing times", url: "https://youtu.be/sBkIl9YLbtQ", thumb: "https://img.youtube.com/vi/sBkIl9YLbtQ/hqdefault.jpg" },
    { title: "The Long Cold Proof — Six Loaves", note: "1–5 day cold retard results", url: "https://youtu.be/awm5Otm-RTQ", thumb: "https://img.youtube.com/vi/awm5Otm-RTQ/hqdefault.jpg" },
  ],
  underproofed: [
    { title: "Poke Test for Final Proofing", note: "Room-temp only", url: "https://youtu.be/U9aQV0IZRwU", thumb: "https://img.youtube.com/vi/U9aQV0IZRwU/hqdefault.jpg" },
    { title: "Two-Stage Bulk Fermentation", note: "Warm → cool schedule", url: "https://youtu.be/DDOfIAgyCy8", thumb: "https://img.youtube.com/vi/DDOfIAgyCy8/hqdefault.jpg" },
  ],
};

// --- Global Video Library shown at the bottom ---
const VIDEO_LIBRARY = [
  { title: "How to Read a Sourdough Crumb", note: "Under vs overproofed", url: "https://youtu.be/JzvZ6vMxHcw", thumb: "https://img.youtube.com/vi/JzvZ6vMxHcw/hqdefault.jpg" },
  { title: "Underproofed or Overproofed: Four Loaves", note: "Proofing time experiment", url: "https://youtu.be/sBkIl9YLbtQ", thumb: "https://img.youtube.com/vi/sBkIl9YLbtQ/hqdefault.jpg" },
  { title: "The Long Cold Proof — Six Loaves", note: "1–5 day cold retard", url: "https://youtu.be/awm5Otm-RTQ", thumb: "https://img.youtube.com/vi/awm5Otm-RTQ/hqdefault.jpg" },
  { title: "Poke Test for Final Proofing", note: "Room-temp poke test", url: "https://youtu.be/U9aQV0IZRwU", thumb: "https://img.youtube.com/vi/U9aQV0IZRwU/hqdefault.jpg" },
  { title: "Two-Stage Bulk Fermentation", note: "Warm → cool method", url: "https://youtu.be/DDOfIAgyCy8", thumb: "https://img.youtube.com/vi/DDOfIAgyCy8/hqdefault.jpg" },
];

// --- Troubleshooting items (with Tom's lesson links) ---
const ITEMS = [
  {
    id: "overproofed",
    title: "Overproofed Dough",
    tags: ["proofing", "slack", "overproofed"],
    summary:
      "Shorten final proof or chill dough before baking. Improve surface tension during shaping.",
    details:
      "Overproofed dough often looks slack and spreads on the bench. The crumb can be sticky with large, uneven tunnels near the top. Reduce proof time, increase dough strength during shaping, and consider cooler fermentation.",
    partnerCredit: "Crumb visuals and diagnostic framework inspired by The Sourdough Journey.",
    lessonUrl: "https://thesourdoughjourney.com/faq-over-under-proofed/",
    additionalVideos: RELATED_VIDEOS.overproofed,
  },
  {
    id: "underproofed",
    title: "Underproofed Dough",
    tags: ["proofing", "tight", "underproofed"],
    summary:
      "Let dough rise until it holds an indent from a gentle poke and feels airy.",
    details:
      "Underproofed loaves exhibit tight, gummy crumb with dense zones. Extend bulk or final proof, aim for consistent dough temp, and watch volume and feel rather than the clock.",
    partnerCredit: "Crumb photos courtesy of The Sourdough Journey.",
    lessonUrl: "https://thesourdoughjourney.com/videos/",
    additionalVideos: RELATED_VIDEOS.underproofed,
  },
  {
    id: "no-oven-spring",
    title: "No Oven Spring",
    tags: ["baking", "steam", "score"],
    summary:
      "Preheat thoroughly. Steam the first 10 minutes. Score with a shallow 30° angle for clean cuts.",
    details:
      "Lack of spring often traces to low dough strength, insufficient preheat, weak scoring, or dry oven. Build tension during shaping, proof to readiness, and keep the first phase of the bake humid.",
    lessonUrl: "https://thesourdoughjourney.com/the-secrets-of-great-ovenspring/",
  },
  {
    id: "uneven-open-crumb",
    title: "Uneven Open Crumb",
    tags: ["crumb", "uneven", "tunnels"],
    summary:
      "Degas gently before final shaping to redistribute air pockets.",
    details:
      "Large tunnels or mouse holes point to uneven fermentation or shaping. Even out gas, avoid flour streaks during lamination, and proof fully but not past peak.",
    partnerCredit: "Interpretive guide adapted with permission from The Sourdough Journey.",
    lessonUrl: "https://thesourdoughjourney.com/faq-open-crumb-and-crust/",
  },
  {
    id: "dense-tight-crumb",
    title: "Dense Tight Crumb",
    tags: ["crumb", "dense"],
    summary:
      "Increase hydration slightly and develop gluten with gentle folds.",
    details:
      "Cold dough, underfermentation, or low hydration can yield tight crumb. Raise dough temperature into the target range, extend bulk to appropriate rise, and add one or two coil folds for structure.",
    lessonUrl: "https://thesourdoughjourney.com/wp-content/uploads/2024/08/TSJ-Dough-Temping-Guide.pdf",
  },
  {
    id: "burnt-bottom",
    title: "Burnt Bottom",
    tags: ["baking", "burnt"],
    summary:
      "Raise rack height or lower oven temp 10°F. Use a spacer under your steel or stone.",
    details:
      "Thin pans on a hot lower rack conduct heat fast to the base. Add parchment, use a second sheet pan as a heat shield, or bake higher in the oven.",
    lessonUrl: "https://thesourdoughjourney.com/faq-baking/",
  },
  {
    id: "sticky-dough",
    title: "Sticky Dough",
    tags: ["mixing", "sticky"],
    summary:
      "Wet hands and surface lightly, then rest dough 10 minutes to relax.",
    details:
      "Stickiness is normal with higher hydration and fresh-milled flour. Use water, not flour, for handling. Develop strength with gentle folds and longer rests.",
    lessonUrl: "https://thesourdoughjourney.com/faq-bulk-fermentation-timing/",
  },
  {
    id: "pale-crust",
    title: "Pale Crust",
    tags: ["baking", "pale"],
    summary:
      "Bake 5 minutes longer or raise temp 10°F at the end for better color.",
    details:
      "Low sugar, low heat, or steam late in the bake can stall color. Vent the oven for the final minutes and extend time until the crust reaches a deep golden tone.",
    lessonUrl: "https://thesourdoughjourney.com/the-secrets-of-baking-temperature-and-ovenspring/",
  },
];

export default function TroubleshootingUnifiedPage() {
  const [query, setQuery] = useState("");
  const [view, setView] = useState("grid");
  const [active, setActive] = useState(null as null | string);

  const activeItem = useMemo(() => ITEMS.find(i => i.id === active) || null, [active]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ITEMS;
    return ITEMS.filter(i =>
      i.title.toLowerCase().includes(q) ||
      i.summary.toLowerCase().includes(q) ||
      i.tags.some(t => t.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-[#1b130f] text-[#f6e7d8]">
      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur bg-[#1b130f]/80 border-b border-[#3a2a22]">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-amber-600" />
            <span className="font-semibold">Baking Great Bread</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm text-[#dcc7b3]">
            <a href="#" className="hover:text-white">Recipes</a>
            <a href="#" className="hover:text-white">Glossary</a>
            <a href="#" className="hover:text-white font-medium">Troubleshooting</a>
            <a href="#" className="hover:text-white">Community</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-10 pb-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Troubleshooting</h1>
        <p className="mt-2 text-[#e8d7c6]">Solve your bread baking challenges with clear fixes, expert lessons, and video thumbnails for quick learning.</p>
      </section>

      {/* Analyze box */}
      <section className="mx-auto max-w-6xl px-4">
        <div className="rounded-2xl border border-[#3a2a22] bg-[#261b16] p-4">
          <label className="block text-sm mb-2 text-[#e8d7c6]">Analyze Your Recipe</label>
          <textarea
            className="w-full h-28 rounded-xl bg-[#1f1612] border border-[#3a2a22] p-3 focus:outline-none"
            placeholder="Paste your recipe here or describe the problem you’re experiencing..."
          />
          <div className="mt-3">
            <button className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-[#1b130f] font-semibold">Analyze Recipe</button>
          </div>
        </div>
      </section>

      {/* Partner attribution banner */}
      <section className="mx-auto max-w-6xl px-4 mt-8">
        <div className="rounded-2xl border border-[#3a2a22] bg-gradient-to-r from-[#2a1e18] to-[#241a16] p-4">
          <p className="text-sm leading-relaxed">
            <span className="font-semibold">Expert insights from The Sourdough Journey.</span> Some images and video guides on this page are provided by
            <span className="font-semibold"> our troubleshooting partner</span> and are used with permission. Explore the full Encyclopedia at
            {" "}
            <a className="underline underline-offset-4 hover:text-white" href="https://thesourdoughjourney.com/encyclopedia" target="_blank" rel="noreferrer">The Sourdough Journey</a>.
          </p>
        </div>
      </section>

      {/* Controls */}
      <section className="mx-auto max-w-6xl px-4 mt-6 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search problems, tags, or fixes..."
            className="w-72 max-w-full rounded-xl bg-[#1f1612] border border-[#3a2a22] p-2.5 text-sm focus:outline-none"
          />
          <span className="text-xs text-[#cdb7a4]">{filtered.length} results</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={() => setView("grid")}
            className={`px-3 py-1.5 rounded-xl border ${view === "grid" ? "bg-[#2a1e18] border-[#7a5a44]" : "bg-[#1f1612] border-[#3a2a22]"}`}
          >Grid</button>
          <button
            onClick={() => setView("list")}
            className={`px-3 py-1.5 rounded-xl border ${view === "list" ? "bg-[#2a1e18] border-[#7a5a44]" : "bg-[#1f1612] border-[#3a2a22]"}`}
          >List</button>
        </div>
      </section>

      {/* Problems */}
      <section className="mx-auto max-w-6xl px-4 mt-4 pb-20">
        {view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(item => (
              <article key={item.id} className="rounded-2xl border border-[#3a2a22] bg-[#241a16] p-5 shadow-sm">
                <header className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold leading-tight">{item.title}</h3>
                </header>
                <div className="mt-2 flex flex-wrap gap-2">
                  {item.tags.map(t => (
                    <span key={t} className="text-[11px] px-2 py-0.5 rounded-full bg-[#1f1612] border border-[#3a2a22] text-[#cdb7a4]">{t}</span>
                  ))}
                </div>
                <p className="mt-3 text-sm text-[#e8d7c6]">{item.summary}</p>
                <div className="mt-4 flex items-center gap-3 flex-wrap">
                  <button
                    className="px-3 py-1.5 rounded-xl bg-amber-600 text-[#1b130f] text-sm font-semibold hover:bg-amber-500"
                    onClick={() => setActive(item.id)}
                  >View Details</button>
                  {item.lessonUrl && (
                    <a
                      href={item.lessonUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-xl border border-[#7a5a44] text-sm hover:bg-[#2a1e18]"
                    >View Lesson</a>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="divide-y divide-[#3a2a22] rounded-2xl border border-[#3a2a22] bg-[#241a16]">
            {filtered.map(item => (
              <div key={item.id} className="p-5">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm text-[#e8d7c6]">{item.summary}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {item.tags.map(t => (
                        <span key={t} className="text-[11px] px-2 py-0.5 rounded-full bg-[#1f1612] border border-[#3a2a22] text-[#cdb7a4]">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    {item.lessonUrl && (
                      <a
                        href={item.lessonUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-xl border border-[#7a5a44] text-sm hover:bg-[#2a1e18]"
                      >View Lesson</a>
                    )}
                    <button
                      className="px-3 py-1.5 rounded-xl bg-amber-600 text-[#1b130f] text-sm font-semibold hover:bg-amber-500"
                      onClick={() => setActive(item.id)}
                    >View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Deep-dive evergreen block */}
        <div className="mt-8 rounded-2xl border border-[#3a2a22] bg-[#261b16] p-5">
          <h3 className="text-xl font-bold">Deep Dive with The Sourdough Journey</h3>
          <p className="mt-2 text-sm text-[#e8d7c6] max-w-3xl">
            Want more than quick fixes? Explore the Encyclopedia for long-form experiments, visuals, and videos on crumb reading, proofing windows, flour choices, temperature, and more. It is a stable external reference you can point to without daily upkeep.
          </p>
          <a
            href="https://thesourdoughjourney.com/encyclopedia"
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center px-4 py-2 rounded-xl bg-amber-600 text-[#1b130f] font-semibold hover:bg-amber-500"
          >Visit The Sourdough Journey Encyclopedia</a>
        </div>
      </section>

      {/* Video Library section */}
      <section id="video-library" className="mx-auto max-w-6xl px-4 mt-2 pb-24">
        <h3 className="text-2xl font-bold">Video Library — The Sourdough Journey</h3>
        <p className="mt-2 text-sm text-[#e8d7c6] max-w-3xl">Curated lessons that pair with the troubleshooting above. Click any thumbnail to watch on YouTube.</p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {VIDEO_LIBRARY.map((v, i) => (
            <a key={i} href={v.url} target="_blank" rel="noreferrer" className="group rounded-2xl overflow-hidden border border-[#3a2a22] bg-[#241a16]">
              <img src={v.thumb} alt={v.title} className="w-full aspect-video object-cover group-hover:opacity-90" />
              <div className="p-4">
                <div className="text-sm font-semibold leading-snug">{v.title}</div>
                {v.note && <div className="text-xs text-[#cdb7a4] mt-1">{v.note}</div>}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-4" onClick={() => setActive(null)}>
          <div className="w-full max-w-2xl rounded-2xl bg-[#241a16] border border-[#3a2a22] shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="p-5 border-b border-[#3a2a22] flex items-start justify-between gap-3">
              <h4 className="text-xl font-bold">{activeItem.title}</h4>
              <button onClick={() => setActive(null)} className="text-[#cdb7a4] hover:text-white">✕</button>
            </div>
            <div className="p-5 space-y-4">
              <p className="text-sm text-[#e8d7c6]">{activeItem.details}</p>

              {activeItem.partnerCredit && (
                <p className="text-xs text-[#cdb7a4]">{activeItem.partnerCredit}</p>
              )}

              {activeItem.videoUrl && (
                <div className="aspect-video w-full overflow-hidden rounded-xl border border-[#3a2a22] bg-black">
                  <iframe
                    className="w-full h-full"
                    src={activeItem.videoUrl}
                    title="Partner lesson"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

              {activeItem.additionalVideos && activeItem.additionalVideos.length > 0 && (
                <div>
                  <h5 className="text-sm font-semibold mb-2">Related videos</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeItem.additionalVideos.map((v, idx) => (
                      <a key={idx} href={v.url} target="_blank" rel="noreferrer" className="group rounded-xl overflow-hidden border border-[#3a2a22] bg-[#1b130f]">
                        <img src={v.thumb} alt={v.title} className="w-full aspect-video object-cover group-hover:opacity-90" />
                        <div className="p-3">
                          <div className="text-sm font-semibold leading-snug">{v.title}</div>
                          {v.note && <div className="text-xs text-[#cdb7a4] mt-1">{v.note}</div>}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2">
                <a
                  href="https://thesourdoughjourney.com/encyclopedia"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center text-sm underline underline-offset-4 hover:text-white"
                >More from The Sourdough Journey</a>
              </div>
            </div>
            <div className="p-5 border-t border-[#3a2a22] flex items-center justify-end">
              <button onClick={() => setActive(null)} className="px-4 py-2 rounded-xl bg-amber-600 text-[#1b130f] font-semibold hover:bg-amber-500">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-[#3a2a22] bg-[#1b130f]">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-[#cdb7a4]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <p>© 2025 Henry Hunter. Powered by Vitale Sourdough Co.</p>
            <p>Contact: <a className="underline" href="mailto:henrysbreadkitchen@gmail.com">henrysbreadkitchen@gmail.com</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
