export default function StepNav({
  labels,
  current,
  completedSteps,
  onSelect,
}: {
  labels: string[];
  current: number;
  completedSteps: boolean[];
  onSelect: (index: number) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-col sm:gap-1 sm:overflow-visible">
      {labels.map((label, id) => {
        const isActive = id === current;
        const isComplete = Boolean(completedSteps[id]);

        return (
          <button
            key={label}
            type="button"
            onClick={() => onSelect(id)}
            aria-current={isActive ? "step" : undefined}
            className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-left font-body text-sm transition-colors sm:w-full ${
              isActive ? "bg-wine text-cream" : "text-foreground/70 hover:bg-wine/5"
            }`}
          >
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-serif text-xs ${
                isActive
                  ? "bg-cream text-wine"
                  : isComplete
                    ? "border border-sage bg-sage/15 text-sage"
                    : "border border-current"
              }`}
            >
              {isComplete && !isActive ? "✓" : String(id + 1).padStart(2, "0")}
            </span>
            {label}
          </button>
        );
      })}
    </div>
  );
}
