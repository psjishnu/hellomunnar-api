import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Users from '../entities/users.entity';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GoogleService {
  private logger = new Logger('Google Service');
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {}

  async googleLogin(req): Promise<any> {
    try {
      if (!req.user) {
        return {
          message: 'No User from google',
          status: 403,
        };
      }
      const user = await this.userRepository.findOne({
        email: req.user.email,
      });

      if (user) {
        const { email, id } = user;
        const payload = { email, id };
        delete user.password;
        delete user.token;
        return {
          success: true,
          status: 200,
          access_token: await this.jwtService.sign(payload),
          user: user,
        };
      } else {
        if (req.user) {
          const googleDto: any = {};
          googleDto.name = `${req.user.firstName + req.user.lastName}`;
          googleDto.userName = req.user.displayName;
          googleDto.email = req.user.email;
          googleDto.googleId = req.user.userId;
          googleDto.googleImageUrl = req.user.picture;
          googleDto.uuid = uuidv4();
          googleDto.status = 'ACTIVE';
          googleDto.type = 'USER';
          const saveUser = await this.userRepository.save(googleDto);
          const { ...savedUser } = saveUser;

          const { email, id } = saveUser;
          const payload = { email, id };
          delete savedUser.password;
          delete savedUser.token;

          return {
            success: true,
            status: 200,
            access_token: this.jwtService.sign(payload),
            user: savedUser,
          };
        }
      }
    } catch (err) {
      this.logger.error(err);
      return {
        success: false,
        message: 'Something went wrong..! Registration failed.',
      };
    }
  }
}
