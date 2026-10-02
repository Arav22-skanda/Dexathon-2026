import {
  Database,
  MapPin,
  Target,
  UserRound,
} from "lucide-react";

export default function StatusHud() {
  return (
    <section className="dex-hud">

      <div className="hud-module">
        <Database size={17} />

        <div>
          <span>DEXATHON DATABASE</span>
          <strong>ONLINE</strong>
        </div>
      </div>

      <div className="hud-module">
        <UserRound size={17} />

        <div>
          <span>TRAINER STATUS</span>
          <strong>ACTIVE</strong>
        </div>
      </div>

      <div className="hud-module mission">
        <Target size={17} />

        <div>
          <span>MISSION</span>
          <strong>DEXATHON 2026</strong>
        </div>
      </div>

      <div className="hud-location">
        <MapPin size={18} />

        <div>
          <span>13.0109° N</span>
          <span>80.2341° E</span>
          <small>CHENNAI, TN</small>
        </div>
      </div>

    </section>
  );
}