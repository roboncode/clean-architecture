export interface CreateUserUseCase {
  execute(user: User): Promise<User>;
}