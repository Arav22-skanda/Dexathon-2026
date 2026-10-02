import {
  Lightbulb,
  Code2,
  Presentation,
  ArrowUpRight,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

import "./TrainerChallenges.css";

const challenges = [
  {
    number: "01",
    icon: Lightbulb,
    tag: "IDEATION",
    title: "CATCH THE IDEA",
    description:
      "Identify a meaningful problem and transform it into a clear, practical solution.",
    accent: "orange",
  },
  {
    number: "02",
    icon: Code2,
    tag: "BUILD",
    title: "BUILD THE SOLUTION",
    description:
      "Turn your concept into a working prototype using the technologies of your choice.",
    accent: "cyan",
  },
  {
    number: "03",
    icon: Presentation,
    tag: "PRESENT",
    title: "SHOW YOUR WORK",
    description:
      "Present your project, demonstrate its impact, and prove why your solution matters.",
    accent: "orange",
  },
];

export default function TrainerChallenges() {
  return (
    <section className="trainer-challenges" id="rounds">
      <div className="challenges-container">

        {/* HEADER */}
        <div className="challenges-header">

          <div className="challenges-label">
            <span />
            TRAINER &amp; CHALLENGES
          </div>

          <div className="challenges-heading-row">
            <div>
              <h2>
                ACCEPT THE
                <strong>CHALLENGE.</strong>
              </h2>

              <p>
                Every challenge is an opportunity to learn, build,
                collaborate and create something meaningful.
              </p>
            </div>

            <div className="challenge-counter">
              <span>DEXATHON</span>
              <strong>03</strong>
              <small>MISSIONS</small>
            </div>
          </div>

        </div>

        {/* CARDS */}
        <div className="challenge-grid">

          {challenges.map((challenge) => {
            const Icon = challenge.icon;

            return (
              <article
                className={`challenge-card challenge-${challenge.accent}`}
                key={challenge.number}
              >

                <div className="challenge-card-top">
                  <span className="challenge-number">
                    {challenge.number}
                  </span>

                  <ArrowUpRight size={18} />
                </div>

                <div className="challenge-icon">
                  <Icon size={27} />
                </div>

                <div className="challenge-card-content">

                  <span className="challenge-tag">
                    {challenge.tag}
                  </span>

                  <h3>{challenge.title}</h3>

                  <p>{challenge.description}</p>

                </div>

                <div className="challenge-card-footer">
                  <span>
                    <Zap size={12} />
                    MISSION ACTIVE
                  </span>

                  <b>DX26</b>
                </div>

              </article>
            );
          })}

        </div>

        {/* LOWER INFORMATION STRIP */}
        <div className="challenge-info-strip">

          <div className="challenge-info-title">
            <span className="challenge-live-dot" />
            <strong>YOUR NEXT MOVE</strong>
          </div>

          <p>
            Choose your path. Assemble your team. Build something
            worth remembering.
          </p>

          <Link to="/register">
            START YOUR QUEST
            <ArrowUpRight size={15} />
          </Link>

        </div>

      </div>
    </section>
  );
}
