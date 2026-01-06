import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
  constructor(
    private readonly UserService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user): Promise<UserToken> {
    //Transforma o user num JWT
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
    };

    const jwtToken = this.jwtService.sign(payload);

    return {
      user: user,
      access_token: jwtToken,
    };
  }

  async register(user: CreateUserDto) {
    const response = await this.UserService.create(user)
      .then((res) => res)
      .catch((err) => console.log(err));

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: 'maeve.hyatt@ethereal.email',
        pass: 'E6KWuuq1yJHc5HRj7y',
      },
    });

    (async () => {
      const info = await transporter.sendMail({
        from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
        to: user.email,
        subject: 'Hello ✔',
        text: 'Bem vindo ao futuro do controle financeiro', // Plain-text version of the message
        html: `Olá <b>${user.name}</b>, bem vindo ao financeiro.`, // HTML version of the message
      });

      console.log('Message sent:', info.messageId);
    })();

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
