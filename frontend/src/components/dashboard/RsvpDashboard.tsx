"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SiteHeader from "@/components/site/SiteHeader";
import { useAuth } from "@/context/AuthContext";
import { getRsvpSummary } from "@/lib/api/rsvp";
import type { RsvpSummaryResponseDto } from "@/lib/api/types";
import { ApiError } from "@/lib/api/client";

type LoadState =
  | { status: "loading" }
  | { status: "ready"; summary: RsvpSummaryResponseDto }
  | { status: "error"; message: string };

export default function RsvpDashboard({ invitationId }: { invitationId: string }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [state, setState] = useState<LoadState>({ status: "loading" });
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    getRsvpSummary(invitationId)
      .then((summary) => {
        if (!cancelled) setState({ status: "ready", summary });
      })
      .catch((err) => {
        if (!cancelled) {
          setState({
            status: "error",
            message: err instanceof ApiError ? err.message : "Something went wrong. Please try again.",
          });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [user, invitationId, reloadToken]);

  if (loading || !user) return null;

  return (
    <div className="flex flex-1 flex-col bg-ivory">
      <SiteHeader />

      <section className="mx-auto w-full max-w-4xl flex-1 px-6 py-12">
        <Link href="/dashboard/invitations" className="font-body text-sm text-foreground/60 hover:text-wine">
          ← My Invitations
        </Link>
        <h1 className="mt-3 font-serif text-3xl text-wine">RSVP Responses</h1>

        {state.status === "loading" && (
          <p className="mt-10 font-body text-sm text-foreground/60">Loading responses…</p>
        )}

        {state.status === "error" && (
          <div className="mt-10 flex flex-col items-start gap-3">
            <p className="font-body text-sm text-red">{state.message}</p>
            <button
              type="button"
              onClick={() => {
                setState({ status: "loading" });
                setReloadToken((n) => n + 1);
              }}
              className="rounded-full border border-wine/30 px-4 py-2 font-body text-xs uppercase tracking-widest text-wine transition-colors hover:bg-wine/5"
            >
              Try Again
            </button>
          </div>
        )}

        {state.status === "ready" && (
          <>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: "Total Responses", value: state.summary.totalResponses },
                { label: "Attending", value: state.summary.attending },
                { label: "Not Attending", value: state.summary.notAttending },
                { label: "Total Guests", value: state.summary.totalGuests },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-gold/20 bg-cream p-5 text-center">
                  <p className="font-serif text-3xl text-wine">{stat.value}</p>
                  <p className="mt-1 font-body text-xs uppercase tracking-widest text-foreground/50">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-gold/20">
              {state.summary.responses.length === 0 ? (
                <p className="bg-cream p-8 text-center font-body text-sm text-foreground/60">
                  No RSVP responses yet.
                </p>
              ) : (
                <table className="w-full text-left">
                  <thead className="bg-cream">
                    <tr className="font-body text-xs uppercase tracking-widest text-foreground/50">
                      <th className="px-5 py-3">Guest Name</th>
                      <th className="px-5 py-3">Attendance</th>
                      <th className="px-5 py-3">Guest Count</th>
                      <th className="px-5 py-3">Response Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.summary.responses.map((response) => (
                      <tr key={response.id} className="border-t border-gold/10 bg-ivory font-body text-sm">
                        <td className="px-5 py-3 text-foreground">{response.guestName}</td>
                        <td className="px-5 py-3">
                          <span className={response.attending ? "text-sage" : "text-red"}>
                            {response.attending ? "Attending" : "Not Attending"}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-foreground/70">{response.guestCount}</td>
                        <td className="px-5 py-3 text-foreground/70">
                          {new Date(response.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
