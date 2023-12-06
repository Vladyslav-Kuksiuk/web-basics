const secret =  require("./secret/secret.json");
const TelegramApi = require("node-telegram-bot-api")
const OpenAI =  require('openai');

const openai = new OpenAI({ apiKey: secret.chatGptToken });

const bot = new TelegramApi(secret.telegramToken, {polling:true})

bot.on('message', msg => {
    const author = msg.from.username;
    const content = msg.text;
    console.log(`Message received from '${author}'. Content: '${content}'`)
    if(author == 'Hellamb' || author == 'asor1k'){
        gptRequest(content).then(response => bot.sendMessage(msg.chat.id, response))
    }else{
        bot.sendMessage(msg.chat.id, "You are not my master!")
    }
})

const gptRequest = async (text) => {
    const stream = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: text }],
      stream: true
    })
    let answer = ''
    for await (const chunk of stream) {
      answer += chunk.choices[0]?.delta?.content || ''
    }
  
    return new Promise(res => res(answer))
  }