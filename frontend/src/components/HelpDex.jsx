import { useState } from "react";
import {
  Search,
  ChevronDown,
  CircleHelp,
  ArrowUpRight,
} from "lucide-react";

import "./HelpDex.css";

const faqs = [
  {
    question: "Who can participate in DEXATHON 2026?",
    answer:
      "Students and teams eligible under the event guidelines can participate.",
  },
  {
    question: "How many members can be in one team?",
    answer:
      "Each team must have 4–6 members.",
  },
  {
    question: "What is the Round 1 registration fee?",
    answer:
      "The Round 1 and Round 2 registration fee is ₹300 per team.",
  },
  {
    question: "What is the final-round fee?",
    answer:
      "The final-round fee is ₹250 per participant.",
  },
  {
    question: "What is the event duration?",
    answer:
      "The final hackathon is a 24-hour event.",
  },
  {
    question: "Where will the final round be conducted?",
    answer:
      "The final round will be conducted at the Indoor Auditorium, Sathyabama Institute of Science and Technology, Chennai.",
  },
  {
    question: "Will food be provided?",
    answer:
      "Yes. Food will be provided during the final round.",
  },
  {
    question: "Will accommodation be provided?",
    answer:
      "Yes, accommodation will be provided for final-round teams according to organizer arrangements.",
  },
  {
    question: "Will participants receive certificates?",
    answer:
      "Yes. Round 1 and Round 2 participants will receive e-certificates, while selected final-round teams will receive physical certificates according to the stated criteria.",
  },
];

export default function HelpDex() {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(null);

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFaq = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <section className="helpdex-section" id="faq">
      <div className="helpdex-container">

        {/* HEADER */}
        <div className="helpdex-header">

          <div>
            <div className="helpdex-label">
              <span />
              DEXATHON HELPDEX
            </div>

            <h2>
              HAVE A
              <strong>QUESTION?</strong>
            </h2>

            <p>
              Find quick answers to the most common questions
              about DEXATHON 2026.
            </p>
          </div>

          <div className="helpdex-counter">
            <CircleHelp size={20} />
            <div>
              <strong>{faqs.length}</strong>
              <span>FAQS</span>
            </div>
          </div>

        </div>

        {/* SEARCH */}
        <div className="helpdex-search">
          <Search size={19} />

          <input
            type="text"
            placeholder="Search your questions..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <span>SEARCH</span>
        </div>

        {/* FAQ GRID */}
        <div className="helpdex-grid">

          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = active === index;

              return (
                <article
                  className={`helpdex-card ${
                    isOpen ? "is-open" : ""
                  }`}
                  key={faq.question}
                >

                  <button
                    className="helpdex-question"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                  >

                    <div className="helpdex-question-number">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="helpdex-question-text">
                      <span>HELPDEX QUERY</span>
                      <strong>{faq.question}</strong>
                    </div>

                    <div className="helpdex-toggle">
                      <ChevronDown
                        size={17}
                        className={isOpen ? "rotate" : ""}
                      />
                    </div>

                  </button>

                  <div
                    className={`helpdex-answer ${
                      isOpen ? "show" : ""
                    }`}
                  >
                    <p>{faq.answer}</p>
                  </div>

                </article>
              );
            })
          ) : (
            <div className="helpdex-no-results">
              <CircleHelp size={25} />
              <strong>NO MATCH FOUND</strong>
              <span>
                Try searching with a different question.
              </span>
            </div>
          )}

        </div>

        {/* BOTTOM STRIP */}
        <div className="helpdex-bottom">

          <div className="helpdex-bottom-left">
            <div className="helpdex-status-dot" />

            <div>
              <span>HELPDEX STATUS</span>
              <strong>ONLINE</strong>
            </div>
          </div>

          <div className="helpdex-bottom-message">
            CAN'T FIND YOUR ANSWER?
          </div>

          <a href="#contact">
            CONTACT ORGANIZERS
            <ArrowUpRight size={15} />
          </a>

        </div>

      </div>
    </section>
  );
}