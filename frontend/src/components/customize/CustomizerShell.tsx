"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { defaultCustomizerState, createInitialCustomizerState, type CustomizerState } from "@/content/customizer";
import type { WeddingEventItem } from "@/content/customizer";
import type { Invitation } from "@/types/invitation";
import { getInvitation, ensureInvitation, updateInvitation } from "@/lib/invitationStorage";
import { customizerStateToInvitation, invitationToCustomizerState, generateSlug } from "@/lib/invitationUtils";
import { createInvitation, getInvitationById, updateInvitationById } from "@/lib/api/invitations";
import { createEvent, deleteEvent, listEvents, reorderEvents, updateEvent } from "@/lib/api/events";
import { buildInvitationRequest, mapInvitationResponseToInvitation } from "@/lib/mappers/invitationMapper";
import { buildEventRequest, mapEventResponseToItem } from "@/lib/mappers/eventMapper";
import { getTemplateComponent } from "@/lib/templateRegistry";
import { getOccasionConfig } from "@/lib/occasionConfig";
import TopBar from "./TopBar";
import StepNav from "./StepNav";
import CoupleStep from "./steps/CoupleStep";
import EventsStep from "./steps/EventsStep";
import PhotosStep from "./steps/PhotosStep";
import BackendPhotosStep from "./steps/BackendPhotosStep";
import StyleStep from "./steps/StyleStep";
import DetailsStep from "./steps/DetailsStep";
import LivePreview from "./LivePreview";
import BottomActionBar from "./BottomActionBar";

// The Spring Boot backend is Phase 1 wedding-only; every other occasion keeps using
// the original localStorage prototype untouched.
const BACKEND_OCCASION = "wedding";

export default function CustomizerShell({
  occasion,
  style,
  badgeLabel,
  invitationId,
}: {
  occasion: string;
  style: string;
  badgeLabel: string;
  invitationId?: string;
}) {
  const router = useRouter();
  const backHref = `/${occasion}`;
  const isBackendOccasion = occasion === BACKEND_OCCASION;
  const localInvitationId = `${occasion}-${style}`;
  const stepLabels = [getOccasionConfig(occasion).firstStepLabel, "Events", "Photos", "Style", "Details"];

  const [state, setState] = useState<CustomizerState>(() => createInitialCustomizerState(occasion));
  const [currentStep, setCurrentStep] = useState(0);
  const [backendPhotosCount, setBackendPhotosCount] = useState(0);
  const [saveStatus, setSaveStatus] = useState<"saving" | "saved" | "error">("saved");
  const [saveError, setSaveError] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const hydrated = useRef(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Backend-only bookkeeping: the real invitation id (assigned on first save) and the
  // last event list we know the backend already has, so autosave can diff instead of
  // recreating everything on every pass.
  const [backendInvitationId, setBackendInvitationId] = useState<string | null>(invitationId ?? null);
  const syncedEvents = useRef<WeddingEventItem[]>([]);

  // load the invitation draft for this occasion+style, seeding one from defaults if it's new
  useEffect(() => {
    let cancelled = false;

    async function loadFromBackend() {
      if (!invitationId) {
        // Pre-select whichever template the user arrived with (e.g. /create/paithani), falling
        // back to the default theme only if it isn't a template we can actually render.
        const theme = getTemplateComponent(style) ? style : defaultCustomizerState.style.theme;
        const seeded = createInitialCustomizerState(occasion);
        setState({ ...seeded, style: { ...seeded.style, theme } });
        hydrated.current = true;
        return;
      }
      try {
        const [invitationDto, eventDtos] = await Promise.all([
          getInvitationById(invitationId),
          listEvents(invitationId),
        ]);
        if (cancelled) return;
        const events = eventDtos.map(mapEventResponseToItem);
        syncedEvents.current = events;
        setBackendInvitationId(invitationDto.id);
        const invitation = mapInvitationResponseToInvitation(invitationDto, { occasion, style, events });
        setState(invitationToCustomizerState(invitation));
      } catch {
        if (!cancelled) setState(createInitialCustomizerState(occasion));
      } finally {
        if (!cancelled) hydrated.current = true;
      }
    }

    if (isBackendOccasion) {
      loadFromBackend();
    } else {
      // Seed a brand-new local invitation with the template the user actually arrived
      // with (e.g. /create/birthday-elegant), not the hardcoded default theme.
      const seedTheme = getTemplateComponent(style) ? style : defaultCustomizerState.style.theme;
      const initialState = createInitialCustomizerState(occasion);
      const seedState: CustomizerState = {
        ...initialState,
        style: { ...initialState.style, theme: seedTheme },
      };
      const invitation = ensureInvitation(localInvitationId, () =>
        customizerStateToInvitation(seedState, {
          id: localInvitationId,
          slug: generateSlug(seedState.couple.groomName, seedState.couple.brideName, localInvitationId),
          occasion,
          style,
        })
      );
      // Self-heal drafts saved by an earlier bug where every occasion was seeded with the
      // templateId, couple names, and events of the wedding defaults (localInvitationId already
      // scopes one draft per occasion+style, so this only ever touches that occasion's own draft).
      const patch: Partial<Invitation> = {};
      if (invitation.templateId !== seedTheme) patch.templateId = seedTheme;

      const staleWeddingEventIds = ["haldi", "mehendi", "sangeet", "vivah", "reception"];
      const hasStaleWeddingSeed =
        occasion !== "wedding" &&
        invitation.groomName === defaultCustomizerState.couple.groomName &&
        invitation.brideName === defaultCustomizerState.couple.brideName &&
        invitation.events.length === staleWeddingEventIds.length &&
        invitation.events.every((event, index) => event.id === staleWeddingEventIds[index]);

      if (hasStaleWeddingSeed) {
        patch.groomName = seedState.couple.groomName;
        patch.brideName = seedState.couple.brideName;
        patch.title = seedState.couple.title || undefined;
        patch.age = seedState.couple.age ? Number(seedState.couple.age) || undefined : undefined;
        patch.events = seedState.events;
      }

      const healedInvitation =
        Object.keys(patch).length > 0 ? updateInvitation(localInvitationId, { ...invitation, ...patch }) : invitation;
      // Hydrates from localStorage, which isn't available during server rendering.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState(invitationToCustomizerState(healedInvitation ?? invitation));
      hydrated.current = true;
    }

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localInvitationId, isBackendOccasion, invitationId]);

  // autosave to the invitation store, debounced
  useEffect(() => {
    if (!hydrated.current) return;
    setSaveStatus("saving");
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      persist();
    }, 600);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  async function persist(): Promise<boolean> {
    if (!isBackendOccasion) {
      const existing = getInvitation(localInvitationId);
      const invitation = customizerStateToInvitation(state, {
        id: localInvitationId,
        slug: existing?.slug ?? generateSlug(state.couple.groomName, state.couple.brideName, localInvitationId),
        occasion,
        style,
        status: existing?.status,
        createdAt: existing?.createdAt,
      });
      updateInvitation(localInvitationId, invitation);
      setSaveStatus("saved");
      setSaveError(null);
      return true;
    }

    try {
      const request = buildInvitationRequest(state);
      let id = backendInvitationId;

      if (!id) {
        const created = await createInvitation(request);
        id = created.id;
        setBackendInvitationId(id);
        const params = new URLSearchParams(window.location.search);
        params.set("id", id);
        // Preserve whichever route we're mounted under (/customize or /create/{templateId}).
        router.replace(`${window.location.pathname}?${params.toString()}`);
      } else {
        await updateInvitationById(id, request);
      }

      await syncEvents(id, state.events);

      setSaveStatus("saved");
      setSaveError(null);
      return true;
    } catch (err) {
      setSaveStatus("error");
      setSaveError(err instanceof Error ? err.message : "Unable to save. Please try again.");
      return false;
    }
  }

  /** Diffs the current events against the last-synced snapshot and calls the right endpoints. */
  async function syncEvents(invId: string, events: WeddingEventItem[]) {
    const prev = syncedEvents.current;
    const prevById = new Map(prev.map((event) => [event.id, event]));
    const nextIds = new Set(events.map((event) => event.id));

    for (const event of prev) {
      if (!nextIds.has(event.id)) {
        await deleteEvent(event.id);
      }
    }

    const synced: WeddingEventItem[] = [];
    for (let index = 0; index < events.length; index++) {
      const item = events[index];
      const before = prevById.get(item.id);
      if (!before) {
        const created = await createEvent(invId, buildEventRequest(item, index));
        synced.push(mapEventResponseToItem(created));
      } else if (
        before.name !== item.name ||
        before.date !== item.date ||
        before.time !== item.time ||
        before.venue !== item.venue ||
        before.address !== item.address
      ) {
        const updated = await updateEvent(item.id, buildEventRequest(item, index));
        synced.push(mapEventResponseToItem(updated));
      } else {
        synced.push(item);
      }
    }

    const prevOrder = prev.filter((event) => nextIds.has(event.id)).map((event) => event.id).join(",");
    const nextOrder = synced.map((event) => event.id).join(",");
    if (synced.length > 1 && prevOrder !== nextOrder) {
      await reorderEvents(invId, synced.map((event) => event.id));
    }

    syncedEvents.current = synced;
    if (synced.some((event, index) => event.id !== events[index]?.id)) {
      setState((s) => ({ ...s, events: synced }));
    }
  }

  async function saveDraftNow() {
    await persist();
  }

  function goToStep(index: number) {
    setCurrentStep(Math.max(0, Math.min(stepLabels.length - 1, index)));
  }

  async function handleContinue() {
    if (currentStep < stepLabels.length - 1) {
      setCurrentStep(currentStep + 1);
      return;
    }
    const ok = await persist();
    if (!ok) return;
    router.push(`/preview/${isBackendOccasion ? backendInvitationId ?? localInvitationId : localInvitationId}`);
  }

  async function handlePublish() {
    const ok = await persist();
    if (!ok) return;
    router.push(`/preview/${isBackendOccasion ? backendInvitationId ?? localInvitationId : localInvitationId}`);
  }

  // Drives the StepNav checkmarks only - never gates navigation between sections.
  const photosComplete = isBackendOccasion
    ? backendPhotosCount > 0
    : Boolean(state.photos.couple || state.photos.gallery.length > 0 || state.photos.family.length > 0);
  const completedSteps = [
    Boolean(state.couple.groomName.trim()),
    state.events.length > 0,
    photosComplete,
    Boolean(state.style.theme),
    Boolean(state.details.message.trim() || state.details.venueName.trim()),
  ];

  return (
    <div className="flex flex-1 flex-col bg-ivory">
      <TopBar
        backHref={backHref}
        badgeLabel={badgeLabel}
        saveStatus={saveStatus}
        saveError={saveError}
        onSaveDraft={saveDraftNow}
        onRetry={saveDraftNow}
        onPreview={() => setPreviewOpen(true)}
        onContinue={handleContinue}
        continueLabel={currentStep === stepLabels.length - 1 ? "Continue to Publish" : "Continue"}
      />

      <div className="mx-auto grid w-full max-w-6xl flex-1 gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_400px]">
        <div>
          <StepNav labels={stepLabels} current={currentStep} completedSteps={completedSteps} onSelect={goToStep} />

          <div className="mt-6 rounded-2xl border border-gold/20 bg-cream p-6 sm:p-8">
            {currentStep === 0 && (
              <CoupleStep occasion={occasion} value={state.couple} onChange={(couple) => setState({ ...state, couple })} />
            )}
            {currentStep === 1 && (
              <EventsStep occasion={occasion} value={state.events} onChange={(events) => setState({ ...state, events })} />
            )}
            {currentStep === 2 && (
              isBackendOccasion ? (
                <BackendPhotosStep invitationId={backendInvitationId} onCountChange={setBackendPhotosCount} />
              ) : (
                <PhotosStep value={state.photos} onChange={(photos) => setState({ ...state, photos })} />
              )
            )}
            {currentStep === 3 && (
              <StyleStep occasion={occasion} value={state.style} onChange={(style) => setState({ ...state, style })} />
            )}
            {currentStep === 4 && (
              <DetailsStep occasion={occasion} value={state.details} onChange={(details) => setState({ ...state, details })} />
            )}

            <div className="mt-8 flex items-center justify-between border-t border-gold/10 pt-6">
              {currentStep > 0 ? (
                <button
                  type="button"
                  onClick={() => goToStep(currentStep - 1)}
                  className="rounded-full border border-wine/30 px-5 py-2.5 font-body text-sm uppercase tracking-widest text-wine transition-colors hover:bg-wine/5"
                >
                  ← Previous
                </button>
              ) : (
                <span />
              )}

              {currentStep < stepLabels.length - 1 ? (
                <button
                  type="button"
                  onClick={() => goToStep(currentStep + 1)}
                  className="rounded-full bg-wine px-6 py-2.5 font-body text-sm uppercase tracking-widest text-cream shadow-sm transition-colors hover:bg-wine/90"
                >
                  Next →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setPreviewOpen(true)}
                  className="rounded-full bg-wine px-6 py-2.5 font-body text-sm uppercase tracking-widest text-cream shadow-sm transition-colors hover:bg-wine/90"
                >
                  Preview Invitation
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="mb-3 text-center font-body text-xs uppercase tracking-widest text-foreground/40 lg:text-left">
            Live Preview
          </p>
          <LivePreview occasion={occasion} state={state} />
        </div>
      </div>

      <BottomActionBar onPreview={() => setPreviewOpen(true)} onPublish={handlePublish} />

      {previewOpen && (
        <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-wine/90 px-4 py-8 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setPreviewOpen(false)}
            className="mx-auto mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-cream text-wine shadow-sm"
            aria-label="Close preview"
          >
            ✕
          </button>
          <LivePreview occasion={occasion} state={state} />
        </div>
      )}
    </div>
  );
}

