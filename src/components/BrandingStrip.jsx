const brands = [
  {
    title: "SATHYABAMA",
    subtitle: "INSTITUTE OF SCIENCE AND TECHNOLOGY",
    type: "main",
  },
  { title: "DEPARTMENT OF", subtitle: "COMPUTER APPLICATIONS" },
  { title: "DEPARTMENT OF", subtitle: "COMPUTER SCIENCE" },
  { title: "AI + MATH", subtitle: "ASSOCIATE" },
  { title: "NIF", subtitle: "ASSOCIATE" },
  { title: "ABET", subtitle: "SUSTAINABLE DEVELOPMENT GOALS" },
  { title: "QS STARS", subtitle: "RATED" },
];

export default function BrandingStrip() {
  return (
    <section className="top-branding">
      <div className="top-branding-inner">

        <div className="sathyabama-brand">
          <div className="sathyabama-emblem">
            S
          </div>

          <div>
            <div className="sathyabama-name">SATHYABAMA</div>
            <div className="sathyabama-subtitle">
              INSTITUTE OF SCIENCE AND TECHNOLOGY
            </div>
            <div className="sathyabama-caption">
              DEEMED TO BE UNIVERSITY
            </div>
          </div>
        </div>

        <div className="brand-list">
          {brands.slice(1).map((brand) => (
            <div className="brand-box" key={brand.title + brand.subtitle}>
              <strong>{brand.title}</strong>
              <span>{brand.subtitle}</span>
            </div>
          ))}
        </div>

        <div className="association">
          <span>IN ASSOCIATION WITH</span>

          <div className="association-items">
            <div className="association-item">
              <b>SS</b>
              <strong>SnapServe AI</strong>
            </div>

            <div className="association-item">
              <b>SZ</b>
              <strong>Space Zee Technologies</strong>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}