from telegram import Update, WebAppInfo, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import ApplicationBuilder, ContextTypes, CommandHandler

TOKEN = "8287119446:AAG-Dv-KsaYdDCIUG5wEhIJ-VPd6mL9Fr_Y"
# لينكئ ته يئ نوو يئ جودا
WEB_APP_URL = "https://mustafaduski.github.io/aviatrix-ton/"

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    keyboard = [[InlineKeyboardButton("🎮 Play Aviatrix Pro", web_app=WebAppInfo(url=WEB_APP_URL))]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text(
        "🚀 *Welcome to Aviatrix Pro*\n\nConnect your wallet and start earning TON.",
        reply_markup=reply_markup,
        parse_mode='Markdown'
    )

if name == '__main__':
    app = ApplicationBuilder().token(TOKEN).build()
    app.add_handler(CommandHandler('start', start))
    app.run_polling()
