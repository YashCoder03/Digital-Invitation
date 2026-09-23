"use client";

import { useState } from "react";
import type { WeddingEventItem } from "@/content/customizer";
import { getOccasionConfig } from "@/lib/occasionConfig";
import FormField from "../FormField";

export default function EventsStep({
  occasion,
  value,
  onChange,
}: {
  occasion: string;
  value: WeddingEventItem[];
  onChange: (next: WeddingEventItem[]) => void;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const eventTypes = getOccasionConfig(occasion).eventTypes;

  function updateEvent(id: string, patch: Partial<WeddingEventItem>) {
    onChange(value.map((event) => (event.id === id ? { ...event, ...patch } : event)));
  }

  function removeEvent(id: string) {
    onChange(value.filter((event) => event.id !== id));
  }

  function moveEvent(index: number, direction: -1 | 1) {
    const next = [...value];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  function addPreset(preset: (typeof eventTypes)[number]) {
    const newEvent: WeddingEventItem = {
      id: `${preset.id}-${Date.now()}`,
      emoji: preset.emoji,
      name: preset.name,
      date: "",
      time: "",
      venue: "",
      address: "",
    };
    onChange([...value, newEvent]);
    setEditingId(newEvent.id);
  }

  return (
    <div>
      <h2 className="font-serif text-2xl text-wine">Add your events</h2>
      <p className="mt-1 font-body text-sm text-foreground/60">
        Reorder, edit, or add events using the presets below.
      </p>

      <div className="mt-6 flex flex-col gap-4">
        {value.map((event, index) => (
          <div key={event.id} className="rounded-2xl border border-gold/30 bg-cream p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{event.emoji}</span>
                <div>
                  <p className="font-serif text-lg text-wine">{event.name || "Untitled Event"}</p>
                  <p className="font-body text-sm text-foreground/60">
                    {[event.date, event.time].filter(Boolean).join(" \u00B7 ") || "Add date & time"}
                  </p>
                  <p className="font-body text-sm text-foreground/50">{event.venue}</p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveEvent(index, -1)}
                  disabled={index === 0}
                  aria-label="Move up"
                  className="rounded-full px-2 py-1 text-foreground/50 hover:bg-wine/5 disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveEvent(index, 1)}
                  disabled={index === value.length - 1}
                  aria-label="Move down"
                  className="rounded-full px-2 py-1 text-foreground/50 hover:bg-wine/5 disabled:opacity-30"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => setEditingId(editingId === event.id ? null : event.id)}
                  className="rounded-full border border-wine/30 px-3 py-1.5 font-body text-xs uppercase tracking-widest text-wine transition-colors hover:bg-wine/10"
                >
                  {editingId === event.id ? "Done" : "Edit"}
                </button>
                <button
                  type="button"
                  onClick={() => removeEvent(event.id)}
                  aria-label="Remove event"
                  className="rounded-full px-2 py-1 text-foreground/40 hover:text-red"
                >
                  ✕
                </button>
              </div>
            </div>

            {editingId === event.id && (
              <div className="mt-4 grid gap-3 border-t border-gold/20 pt-4 sm:grid-cols-2">
                <FormField label="Event Name" value={event.name} onChange={(v) => updateEvent(event.id, { name: v })} />
                <FormField label="Date" value={event.date} onChange={(v) => updateEvent(event.id, { date: v })} />
                <FormField label="Time" value={event.time} onChange={(v) => updateEvent(event.id, { time: v })} />
                <FormField label="Venue" value={event.venue} onChange={(v) => updateEvent(event.id, { venue: v })} />
                <div className="sm:col-span-2">
                  <FormField
                    label="Address"
                    value={event.address}
                    onChange={(v) => updateEvent(event.id, { address: v })}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <p className="font-body text-xs uppercase tracking-widest text-foreground/40">
          + Add Event
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {eventTypes.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => addPreset(preset)}
              className="rounded-full border border-gold/30 bg-cream px-4 py-2 font-body text-sm text-foreground/70 transition-colors hover:border-wine hover:text-wine"
            >
              {preset.emoji} {preset.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
