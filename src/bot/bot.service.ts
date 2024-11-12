import { InlineQueryResult } from '@telegraf/types';
import { Ctx, Start, Update, InlineQuery } from 'nestjs-telegraf';
import { Scenes, Telegraf } from 'telegraf';

type Context = Scenes.SceneContext;

@Update()
export class BotService extends Telegraf<Context> {
  @Start()
  async onStart(@Ctx() ctx: Context) {
    await ctx.replyWithPhoto(
      'AgACAgQAAxkDAANHZzOSAAEnHoSEs9IZXYkC6vrw_TqkAAKNtjEbtxSkUcVdiVMviSmSAQADAgADeQADNgQ',
      {
        caption: '🎁 Here you can buy and send gifts to your friends',
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Open App',
                web_app: { url: 'https://gift-app-miniapp.vercel.app' },
              },
            ],
          ],
        },
      },
    );
  }

  @InlineQuery(/.*/)
  async onInlineQuery(@Ctx() ctx: Context) {
    const query = ctx.inlineQuery.query;
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
