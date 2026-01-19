import { User } from "@domain/entities/auth/User";
export declare class UserRepository {
    hashPassword(password: string): Promise<string>;
    create(user: Partial<User>): Promise<User>;
    findById(id: string): Promise<User | null>;
    findAll(): Promise<User[] | null>;
    findByEmail(email: string): Promise<User | null>;
    update(id: string, data: Partial<User>): Promise<User>;
    findByToken(token: string): Promise<User | null>;
    findByVerificationCode(code: string): Promise<any>;
    findByVerificationToken(verificationEmailToken: string): Promise<any>;
}
//# sourceMappingURL=userRepository.d.ts.map