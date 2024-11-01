import { Controller, Post, Body, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login-user.dto";
import { Request, Response } from 'express'
import { RegisterUsersDto } from "./dto/register-user.dto";
import { JwtAuthGuard } from "./auth.guard";
import { Roles } from "./roles.decorator";
import { Role } from "./role.enum";
import { Public } from "./public.decorator";


@Controller('/auth')
@UseGuards(JwtAuthGuard)
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('/login')
    @Public()
    async login(@Req() request: Request, @Res() response: Response, @Body() loginDto: LoginDto): Promise<any> {
        try {
            const result = await this.authService.login(loginDto);
            return response.status(200).json({
                status: 'Ok!',
                message: 'Successfully login!',
                result: result
            })

        } catch (err) { //err
            console.log(err);
            return response.status(500).json({
                status: 'Error!',
                message: 'Internal Server Error!',
            })
        }
    }


    @Post('/add-admin')
    @Public()
    async addAdmin(@Req() request: Request, @Res() response: Response, @Body() registerDto: RegisterUsersDto): Promise<any> {
        try {
            const result = await this.authService.addAdmin(registerDto);
            return response.status(200).json({
                status: 'Ok!',
                message: 'Successfully register user!',
                result: result,
            });
        } catch (err) {
            console.log(err)
            return response.status(500).json({
                status: 'Error!',
                message: 'Internal Server Error!',
            });
        }
    }

    @Post('/register')
    @Roles(Role.ADMIN)
    async register(@Req() request: Request, @Res() response: Response, @Body() registerDto: RegisterUsersDto): Promise<any> {
        try {
            const result = await this.authService.register(registerDto);
            return response.status(200).json({
                status: 'Ok!',
                message: 'Successfully register user!',
                result: result,
            });
        } catch (err) {
            console.log(err)
            return response.status(500).json({
                status: 'Error!',
                message: 'Internal Server Error!',
            });
        }
    }

}