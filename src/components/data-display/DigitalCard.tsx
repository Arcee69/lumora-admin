import logo from "../../assets/lumora-logo.png";
import { Eyebrow } from "../ui/Eyebrow";

interface DigitalCardProps {
  memberName: string;
  memberId: string;
  plan: string;
  status: string;
}

/** Member's digital insurance card preview. */
export const DigitalCard = ({ memberName, memberId, plan, status }: DigitalCardProps) => (
  <div className="mx-auto mb-[25px] mt-2.5 max-w-[440px] rounded-[14px] bg-brand-900 p-[22px] text-canvas shadow-[0_10px_30px_#03403115] md:p-[25px]">
    <img src={logo} alt="Lumora Health" className="mb-[30px] h-auto w-[190px] rounded bg-canvas p-1" />
    <Eyebrow className="text-gold">MEMBER CARD</Eyebrow>
    <h2 className="my-2.5 text-[22px]">{memberName}</h2>
    <strong className="font-display text-lg text-gold">{memberId}</strong>
    <div className="mt-[25px] flex justify-between gap-[15px] border-t border-white/20 pt-5 text-xs md:text-sm">
      <span>{plan} plan</span>
      <span>{status}</span>
    </div>
  </div>
);
