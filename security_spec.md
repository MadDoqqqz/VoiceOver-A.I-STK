# Security Specification: VoiceOver AI

## Data Invariants
1. A voice profile must belong to a valid user.
2. Only the owner of a voice can use it for generation.
3. Users cannot modify their own subscription plan directly via client-side SDK.
4. Voice training status can only be updated by the system (via admin/server logic).

## The Dirty Dozen Payloads
1. Create a user profile with `plan: "pro"` while paying for free.
2. Update another user's `displayName`.
3. List all voices in the system.
4. Delete a voice profile belonging to another user.
5. Create a voice profile with a massive 1MB string for `name`.
6. Read `elevenLabsVoiceId` of another user's voice.
7. Spoof `ownerId` in an audio generation record.
8. Update `createdAt` timestamp to a past date.
9. Delete an audio record without being the owner.
10. Update `quality` score of a voice to 100% manually.
11. Inject malicious script into the `text` field of audio generation.
12. Access PII (email) of other users.

## Security Controls
- **isValidId()** check on all document IDs.
- **Master Gate** pattern for all sub-resources.
- **immutable()** helper for fields like `createdAt`.
- **affectedKeys().hasOnly()** for updates.
- **isAdmin()** check for system-level updates (optional).
