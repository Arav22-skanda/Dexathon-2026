import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Crosshair,
  MapPin,
  Radar,
  ScanLine,
  Sparkles,
  Target,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

const TARGET_DATE = new Date("2026-11-04T10:30:00+05:30").getTime();

function getCountdown() {
  const difference = Math.max(0, TARGET_DATE - Date.now());
  const seconds = Math.floor(difference / 1000);

  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  };
}

function pad(value) {
  return String(value ?? 0).padStart(2, "0");
}

const journey = [
  {
    number: "01",
    title: "REGISTER",
    description: "Join the mission",
    link: "#register",
  },
  {
    number: "02",
    title: "SUBMIT",
    description: "Send your solution",
    link: "#rounds",
  },
  {
    number: "03",
    title: "QUALIFY",
    description: "Clear Round 1 & 2",
    link: "#timeline",
  },
  {
    number: "04",
    title: "CHAMPION",
    description: "Build for 24 hours",
    link: "#prizes",
  },
];

export default function Hero() {
  const [countdown, setCountdown] = useState(getCountdown());

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, {
    stiffness: 90,
    damping: 22,
  });

  const springY = useSpring(mouseY, {
    stiffness: 90,
    damping: 22,
  });

  const imageX = useTransform(springX, [-500, 500], [-6, 6]);
  const imageY = useTransform(springY, [-500, 500], [-5, 5]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);

    mouseX.set(x);
    mouseY.set(y);
  };

  const countdownItems = [
    {
      label: "DAYS",
      value: countdown.days,
    },
    {
      label: "HRS",
      value: countdown.hours,
    },
    {
      label: "MIN",
      value: countdown.minutes,
    },
    {
      label: "SEC",
      value: countdown.seconds,
    },
  ];

  return (
    <section className="animated-hero" onMouseMove={handleMouseMove}>
      <div className="hero-grid-noise" />
      <div className="hero-blue-orb hero-blue-orb-one" />
      <div className="hero-blue-orb hero-blue-orb-two" />

      <div className="animated-hero-inner">

        {/* ================= LEFT ================= */}

        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
        >
          <div className="hero-kicker">
            <span />
            OFFICIAL DIGITAL ADVENTURE
          </div>

          <div className="hero-title-wrap">

            <motion.div
              className="hero-title-small"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1,
                duration: 0.5,
              }}
            >
              DEXATHON
            </motion.div>

            <motion.div
              className="hero-title-year"
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                delay: 0.2,
                duration: 0.55,
              }}
            >
              2026
            </motion.div>

            <div className="hero-title-rule">
              <span>24-HOUR HACKATHON</span>
              <i />
            </div>

          </div>

          <p className="hero-tagline">
            Catch Ideas. Build Solutions. Become a Champion.
          </p>

          <div className="hero-facts">

            <div>
              <CalendarDays size={14} />

              <span>
                DATE
                <strong>4–5 NOV 2026</strong>
              </span>
            </div>

            <div>
              <MapPin size={14} />

              <span>
                VENUE
                <strong>INDOOR AUDITORIUM</strong>
              </span>
            </div>

            <div>
              <Users size={14} />

              <span>
                TEAM SIZE
                <strong>4–6 TRAINERS</strong>
              </span>
            </div>

            <div>
              <Clock3 size={14} />

              <span>
                DURATION
                <strong>24 HOURS</strong>
              </span>
            </div>

          </div>

          <div className="hero-actions">

            <a
              href="#register"
              className="hero-primary"
            >
              START YOUR JOURNEY
              <ArrowRight size={16} />
            </a>

            <a
              href="#rounds"
              className="hero-secondary"
            >
              EXPLORE DEXATHON
              <Radar size={15} />
            </a>

            <a
              href="#rules"
              className="hero-link"
            >
              VIEW RULES
              <ArrowRight size={13} />
            </a>

          </div>

          {/* COUNTDOWN */}

          <div className="hero-countdown">

            {countdownItems.map((item) => (
              <div
                className="count-box"
                key={item.label}
              >
                <motion.strong
                  key={`${item.label}-${item.value}`}
                  initial={{
                    opacity: 0,
                    y: -6,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.18,
                  }}
                >
                  {pad(item.value)}
                </motion.strong>

                <span>{item.label}</span>
              </div>
            ))}

          </div>

        </motion.div>

        {/* ================= RIGHT ================= */}

        <motion.div
          className="hero-visual"
          initial={{
            opacity: 0,
            x: 30,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: "easeOut",
          }}
        >

          <motion.div
            className="campus-frame"
            style={{
              x: imageX,
              y: imageY,
            }}
          >

            <img
              src="/sathyabama-campus.jpg"
              alt="Sathyabama Institute of Science and Technology campus"
            />

            <div className="campus-darken" />
            <div className="scan-grid" />
            <div className="scan-beam" />

            <div className="hud-corner top-left" />
            <div className="hud-corner top-right" />
            <div className="hud-corner bottom-left" />
            <div className="hud-corner bottom-right" />

            <div className="campus-topline">
              <span>LOCATION SCAN</span>
              <b>CHENNAI HQ</b>
            </div>

            <div className="campus-coordinate">
              DEXATHON HQ
            </div>

            <motion.div
              className="target-reticle"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Crosshair size={56} />
            </motion.div>

            <div className="target-label">
              <Target size={12} />
              TARGET LOCKED
            </div>

            <div className="campus-side-status">

              <span>SCAN</span>
              <strong>ONLINE</strong>

              <i />

              <span>MISSION</span>
              <strong>ACTIVE</strong>

            </div>

            <div className="campus-caption">

              <div>
                <Sparkles size={13} />

                <span>
                  SATHYABAMA INSTITUTE OF SCIENCE AND TECHNOLOGY
                </span>
              </div>

              <small>
                INDOOR AUDITORIUM · CHENNAI, TAMIL NADU
              </small>

            </div>

          </motion.div>

          {/* FLOATING MISSION CARD */}

          <motion.div
            className="mission-card-float"
            animate={{
              y: [0, -7, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >

            <div className="mission-orb">
              <Zap size={17} />
            </div>

            <div>
              <span>MISSION STATUS</span>
              <strong>READY TO BUILD</strong>
            </div>

            <div className="mission-code">
              DX26
            </div>

          </motion.div>

          {/* ELIGIBILITY */}

          <div className="hero-eligibility">

            <div>
              <span>TEAM ELIGIBILITY</span>
              <strong>4–6 TRAINERS</strong>
            </div>

            <CheckCircle2 size={19} />

          </div>

        </motion.div>

      </div>

      {/* ================= JOURNEY ================= */}

      <div className="journey-rail">

        <div className="journey-rail-label">
          <span>TRAINER JOURNEY</span>
          <b>MISSION PATH</b>
        </div>

        <div className="journey-rail-items">

          {journey.map((item, index) => (
            <motion.a
              key={item.number}
              href={item.link}
              className="journey-node"
              whileHover={{
                y: -3,
              }}
            >

              <span>
                {item.number}
              </span>

              <strong>
                {item.title}
              </strong>

              <small>
                {item.description}
              </small>

              {index < journey.length - 1 && (
                <i />
              )}

            </motion.a>
          ))}

        </div>

      </div>

      <motion.div
        className="hero-scroll-cue"
        animate={{
          y: [0, 6, 0],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
        }}
      >
        SCROLL TO EXPLORE
        <ScanLine size={13} />
      </motion.div>

    </section>
  );
}