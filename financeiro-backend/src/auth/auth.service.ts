import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly UserService: UserService, private readonly jwtService: JwtService) {}

  async login(user): Promise<UserToken> {
    //Transforma o user num JWT
    const payload:UserPayload = {
      sub: user.id,
      email: user.email,
    };

    const jwtToken = this.jwtService.sign(payload);

    return { 
      user:user,
      access_token: jwtToken
    }
  }

  async register(user:CreateUserDto) {
    const response = await this.UserService.create(user).then(res => res).catch(err => console.log(err))

    return response;
  }

  async validateUser(email: string, password: string) {
    const user = await this.UserService.findByEmail(email);

    if (user) {
      
      const isSenhaValid = await bcrypt.compare(password, user.password);
      if (isSenhaValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    throw new Error('Email address or password provided is incorret');
  }
}
