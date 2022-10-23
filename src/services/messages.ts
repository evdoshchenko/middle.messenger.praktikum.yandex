import EventBus from 'core/EventBus';
import XHRFetch from 'helpers/XHRFetch';
import { MessageView, MessageViewDTO } from 'api/types';

class Socket extends EventBus {
  websocket?: WebSocket;

  connectToWebsocket(userId: number, chatID: number) {
    XHRFetch
      .post(`/chats/token/${chatID}`)
      .then((tokenRes: string | any) => {
        const { token } = tokenRes;
        const ws = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatID}/${token}`);
        this.websocket = ws;
        ws.addEventListener('open', () => {
          window.store.dispatch({ ws, messages: this.getMessages() });
        });

        ws.addEventListener('close', (e) => {
          if (e.wasClean) {
            console.log('Disconected');
          } else {
            console.log('Lost connection');
          }

          console.log(`Code: ${e.code}, Reason: ${e.reason}`);
        });

        ws.addEventListener('message', (e) => {
          const data = JSON.parse(e.data);
          console.info('Data received', { data });

          if (Array.isArray(data)) {
            const filteredMessages = data.filter((message: any) => message.content) || [];
            const messages = filteredMessages
              .map((dto: MessageViewDTO) => new MessageView(dto))
              .sort((a, b) => b.id - a.id);

            window.store.dispatch({
              messages,
            });

            return;
          }

          if (
            data.type === 'user connected'
            || data.type === 'pong'
            || !data.content
          ) {
            return;
          }

          if (data.type === 'message' && data.content) {
            window.store.dispatch({
              messages: [...window.store.getState().messages, new MessageView(data)],
            });
          }
        });
      });
  }

  getMessages() {
    return this.websocket?.send(JSON.stringify({
      content: '0',
      type: 'get old',
    }));
  }

  sendMessage(message: string) {
    window.store.getState().ws!.send(JSON.stringify({
      content: message,
      type: 'message',
    }));
    this.getMessages();
  }
}

export default new Socket();
