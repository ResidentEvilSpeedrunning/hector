import axios from 'axios';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const HEADERS = { 'Client-ID': process.env.TWITCH_CLIENT_ID };

class TwitchAPI {
  static async getToken() {
    return axios.post(
      'https://id.twitch.tv/oauth2/token',
      {},
      {
        params: {
          client_id: process.env.TWITCH_CLIENT_ID,
          client_secret: process.env.TWITCH_CLIENT_SECRET,
          grant_type: 'client_credentials',
        },
        headers: HEADERS,
      },
    );
  }

  static async getStreams() {
    try {
      const response = await this.getToken();
      const authToken = response.data.access_token;

      const gameResponse = await axios.get(
        'https://api.twitch.tv/helix/games?name=Resident%20Evil%20Village',
        { headers: { ...HEADERS, Authorization: `Bearer ${authToken}` } },
      );

      const gameId = gameResponse.data.data[0].id;

      return axios.get('https://api.twitch.tv/helix/streams', {
        params: {
          game_id: gameId,
        },
        headers: { ...HEADERS, Authorization: `Bearer ${authToken}` },
      });
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}

export default TwitchAPI;
