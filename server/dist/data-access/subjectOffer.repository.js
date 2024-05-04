"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const subjectOffer_model_1 = __importDefault(require("../models/subjectOffer.model"));
const userRoles_1 = require("../utils/constants/userRoles");
const paginationOptions_1 = require("../utils/constants/paginationOptions");
class SubjectOfferRepository {
    async save(subjectOffer) {
        const repository = (0, typeorm_1.getRepository)(subjectOffer_model_1.default);
        return repository.save(subjectOffer);
    }
    async bulkCreate(subjectOffer) {
        const repository = (0, typeorm_1.getRepository)(subjectOffer_model_1.default);
        return repository.save(subjectOffer);
    }
    async findByIds(ids) {
        const repository = (0, typeorm_1.getRepository)(subjectOffer_model_1.default);
        return repository.findByIds(ids, {
            relations: ["period", "subject", "teachers", "subject.course"],
        });
    }
    async findExistentBulkSubject(courseId, perdiodId, addRequired, addOptional) {
        const repository = (0, typeorm_1.getRepository)(subjectOffer_model_1.default);
        return repository.find({
            where: {
                course: {
                    id: courseId,
                },
                period: {
                    id: perdiodId,
                },
                class: "unique",
                ...(addRequired && addOptional ? {} : { optionalSubject: addOptional }),
            },
            relations: ["subject"],
        });
    }
    async update(subjectOffer) {
        const repository = (0, typeorm_1.getRepository)(subjectOffer_model_1.default);
        return repository.save(subjectOffer);
    }
    async findOne(id) {
        const repository = (0, typeorm_1.getRepository)(subjectOffer_model_1.default);
        return repository.findOne(id);
    }
    async closeSubjectsByPeriod(subjectsIds, periodId, close) {
        const repository = (0, typeorm_1.getRepository)(subjectOffer_model_1.default);
        const query = repository
            .createQueryBuilder()
            .update()
            .set({ closed: close })
            .where({
            id: (0, typeorm_1.In)(subjectsIds),
            periodOId: periodId,
        });
        return query.execute();
    }
    async getSubjectOfferTeachers(id) {
        const repository = (0, typeorm_1.getRepository)(subjectOffer_model_1.default);
        return repository.findOne(id, {
            relations: ["teachers"],
        });
    }
    async find({ query, user }) {
        const repository = (0, typeorm_1.getRepository)(subjectOffer_model_1.default);
        const queryBuilder = repository
            .createQueryBuilder("subjectOffer")
            .leftJoinAndSelect("subjectOffer.teachers", "teachers")
            .leftJoinAndSelect("subjectOffer.subject", "subject")
            .where("subjectOffer.closed = :value", { value: true });
        if (query.period) {
            queryBuilder.andWhere("subjectOffer.period = :periodId", {
                periodId: query.period,
            });
        }
        if (user.userRoles.includes(userRoles_1.UserRoles.TEACHER)) {
            queryBuilder.andWhere("teachers.id = :userId", { userId: user.id });
        }
        if (query.page) {
            queryBuilder.skip(query.page * paginationOptions_1.DEFAULT_PAGE_SIZE);
            queryBuilder.take(paginationOptions_1.DEFAULT_PAGE_SIZE);
        }
        else {
            queryBuilder.take(paginationOptions_1.MAX_TAKE_ITEMS);
        }
        return queryBuilder.getManyAndCount();
    }
    async findOneWithTeachingPlan(offerId, user) {
        const repository = (0, typeorm_1.getRepository)(subjectOffer_model_1.default);
        return repository.findOne(offerId, {
            where: {
                closed: 1,
                ...(user.userRoles.includes(userRoles_1.UserRoles.TEACHER)
                    ? {
                        teacherId: user.id,
                    }
                    : {}),
            },
            relations: [
                "teachingPlan",
                "subject",
                "subject.course",
                "subject.coRequisite",
                "subject.preRequisite",
            ],
        });
    }
}
exports.default = SubjectOfferRepository;
//# sourceMappingURL=subjectOffer.repository.js.map