import type { backendInterface } from "../backend";

export const mockBackend: backendInterface = {
  getAllSubmissions: async () => [
    {
      id: BigInt(1),
      name: "Recruiter Test",
      submittedAt: BigInt(Date.now()),
      email: "recruiter@example.com",
      message: "Great portfolio! Let's connect.",
    },
  ],
  submitContact: async (_name: string, _email: string, _message: string) => ({
    __kind__: "ok" as const,
    ok: BigInt(1),
  }),
};
