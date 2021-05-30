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
exports.RecipePreference = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entity/user.entity");
const recipe_entity_1 = require("./recipe.entity");
let RecipePreference = class RecipePreference {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], RecipePreference.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => recipe_entity_1.Recipe, (recipe) => recipe.recipe_preferences),
    typeorm_1.JoinColumn({ name: 'recipeId' }),
    __metadata("design:type", recipe_entity_1.Recipe)
], RecipePreference.prototype, "recipe", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_entity_1.User, (user) => user.recipe_preferences),
    typeorm_1.JoinColumn({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], RecipePreference.prototype, "user", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ name: 'created_at', nullable: false }),
    __metadata("design:type", Date)
], RecipePreference.prototype, "createdDate", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ name: 'updated_at', nullable: false }),
    __metadata("design:type", Date)
], RecipePreference.prototype, "updatedDate", void 0);
RecipePreference = __decorate([
    typeorm_1.Entity('recipe_preferences')
], RecipePreference);
exports.RecipePreference = RecipePreference;
//# sourceMappingURL=recipe-preference.entity.js.map