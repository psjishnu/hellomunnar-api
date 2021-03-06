import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Logger, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GoogleService } from '../services';

@ApiTags('Google Auth')
@Controller('google')
export class GoogleController {
  private logger = new Logger('Google Auth');
  constructor(private readonly googleService: GoogleService) {}
  @Get()
  @UseGuards(AuthGuard('google'))
  /*eslint-disable */
  async googleAuth(@Request() req) {}
  /*eslint-enable */

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Request() req) {
    this.logger.verbose(`User Logged in ${req.user.email} `);
    return this.googleService.googleLogin(req);
  }
}
