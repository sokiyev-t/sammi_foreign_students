import { Controller, Delete, Get, Param, Req, Res, UseGuards } from "@nestjs/common";//UseGuards
import { UserService } from "./user.service";
import { Request, Response } from 'express'
import { JwtAuthGuard } from "src/authentication/auth.guard";


@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getAllUsers(@Req() request: Request, @Res() response: Response): Promise<any> {
        try {
            const result = await this.userService.getAllUser();
            return response.status(200).json({
                status: 'Ok!',
                message: 'Successfully fetch data!',
                result: result
            })
        } catch (err) {
            console.log(err);
            return response.status(500).json({
                status: 'Ok!',
                message: 'Internal Server Error!'
            })
        }
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.deleteUser(id);
    }
}