import BrandingStrip from "../components/BrandingStrip";
import MainNavigation from "../components/MainNavigation";
import StatusHud from "../components/StatusHud";
import Hero from "../components/Hero";
import TrainerJourney from "../components/TrainerJourney";
import TrainerChallenges from "../components/TrainerChallenges";
import TrainerCards from "../components/TrainerCards";
import EventSchedule from "../components/EventSchedule";
import HelpDex from "../components/HelpDex";

export default function Home() {
  return (
    <>
      {/* TOP INSTITUTIONAL BRANDING */}
      <BrandingStrip />

      {/* MAIN NAVIGATION */}
      <MainNavigation />

      {/* STATUS / HUD BAR */}
      <StatusHud />

      <main>
        {/* HERO */}
        <Hero />

        {/* TRAINER JOURNEY */}
        <TrainerJourney />

        {/* TRAINER & CHALLENGES */}
        <TrainerChallenges />

        {/* TRAINER CARDS / QUEST MAP */}
        <TrainerCards />

        {/* EVENT SCHEDULE + WINNERS & PRIZES */}
        <EventSchedule />

        {/* HELPDEX / FAQ */}
        <HelpDex />
      </main>
    </>
  );
}