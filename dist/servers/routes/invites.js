import { sysActions } from "../../lib/actions.js";
import db from "../../lib/db.js";
import { sendAction } from "../../lib/eosio.js";
import { z } from "zod";
import { route } from "../trpc.js";
export const getInvites = route
    .input(z.object({ sponsor: z.string() }))
    .query(async (req) => {
    // TODO implement auth
    const invites = await db.inviteCode.findMany({
        where: { sponsorBoidId: req.input.sponsor },
        orderBy: { created: "desc" },
        include: { _count: { select: { used: true } } }
    });
    return invites || [];
});
export const createInvite = route
    .input(z.object({
    sponsorBoidId: z.string(),
    uses: z.number(),
    expires_utc_ms: z.number(),
    name: z.string(),
    sig: z.string()
}))
    .mutation(async (req) => {
    // TODO validate signature here
    console.log(req);
    const data = req.input;
    const created = await db.inviteCode.create({
        data: {
            expires: new Date(data.expires_utc_ms),
            sponsorBoidId: data.sponsorBoidId,
            usesRemaining: data.uses,
            name: data.name
        }
    });
    return created;
});
export const getInvite = route
    .input(z.object({
    sponsorName: z.string(),
    inviteCode: z.string()
}))
    .query(async (data) => {
    const exists = await db.inviteCode.findUnique({ where: { id: data.input.inviteCode } });
    if (!exists || exists.sponsorBoidId != data.input.sponsorName)
        throw new Error("invalid code");
    else
        return exists;
});
export const disableInvite = route
    .input(z.string())
    .mutation(async (req) => {
    // TODO add auth
    req.ctx;
    const exists = await db.inviteCode.update({ where: { id: req.input }, data: { disabled: true } });
    return exists;
});
export const useInvite = route
    .input(z.object({
    inviteCode: z.string(),
    boidId: z.string(),
    emailHash: z.string(),
    key: z.string()
}))
    .mutation(async (req) => {
    const params = req.input;
    const invite = await db.inviteCode.findUnique({ where: { id: params.inviteCode } });
    if (!invite)
        return new Error("invalid invite code");
    if (invite.disabled || invite.usesRemaining == 0 || invite.expires.getTime() < Date.now())
        return new Error("invite code is inactive");
    const exists = await db.boidAccount.findUnique({ where: { boidId: params.boidId } });
    if (exists)
        return new Error("specified Boid ID already exists");
    const existingHash = await db.inviteCodeUsed.findUnique({ where: { emailHash: params.emailHash } });
    if (existingHash)
        return new Error("email already in use");
    // create the pending
    const pending = await db.newAccountPending.create({
        data: {
            createBoidId: params.boidId,
            emailHash: params.emailHash,
            key: params.key,
            inviteCode: { connect: { id: invite.id } }
        }
    });
    //TODO trigger email send with the pending url
    throw new Error("implement use invite");
});
export const validatePendingInvite = route
    .input(z.object({
    pendingId: z.string()
}))
    .mutation(async ({ input }) => {
    const pendingCreate = await db.newAccountPending.findUnique({ where: { id: input.pendingId }, include: { inviteCode: { select: { id: true, sponsorBoidId: true, usesRemaining: true } } } });
    if (!pendingCreate)
        return new Error("invalid code");
    if (pendingCreate.inviteCode.usesRemaining <= 0)
        return new Error("invite no longer valid, contact sponsor for new invite code");
    if (pendingCreate.executed)
        return new Error("account already created");
    // trigger the action to purchase the sponsored account on behalf of the sponsor
    const result = await sendAction(sysActions.buyAccount({
        boid_id: pendingCreate.createBoidId,
        key: pendingCreate.key,
        sponsor: pendingCreate.inviteCode.sponsorBoidId
    }));
    if (!result)
        return new Error("error with create action");
    const finished = result.receipts.length > 0;
    if (!finished)
        return new Error("create action failed:" + JSON.stringify(result.errors));
    // save the boidid in the local cache, might already be cached so don't throw an error if it already exists
    await db.boidAccount.create({ data: { boidId: pendingCreate.createBoidId } }).catch(console.error);
    // update the pending row to mark as executed
    await db.newAccountPending.update({ where: { id: input.pendingId }, data: { executed: true } });
    // create the invitecodeused row
    await db.inviteCodeUsed.create({
        data: {
            boidIdCreated: pendingCreate.createBoidId,
            emailHash: pendingCreate.emailHash,
            InviteCode: { connect: { id: pendingCreate.inviteCodeId } },
            receipt: JSON.stringify(result, null, 2)
        }
    });
    // update the original invitecode row by decrementing the uses remaining
    await db.inviteCode.update({
        where: { id: pendingCreate.inviteCode.id },
        data: { usesRemaining: pendingCreate.inviteCode.usesRemaining - 1 }
    });
    return result;
});
//# sourceMappingURL=invites.js.map