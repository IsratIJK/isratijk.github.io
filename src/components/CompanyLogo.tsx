import { useState } from "react";
import { cn } from "@/lib/utils";

interface CompanyLogoProps {
  name: string;
  src: string;
  className?: string;
}

const CompanyLogo = ({ name, src, className = "" }: CompanyLogoProps) => {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={cn(
        "flex-shrink-0 w-12 h-12 rounded-xl border border-border/70 bg-white flex items-center justify-center overflow-hidden",
        className,
      )}
    >
      {failed ? (
        <span className="font-display text-sm font-semibold text-gold" aria-hidden="true">
          {name.charAt(0)}
        </span>
      ) : (
        <img
          src={src}
          alt={`${name} logo`}
          width={48}
          height={48}
          loading="lazy"
          onError={() => setFailed(true)}
          className="w-full h-full object-contain p-1.5"
        />
      )}
    </div>
  );
};

export default CompanyLogo;
