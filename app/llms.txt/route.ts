import { site } from "@/lib/site";

export const dynamic = "force-static";

/** Plain-text summary for AI assistants. How much they use it is unproven, but it is cheap and keeps the brand description consistent. */
export function GET() {
  const u = (p: string) => `${site.url}${p}`;
  const body = `# ${site.name}

> ${site.brandLine}

${site.name} builds an AI receptionist and voice agents that answer every call, book the appointment and follow up. It works in English, Arabic and Urdu. It also builds automations and full-stack software for startups. Based in ${site.city}, serving ${site.serving}. Not to be confused with other products that share the name "Conclave".

## What we do
- [AI voice agents and AI phone answering](${u("/services/voice")}): picks up in one ring, books into your calendar
- [After hours answering service](${u("/after-hours-answering-service")}): nights and weekends
- [Follow-up and missed call text back](${u("/services/follow-up")})
- [Booking](${u("/services/booking")}), [reactivation](${u("/services/reactivation")}), [outbound calling](${u("/services/outbound-calling")}), [reporting](${u("/services/reporting")})
- [AI agents for business](${u("/studio/agents")}) and [AI automation](${u("/studio/automations")})

## Who it is for
- [Clinics](${u("/industries/clinics")}), [med spas](${u("/industries/med-spas")}), [dental](${u("/industries/dental")}), [real estate](${u("/industries/real-estate")}), [home services](${u("/industries/home-services")})
- [UK](${u("/ai-receptionist-uk")}), [Canada](${u("/ai-receptionist-canada")}), [Gulf clinics](${u("/ai-receptionist-gulf-clinics")})

## Proof and comparison
- [Work](${u("/work")}) and [compare options](${u("/compare")})
- [Demos: hear a live agent](${u("/demos")})

## Contact
- ${u("/contact")} (book a call) · ${site.email}
- LinkedIn: ${site.social.linkedin}
- Instagram: ${site.social.instagram}
- X: ${site.social.x}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
