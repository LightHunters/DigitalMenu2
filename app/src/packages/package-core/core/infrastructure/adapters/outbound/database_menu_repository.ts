import { PrismaClient } from "@prisma/client";
import { MenuRepository } from "../../../domain/repositories/menu_repository";
import { MenuBasicProps, MenuCreateInput } from "@/packages/package-core/types";
import { Menu } from "../../../domain/entities/menu";
import { UserRepository } from "../../../domain/repositories/user_repository";
import { User } from "../../../domain/entities/user";

export class DatabaseMenuRepository implements MenuRepository {
    constructor(
        private menuRepository: MenuRepository,
        private userRepository: UserRepository
    ) { }

    async create(menu: Menu): Promise<Menu> {

        const final_payload = {
            ...menu,
            createdAt: new Date,
            createdBy: ""
        } as MenuCreateInput
        try {
            return await this.menuRepository.create(final_payload);
        } catch (e) {
            throw new Error("Error on created")
        }

    }

}