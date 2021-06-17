import { STREAMING_ROLE_ID } from './constants';

const handleStreams = async presence => {
  // Alias a few things from deep in this tree
  const isStreaming = presence.activities.some(a => a.type === 'STREAMING');
  const streamActivity = presence.activities.find(a => a.type === 'STREAMING');
  const { guild, member } = presence;
  const hasStreamingRole = member.roles.cache.has(STREAMING_ROLE_ID);
  const role = guild.roles.cache.get(STREAMING_ROLE_ID);

  if (!isStreaming && hasStreamingRole) {
    member.roles.remove(role);
  }

  const gameIsRE = isStreaming && streamActivity.state === 'Resident Evil Village';

  if (isStreaming) {
    if (gameIsRE && !hasStreamingRole) {
      member.roles.add(role);
    }

    if (!gameIsRE && hasStreamingRole) {
      member.roles.remove(role);
    }
  }
};

export default handleStreams;
