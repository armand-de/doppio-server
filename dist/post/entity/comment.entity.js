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
exports.Comment = void 0;
const typeorm_1 = require("typeorm");
const post_entity_1 = require("../../post/entity/post.entity");
const user_entity_1 = require("../../user/entity/user.entity");
let Comment = class Comment {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Comment.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ length: 200, nullable: false }),
    __metadata("design:type", String)
], Comment.prototype, "contents", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_entity_1.User, (user) => user.comments),
    typeorm_1.JoinColumn({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], Comment.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => post_entity_1.Post, (post) => post.comments),
    typeorm_1.JoinColumn({ name: 'postId' }),
    __metadata("design:type", post_entity_1.Post)
], Comment.prototype, "post", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ name: 'created_at', nullable: false }),
    __metadata("design:type", Date)
], Comment.prototype, "createdDate", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ name: 'updated_at', nullable: false }),
    __metadata("design:type", Date)
], Comment.prototype, "updatedDate", void 0);
Comment = __decorate([
    typeorm_1.Entity('comments')
], Comment);
exports.Comment = Comment;
//# sourceMappingURL=comment.entity.js.map