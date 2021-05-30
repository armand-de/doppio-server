"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const database_config_module_1 = require("./database-config.module");
const config_1 = require("@nestjs/config");
const recipe_module_1 = require("./recipe/recipe.module");
const post_module_1 = require("./post/post.module");
const core_1 = require("@nestjs/core");
const nest_morgan_1 = require("nest-morgan");
const firebase_module_1 = require("./firebase/firebase.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            nest_morgan_1.MorganModule,
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            database_config_module_1.DatabaseConfigModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: [
                    `env/${process.env.NODE_ENV === 'production'
                        ? 'prod'
                        : process.env.NODE_ENV === 'test'
                            ? 'test'
                            : 'dev'}.env`,
                ],
                ignoreEnvFile: process.env.NODE_ENV === 'production',
            }),
            recipe_module_1.RecipeModule,
            post_module_1.PostModule,
            firebase_module_1.FirebaseModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: nest_morgan_1.MorganInterceptor('dev'),
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map