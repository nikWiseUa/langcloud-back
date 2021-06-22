import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInfo, UserInfoDoc } from 'src/schemas/user-info.schema';
import { User, UserDoc } from 'src/schemas/user.schema';
import { UserInfoDto } from './dto/user-info.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(UserInfo.name) private userInfoModel: Model<UserInfoDoc>,
    @InjectModel(User.name) private userModel: Model<UserDoc>,
  ) {}

  async findByToken(token: string): Promise<UserInfo> {
    const user = await this.userModel.findOne({ token });

    let userInfo = await this.userInfoModel.findOne({ name: user.username });
    if (!userInfo) {
      console.log('create');
      userInfo = await this.userInfoModel.create({
        name: user.username,
        about: '',
      });
    }
    return userInfo;
  }

  // need validate
  async updateUserInfo(token: string, body: UserInfoDto): Promise<boolean> {
    const userInfo = await this.findByToken(token);
    if (userInfo) {
      await this.userInfoModel.updateOne({ name: userInfo.name }, body);
      return true;
    }
    return false;
  }

  async fetchInfo(token: string): Promise<UserInfo> {
    return await this.findByToken(token);
  }

  async addrReadText(token, text) {
    const profile = await this.findByToken(token);
    const date = new Date();
    const stamp = `T.${date.getDate()}.${date.getMonth()}.${date.getUTCFullYear()}`;

    if (!profile.statistic) {
      profile.statistic = {};
    }
    if (!profile.learned?.texts) {
      console.log(profile.learned);
      if (profile.learned) {
        profile.learned.texts = [];
      } else {
        profile.learned = {
          texts: [],
        };
      }
    }

    if (!profile.learned.texts) {
      profile.learned.texts = [];
    }
    if (!profile.learned.texts.includes(text.id)) {
      profile.learned.texts.push(text.id);

      const dayStats = profile.statistic[stamp];

      if (dayStats) {
        profile.statistic[stamp].textsRead = dayStats
          ? dayStats.textsRead
            ? ++dayStats.textsRead
            : 1
          : 1;
      } else {
        profile.statistic[stamp] = {
          textsRead: dayStats
            ? dayStats.textsRead
              ? ++dayStats.textsRead
              : 1
            : 1,
        };
      }
      profile.statistic.textsRead = profile.statistic.textsRead
        ? ++profile.statistic.textsRead
        : 1;
    }

    await this.userInfoModel.updateOne(
      { name: profile.name },
      { statistic: profile.statistic, learned: profile.learned },
    );
  }

  async addLearnedWord(token, word) {
    const profile = await this.findByToken(token);
    const date = new Date();
    const stamp = `T.${date.getDate()}.${date.getMonth()}.${date.getUTCFullYear()}`;
    if (!profile.statistic) {
      profile.statistic = {
        [stamp]: {
          wordsLearned: 0,
        },
      };
    }
    if (!profile.learned?.words) {
      if (profile.learned) {
        profile.learned.words = {};
      } else {
        profile.learned = {
          words: {},
        };
      }
    }
    console.log(profile.statistic);

    const dayStats = profile.statistic[stamp];
    if (dayStats) {
      profile.statistic[stamp].wordsLearned = dayStats
        ? dayStats.wordsLearned
          ? ++dayStats.wordsLearned
          : 1
        : 1;
    } else {
      profile.statistic[stamp] = {
        wordsLearned: dayStats
          ? dayStats.wordsLearned
            ? ++dayStats.wordsLearned
            : 1
          : 1,
      };
    }
    profile.statistic.wordsLearned = profile.statistic.wordsLearned
      ? ++profile.statistic.wordsLearned
      : 1;
    console.log(word);

    if (!profile.learned.words[word.catrgoryId]) {
      profile.learned.words[word.catrgoryId] = [];
    }
    if (!profile.learned.words[word.catrgoryId].includes(word.id)) {
      profile.learned.words[word.catrgoryId].push(word.id);
    }
    console.log(profile.learned.words[word.catrgoryId]);

    // profile.save();
    console.log(profile.statistic);
    // profile.overwrite;
    await this.userInfoModel.updateOne(
      { name: profile.name },
      { statistic: profile.statistic, learned: profile.learned },
    );
  }

  async getUserStatistic(token) {
    const profile = await this.findByToken(token);

    const dayInMs = 86400000;
    // const date = new Date();
    if (!profile.statistic) {
      return {
        name: profile.name,
        isHavingStats: false,
        weekData: { wordsInWeek: [0, 0, 0, 0, 0, 0, 0] },
      };
    }
    const dataArr = [
      new Date(Date.now() - dayInMs * 6),
      new Date(Date.now() - dayInMs * 5),
      new Date(Date.now() - dayInMs * 4),
      new Date(Date.now() - dayInMs * 3),
      new Date(Date.now() - dayInMs * 2),
      new Date(Date.now() - dayInMs),
      new Date(),
    ];
    const wordsInWeek = dataArr.map((date) => {
      const stamp = `T.${date.getDate()}.${date.getMonth()}.${date.getUTCFullYear()}`;
      const wordsInCurrDay = profile.statistic[stamp]
        ? profile.statistic[stamp].wordsLearned
        : 0;
      return wordsInCurrDay;
    });
    const stat = {
      name: profile.name,
      isHavingStats: true,
      statistic: profile.statistic,
      leaarned: profile.learned,
      weekData: { wordsInWeek },
    };
    return stat;
  }
}
