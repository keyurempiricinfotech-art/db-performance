import { UserRepository } from "./UserRepository";

export class AuthController {
  constructor(private readonly users: UserRepository) {}

  async login(req: { body: { email: string } }, res: { json(value: unknown): void }) {
    const user = await this.users.findUserByEmail(req.body.email);
    res.json({ ok: Boolean(user), userId: user?.id ?? null });
  }
}
