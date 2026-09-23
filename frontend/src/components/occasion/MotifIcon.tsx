import type { MotifIconName } from "@/content/occasions";
import Kalash from "@/components/wedding/motifs/Kalash";
import Diya from "@/components/wedding/motifs/Diya";
import LotusIcon from "@/components/wedding/motifs/LotusIcon";
import PeacockFeather from "@/components/wedding/motifs/PeacockFeather";
import ToranStrip from "@/components/wedding/motifs/ToranStrip";

export default function MotifIcon({
  name,
  className = "h-14 w-14",
}: {
  name: MotifIconName;
  className?: string;
}) {
  switch (name) {
    case "kalash":
      return <Kalash className={className} />;
    case "diya":
      return <Diya className={className} />;
    case "lotus":
      return <LotusIcon className={className} />;
    case "peacock":
      return <PeacockFeather className={className} />;
    case "toran":
      return <ToranStrip className={className} />;
    default:
      return null;
  }
}
