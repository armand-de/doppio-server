"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConfigModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user/entity/user.entity");
const post_entity_1 = require("./post/entity/post.entity");
const comment_entity_1 = require("./post/entity/comment.entity");
const recipe_entity_1 = require("./recipe/entity/recipe.entity");
const recipe_preference_entity_1 = require("./recipe/entity/recipe-preference.entity");
const recipe_bookmark_entity_1 = require("./recipe/entity/recipe-bookmark.entity");
const post_evaluation_entity_1 = require("./post/entity/post-evaluation.entity");
let DatabaseConfigModule = class DatabaseConfigModule {
};
DatabaseConfigModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: async (config) => ({
                    port: parseInt(config.get('DB_PORT')),
                    database: config.get('DB_NAME'),
                    username: config.get('DB_USERNAME'),
                    password: config.get('DB_PASSWORD'),
                    host: config.get('DB_HOST'),
                    autoLoadEntities: true,
                    entities: [
                        user_entity_1.User,
                        post_entity_1.Post,
                        comment_entity_1.Comment,
                        recipe_entity_1.Recipe,
                        recipe_preference_entity_1.RecipePreference,
                        recipe_bookmark_entity_1.RecipeBookmark,
                        post_evaluation_entity_1.PostEvaluation,
                    ],
                    synchronize: true,
                    type: 'mysql',
                    charset: 'utf8_general_ci',
                }),
                inject: [config_1.ConfigService],
            }),
        ],
    })
], DatabaseConfigModule);
exports.DatabaseConfigModule = DatabaseConfigModule;
//# sourceMappingURL=database-config.module.js.map