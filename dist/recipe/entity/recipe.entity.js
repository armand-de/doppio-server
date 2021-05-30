"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recipe = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entity/user.entity");
const recipe_bookmark_entity_1 = require("./recipe-bookmark.entity");
const recipe_preference_entity_1 = require("./recipe-preference.entity");
let Recipe = class Recipe {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Recipe.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ length: 20, nullable: false }),
    __metadata("design:type", String)
], Recipe.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ length: 200, nullable: true }),
    __metadata("design:type", String)
], Recipe.prototype, "image", void 0);
__decorate([
    typeorm_1.Column({ length: 30, nullable: true }),
    __metadata("design:type", String)
], Recipe.prototype, "description", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: false }),
    __metadata("design:type", String)
], Recipe.prototype, "contents", void 0);
__decorate([
    typeorm_1.Column('tinyint', { nullable: false }),
    __metadata("design:type", Number)
], Recipe.prototype, "category", void 0);
__decorate([
    typeorm_1.Column('int', { nullable: false }),
    __metadata("design:type", Number)
], Recipe.prototype, "time", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_entity_1.User, (user) => user.recipes),
    typeorm_1.JoinColumn({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], Recipe.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany((type) => recipe_bookmark_entity_1.RecipeBookmark, (recipe_bookmark) => recipe_bookmark.recipe),
    __metadata("design:type", Array)
], Recipe.prototype, "recipe_bookmarks", void 0);
__decorate([
    typeorm_1.OneToMany((type) => recipe_preference_entity_1.RecipePreference, (recipe_preference) => recipe_preference.recipe),
    __metadata("design:type", Array)
], Recipe.prototype, "recipe_preferences", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ name: 'created_at', nullable: false }),
    __metadata("design:type", Date)
], Recipe.prototype, "createdDate", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ name: 'updated_at', nullable: false }),
    __metadata("design:type", Date)
], Recipe.prototype, "updatedDate", void 0);
Recipe = __decorate([
    typeorm_1.Entity('recipes')
], Recipe);
exports.Recipe = Recipe;
//# sourceMappingURL=recipe.entity.js.map