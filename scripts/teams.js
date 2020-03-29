
module.exports = async function (robot) {
  const verbs = ['Dashing', 'Fighting', 'Jumping', 'Freewheeling', 'Falling', 'Surfing', 'Evolving', 'Ploughing', 'Farming', 'Lazy', 'Tough'];
  const nouns = ['Wombats', 'Cannibals', 'Dinosaurs', 'Magicians', 'Zombies', 'Aliens', 'Zombies', "Kangaroos", "Hedgehogs", "Critics", "Bananas"];
  const colours = ['BLUE', 'RED'];

  function randomTeam() {
    const verb = verbs[Math.floor(Math.random() * verbs.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return `The ${verb} ${noun}`;
  }

  function isTeamName(team) {
    const splits = team.split(' ');
    if (splits.length === 3) {
      if (splits[0] === "The" && verbs.indexOf(splits[1]) > -1 && nouns.indexOf(splits[2]) > -1) {
        return true;
      }
    }
    return false;
  }


  // This is apparently the Durstenfield Shuffle which sounds like a dance move from the 30s
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  robot.hear(/!teams clear/, async (res) => {
    const guild = robot.client.guilds.get(robot.adapter.rooms[res.message.room].guild.id);
    await Promise.all(guild.roles.map(async function (x) {
      if (x.deleted) { return }
      if (isTeamName(x.name)) {
        await Promise.all(x.members.map(async member => member.removeRole(x.id)));
      }
    }));
  });

  robot.hear(/!teams (.*)/, async (res) => {
    // Get the list of existing teams
    // console.log(res)
    // console.log(robot.client)

    // Check the captured group is a list of usernames
    const m = res.match[0];
    let names = m.split(/\s/)
    names.shift();
    console.log(names);
    for (i in names){
      name = names[i];
      if (!/^<@!?([0-9]*)>$/.test(name)) { return } else {

        let regex = /^<@!?([0-9]*)>$/g;
        let match = regex.exec(name);
        names[i] = match[1];
      }
    }

    const guild = robot.client.guilds.get(robot.adapter.rooms[res.message.room].guild.id);
    // Rename existing teams
    let foundTeams = 0;
    let teams = [];

    await Promise.all(guild.roles.map(async function (x) {
      if (x.deleted) { return }
      if (isTeamName(x.name)) {
        await x.setName(randomTeam());
        // TODO: Remove users from this team
        await Promise.all(x.members.map(async member => member.removeRole(x.id)));
        foundTeams += 1
        teams.push(x)
      }
    }));

    // If there aren't two teams already, make more until there are
    while (foundTeams < 2) {
      // Make new teams
      const r = await guild.createRole(
        {
          name: randomTeam(),
          color: colours[foundTeams],
        },
        '',
      );
      foundTeams += 1;
      teams.push(r)
    }

    // Randomly assign everyone mentioned to the two teams
    names = shuffleArray(names)
    console.log('shuffled', names)
    // Get names from msg
    for (i in names) {
      team = teams[i%2];
      member = guild.members.get(names[i]);
      console.log(member, team.id)
      member.addRole(team.id, "Grandmaster's whims");
    }

  });
};
