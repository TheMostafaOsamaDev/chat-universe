export function getClaimFactory(req?: import('next').NextApiRequest, res?: import('next').NextApiResponse): getClaim;
export type getClaim = (claim: string, type?: "access_token" | "id_token") => Promise<{
    name: string;
    value: string;
}> | null;
//# sourceMappingURL=getClaim.d.ts.map