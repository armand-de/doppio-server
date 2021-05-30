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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const recipe_entity_1 = require("../../recipe/entity/recipe.entity");
const post_entity_1 = require("../../post/entity/post.entity");
const recipe_bookmark_entity_1 = require("../../recipe/entity/recipe-bookmark.entity");
const recipe_preference_entity_1 = require("../../recipe/entity/recipe-preference.entity");
const post_evaluation_entity_1 = require("../../post/entity/post-evaluation.entity");
const comment_entity_1 = require("../../post/entity/comment.entity");
let User = class User {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ length: 8, unique: true, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "nickname", void 0);
__decorate([
    typeorm_1.Column({ length: 150, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ length: 15, nullable: false, unique: true }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column({
        length: 200,
        nullable: true,
        default: 'https://cdn.pixabay.com/photo/2014/11/27/12/24/coffee-547490_960_720.png',
    }),
    __metadata("design:type", String)
], User.prototype, "image", void 0);
__decorate([
    typeorm_1.OneToMany((type) => recipe_entity_1.Recipe, (recipe) => recipe.user),
    __metadata("design:type", Array)
], User.prototype, "recipes", void 0);
__decorate([
    typeorm_1.OneToMany((type) => recipe_bookmark_entity_1.RecipeBookmark, (recipe_bookmark) => recipe_bookmark.user),
    __metadata("design:type", Array)
], User.prototype, "recipe_bookmarks", void 0);
__decorate([
    typeorm_1.OneToMany((type) => recipe_preference_entity_1.RecipePreference, (recipe_preference) => recipe_preference.user),
    __metadata("design:type", Array)
], User.prototype, "recipe_preferences", void 0);
__decorate([
    typeorm_1.OneToMany((type) => post_entity_1.Post, (post) => post.user),
    __metadata("design:type", Array)
], User.prototype, "posts", void 0);
__decorate([
    typeorm_1.OneToMany((type) => post_evaluation_entity_1.PostEvaluation, (post_evaluation) => post_evaluation.user),
    __metadata("design:type", Array)
], User.prototype, "post_evaluations", void 0);
__decorate([
    typeorm_1.OneToMany((type) => comment_entity_1.Comment, (comment) => comment.user),
    __metadata("design:type", Array)
], User.prototype, "comments", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ name: 'created_at', nullable: false }),
    __metadata("design:type", Date)
], User.prototype, "createdDate", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ name: 'updated_at', nullable: false }),
    __metadata("design:type", Date)
], User.prototype, "updatedDate", void 0);
User = __decorate([
    typeorm_1.Entity('users')
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map