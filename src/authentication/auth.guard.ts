import {
    Injectable,
    ExecutionContext,
    UnauthorizedException,
    ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { IS_PUBLIC_KEY } from './public.decorator';
import { ROLES_KEY } from './roles.decorator';
import { Role } from './role.enum';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext): boolean {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }

        return super.canActivate(context) as boolean;
    }

    handleRequest(err, user, info, context: ExecutionContext) {
        if (err || !user) {
            throw err || new UnauthorizedException();
        }

        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        // console.log("my Roles: ", user, requiredRoles);

        if (requiredRoles.includes(user.role)) {
            return user;
        } else {
            throw new ForbiddenException('You do not have the necessary role');
        }
    }
}

// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
//     constructor(private reflector: Reflector) {
//         super();
//     }

//     async canActivate(context: ExecutionContext): Promise<boolean> {
//         // First, verify the JWT
//         const canActivate = await super.canActivate(context);
//         if (!canActivate) {
//             return false;
//         }

//         // Retrieve roles from route handler metadata
//         const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
//             context.getHandler(),
//             context.getClass(),
//         ]);

//         if (!requiredRoles || requiredRoles.length === 0) {
//             // If no specific roles are required, allow access
//             return true;
//         }

//         const request = context.switchToHttp().getRequest();
//         const user = request.user;

//         // Check if the user has one of the required roles
//         if (requiredRoles.includes(user.role)) {
//             return true;
//         }

//         throw new ForbiddenException(`You do not have the required role(s): ${requiredRoles.join(', ')}`);
//     }

//     handleRequest(err, user) {
//         if (err || !user) {
//             throw err || new UnauthorizedException();
//         }
//         return user;
//     }
// }
