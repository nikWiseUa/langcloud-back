import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDoc } from 'src/schemas/user.schema';
import * as crypto from 'crypto';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDoc>) {}

  sha256(s: string): string {
    return crypto.createHash('sha256').update(s).digest('hex');
  }
  async signUp(body: SignUpDto): Promise<Omit<User, 'password'>> {
    if (await this.userModel.findOne({ username: body.username })) {
      throw new BadRequestException('fucing regestration');
    }
    const password = this.sha256(body.password);
    const user = await this.userModel.create({ ...body, password });
    const token = await this.login({ username: user.username });
    user.token = token;
    user.password = null;
    return user;
  }
  async signOut(user: User) {
    const a = await this.userModel.updateOne(
      { username: user.username },
      { token: '' },
    );
    console.log(a);
  }
  async login({ username }: { username: string }): Promise<string> {
    const token = this.sha256(username + Math.random());
    await this.userModel.updateOne({ username }, { token });
    return token;
  }
  async isValid(token: string): Promise<boolean> {
    const user = await this.userModel.findOne({ token });
    return !!user;
  }
  async auth(username: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ username });
    if (!user) return null;
    return (user.password === this.sha256(password) && user) || null;
  }
  async findByToken(token: string): Promise<User | null> {
    const user = await this.userModel.findOne({ token });
    return user;
  }
}
