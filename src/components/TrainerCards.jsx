import {
  BadgeCheck,
  CalendarDays,
  Gamepad2,
  Map,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";

import "./TrainerCards.css";

const discoverCards = [
  {
    icon: Gamepad2,
    tag: "ROUNDS",
    title: "EXPLORE THE ROUNDS",
    description:
      "Progress through Round 1, Round 2 and the final 24-hour hackathon.",
    href: "#rounds",
  },
  {
    icon: CalendarDays,
    tag: "SCHEDULE",
    title: "VIEW THE SCHEDULE",
    description:
      "Keep track of important dates, deadlines and final-round activities.",
    href: "#schedule",
  },
  {
    icon: Trophy,
    tag: "PRIZES",
    title: "DISCOVER THE PRIZES",
    description:
      "Compete for recognition, certificates and prizes at DEXATHON 2026.",
    href: "#prizes",
  },
  {
    icon: Map,
    tag: "VENUE",
    title: "FIND THE VENUE",
    description:
      "Get the final-round venue details and event-day information.",
    href: "#final-round",
  },
];

export default function TrainerCards() {
  return (
    <section className="trainer-cards-section" id="about">
      <div className="trainer-cards-container">

        {/* SECTION HEADING */}
        <div className="trainer-cards-heading">
          <div className="trainer-cards-label">
            <span />
            TRAINER CARDS
          </div>

          <h2>
            KNOW YOUR
            <strong>DEXATHON.</strong>
          </h2>

          <p>
            Everything you need for your DEXATHON journey, organized
            into one digital adventure.
          </p>
        </div>

        {/* MAIN CONTENT */}
        <div className="trainer-cards-layout">

          {/* TRAINER CARD */}
          <article className="trainer-profile-card">

            <div className="profile-card-top">
              <div>
                <span className="profile-overline">
                  DEXATHON TRAINER
                </span>

                <strong className="profile-id">
                  DX26
                </strong>
              </div>

              <BadgeCheck size={25} />
            </div>

            <div className="profile-card-main">

              <div className="profile-avatar">
                <div className="profile-avatar-circle">
                  <span>D</span>
                </div>

                <div className="profile-level">
                  LVL 01
                </div>
              </div>

              <div className="profile-details">
                <span>TRAINER STATUS</span>
                <h3>READY TO BUILD</h3>

                <div className="profile-status">
                  <span />
                  ACTIVE TRAINER
                </div>
              </div>

            </div>

            <div className="profile-stats">

              <div>
                <strong>04–06</strong>
                <span>TEAM SIZE</span>
              </div>

              <div>
                <strong>24H</strong>
                <span>FINAL BUILD</span>
              </div>

              <div>
                <strong>03</strong>
                <span>STAGES</span>
              </div>

            </div>

            <div className="profile-card-footer">
              <div>
                <Users size={13} />
                <span>TEAM QUEST</span>
              </div>

              <span>DEXATHON 2026</span>
            </div>

          </article>

          {/* DISCOVER */}
          <div className="discover-area">

            <div className="discover-heading">
              <div>
                <span>DISCOVER DEXATHON</span>
                <h3>YOUR QUEST MAP</h3>
              </div>

              <Sparkles size={22} />
            </div>

            <div className="discover-grid">

              {discoverCards.map((card) => {
                const Icon = card.icon;

                return (
                  <a
                    href={card.href}
                    className="discover-card"
                    key={card.tag}
                  >
                    <div className="discover-card-icon">
                      <Icon size={20} />
                    </div>

                    <div className="discover-card-content">
                      <span>{card.tag}</span>
                      <h4>{card.title}</h4>
                      <p>{card.description}</p>
                    </div>

                    <div className="discover-card-arrow">
                      ↗
                    </div>
                  </a>
                );
              })}

            </div>

          </div>

        </div>

        {/* LOWER BADGE STRIP */}
        <div className="trainer-card-strip">

          <div className="trainer-strip-item">
            <ShieldCheck size={17} />
            <div>
              <strong>OFFICIAL EVENT</strong>
              <span>DEXATHON 2026</span>
            </div>
          </div>

          <div className="trainer-strip-item">
            <Users size={17} />
            <div>
              <strong>TEAM QUEST</strong>
              <span>4–6 TRAINERS</span>
            </div>
          </div>

          <div className="trainer-strip-item">
            <Trophy size={17} />
            <div>
              <strong>CHAMPIONSHIP</strong>
              <span>FINAL 24-HOUR HACKATHON</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}