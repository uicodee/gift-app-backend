import { InlineQueryResult } from '@telegraf/types';
import { Ctx, Start, Update, InlineQuery, On } from 'nestjs-telegraf';
import { Scenes, Telegraf } from 'telegraf';

type Context = Scenes.SceneContext;

@Update()
export class BotService extends Telegraf<Context> {
  @Start()
  async onStart(@Ctx() ctx: Context) {
    console.log('start');
    await ctx.reply('Welcome');
  }

  @On('photo')
  async onPhoto(@Ctx() ctx: Context) {
    // update.message.photo
    console.log(ctx.message);
    //     {
    //   update_id: 77813141,
    //   message: {
    //     message_id: 56,
    //     from: {
    //       id: 547187822,
    //       is_bot: false,
    //       first_name: 'Abduxalilov',
    //       username: 'uicode',
    //       language_code: 'ru',
    //       is_premium: true
    //     },
    //     chat: {
    //       id: 547187822,
    //       first_name: 'Abduxalilov',
    //       username: 'uicode',
    //       type: 'private'
    //     },
    //     date: 1731344829,
    //     photo: [ [Object], [Object] ]
    //   }
    // }
    await ctx.reply('hi');
  }

  @InlineQuery(/.*/)
  async onInlineQuery(@Ctx() ctx: Context) {
    const query = ctx.inlineQuery.query;
    console.log(query);
    const results: InlineQueryResult[] = [
      {
        type: 'article',
        id: '1dsfsdfsdfsdf',
        title: 'Send Gift',
        thumbnail_url:
          'https://s3.timeweb.com/2628aad9-67413717-083e-4baa-94e9-20cf6acb1ec4/avatar.png',
        description: `Send gift of ${query}`,
        input_message_content: {
          message_text: `You sent: ${query}`,
        },
      },
    ];
    return ctx.answerInlineQuery(results);
  }
}
