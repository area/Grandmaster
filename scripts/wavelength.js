const Jimp = require('jimp');
const util = require('util');


module.exports = async function (robot) {
  const PI = 3.14159;
  const games = {};

  const scales = [
    ['Bad', 'Good'],
    ['Mildly addictive', 'Highly addictive'],
    ['Hot', 'Cold'],
    ['Normal', 'Weird'],
    ['Colorless', 'Colorful'],
    ['Low calorie', 'High calorie'],
    ['Feels bad', 'Feels good'],
    ['Inessential', 'Essential'],
    ['Cheap', 'Expensive'],
    ['Underrated weapon', 'Overrated weapon'],
    ['Rare', 'Common'],
    ['Unsexy emoji', 'Sexy emoji'],
    ['Easy subject', 'Hard subject'],
    ['Unknown', 'Famous'],
    ['Difficult to use', 'Easy to use'],
    ['Tired', 'Wired'],
    ['Dirty', 'Clean'],
    ['Requires luck', 'Requires skill'],
    ['Flavorless', 'Flavorful'],
    ['Boring topic', 'Fascinating topic'],
    ['Bad actor', 'Good actor'],
    ['Basic', 'Hipster'],
    ['Dangerous job', 'Safe job'],
    ['Fantasy', 'Sci-Fi'],
    ['Casual', 'Formal'],
    ['Underpaid', 'Overpaid'],
    ['Dry', 'Wet'],
    ['Underrated skill', 'Overrated skill'],
    ['Forbidden', 'Encouraged'],
    ['Sad song', 'Happy song'],
    ['Fragile', 'Durable'],
    ['Geek', 'Dork'],
    ['Good', 'Evil'],
    ['Worst day of the year', 'Best day of the year'],
    ['Bad habit', 'Good habit'],
    ['Cat person', 'Dog person'],
    ['Guilty pleasure', 'Openly love'],
    ['Untalented', 'Talented'],
    ['Dark', 'Light'],
    ['Underrated actor', 'Overrated actor'],
    ['Hard to find', 'Easy to find'],
    ['Ugly man', 'Beautiful man'],
    ['Hard to remember', 'Easy to remember'],
    ['Lowbrow', 'Highbrow'],
    ['Unhealthy', 'Healthy'],
    ['Bad man', 'Good man'],
    ['Historically important', 'Historically irrelevant'],
    ['Hairless', 'Hairy'],
    ['Inflexible', 'Flexible'],
    ['Normal pet', 'Exotic pet'],
    ['Introvert', 'Extrovert'],
    ['Book was better', 'Movie was better'],
    ['Bad movie', 'Good movie'],
    ['Ugly', 'Beautiful'],
    ['Happens slowly', 'Happens suddenly'],
    ['Job', 'Career'],
    ['Loved', 'Hated'],
    ['The Light Side of the Force', 'The Dark Side of the Force'],
    ['Bad pizza topping', 'Good pizza topping'],
    ['Dystopia', 'Utopia'],
    ['Mature person', 'Immature person'],
    ['Underrated thing to own', 'Overrated thing to own'],
    ['Mean person', 'Nice person'],
    ['Action movie', 'Adventure movie'],
    ['Mental activity', 'Physical activity'],
    ['Uncontroversial topic', 'Controversial topic'],
    ['Need', 'Want'],
    ['Dry food', 'Wet food'],
    ['Normal thing to own', 'Weird thing to own'],
    ['Straight', 'Curvy'],
    ['Bad person', 'Good person'],
    ['80s', '90s'],
    ['Ethical to eat', 'Unethical to eat'],
    ['Movie', 'Film'],
    ['Optional', 'Mandatory'],
    ['Underrated letter of the alphabet', 'Overrated letter of the alphabet'],
    ['Ordinary', 'Extraordinary'],
    ['Hard to pronounce', 'Easy to pronounce'],
    ['Low quality', 'High quality'],
    ['Unsexy animal', 'Sexy animal'],
    ['Plain', 'Fancy'],
    ['Has a bad reputation', 'Has a good reputation'],
    ['Poorly made', 'Well made'],
    ['Not a sandwich', 'A sandwich'],
    ['Quiet place', 'Loud place'],
    ['Comedy', 'Drama'],
    ['Dangerous', 'Safe'],
    ['Culturally significant', 'Culturally insignificant'],
    ['Replaceable', 'Irreplaceable'],
    ['Worst athlete of all time', 'Greatest athlete of all time'],
    ['Role model', 'Bad influence'],
    ['Useless major', 'Useful major'],
    ['Peaceful', 'Warlike'],
    ['Underrated movie', 'Overrated movie'],
    ['Rough', 'Smooth'],
    ['Bad for you', 'Good for you'],
    ['Round', 'Pointy'],
    ['Proof that God exists', 'Proof that God doesn’t exist'],
    ['Sad movie', 'Happy movie'],
    ['Waste of time', 'Good use of time'],
    ['Scary animal', 'Nice animal'],
    ['Mainstream', 'Niche'],
    ['Short lived', 'Long lived'],
    ['Nobody does it', 'Everybody does it'],
    ['Smells bad', 'Smells good'],
    ['Star Wars', 'Star Trek'],
    ['Snack', 'Meal'],
    ['Least evil company', 'Most evil company'],
    ['Soft', 'Hard'],
    ['Sustenance', 'Haute cuisine'],
    ['Square', 'Round'],
    ['Better hot', 'Better cold'],
    ['Stupid', 'Brilliant'],
    ['Artisanal', 'Mass produced'],
    ['Bad superpower', 'Good superpower'],
    ['Ineffective', 'Effective'],
    ['Unbelievable', 'Believable'],
    ['Trashy', 'Classy'],
    ['Temporary', 'Permanent'],
    ['Looks like a person', "Doesn't look like a person"],
    ['Tastes bad', 'Tastes good'],
    ['Sport', 'Game'],
    ['Uncool', 'Cool'],
    ['Worst living person', 'Greatest living person'],
    ['Underrated', 'Overrated'],
    ['Messy food', 'Clean food'],
    ['Unethical', 'Ethical'],
    ['Bad gift', 'Good gift'],
    ['Unfashionable', 'Fashionable'],
    ['Freedom fighter', 'Terrorist'],
    ['Unforgiveable', 'Forgiveable'],
    ['Failure', 'Masterpiece'],
    ['Harmless', 'Harmful'],
    ['Gryffindor', 'Slytherin'],
    ['Unhygienic', 'Hygienic'],
    ['Bad music', 'Good music'],
    ['Useless', 'Useful'],
    ['Movie that Godzilla would ruin', 'Movie that Godzilla would improve'],
    ['Unimportant', 'Important'],
    ['Easy to spell', 'Hard to spell'],
    ['Vice', 'Virtue'],
    ['Underrated musician', 'Overrated musician'],
    ['Unpopular activity', 'Popular activity'],
    ['Divided', 'Whole'],
    ['Unreliable', 'Reliable'],
    ['Easy to kill', 'Hard to kill'],
    ['Unstable', 'Stable'],
    ['Round animal', 'Pointy animal'],
    ['Bad TV show', 'Good TV show'],
    ['Traditionally masculine', 'Traditionally feminine'],
    ['Useless body part', 'Useful body part'],
    ['Fad', 'Classic'],
    ['Weak', 'Strong'],
    ['Disgusting cereal', 'Delicious cereal'],
    ['Useless invention', 'Useful invention'],
    ['Liberal', 'Conservative'],
    ['Unpopular', 'Popular'],
    ['Friend', 'Enemy'],
    ['Boring', 'Exciting'],
    ['Smelly in a bad way', 'Smelly in a good way'],
    ['Villain', 'Hero'],
    ['Underrated thing to do', 'Overrated thing to do'],
    ['Useless in an emergency', 'Useful in an emergency'],
    ['For kids', 'For adults'],
    ['Wise', 'Intelligent'],
    ['Easy to do', 'Hard to do'],
    ['Worthless', 'Priceless'],
    ['Nature', 'Nurture'],
    ['Dictatorship', 'Democracy'],
    ['Normal greeting', 'Weird greeting'],
    ['Dog name', 'Cat name'],
    ['Non-partisan', 'Partisan'],
    ['Limited', 'Infinite'],
    ['Casual event', 'Formal event'],
    ['Bad investment', 'Good investment'],
    ['Small talk', 'Heavy topic'],
    ['Mild', 'Spicy'],
    ['Religious', 'Sacrilegious'],
    ['Not art', 'Art'],
    ['Illegal', 'Prohibited'],
    ['Popular', 'Elitist'],
    ['Out of control', 'In control'],
    ['Quiet', 'Loud'],
    ['Unsexy Pokémon', 'Sexy Pokémon'],
    ['Secret', 'Public knowledge'],
    ['Too small', 'Too big'],
    ['Short', 'Long'],
    ['Worst year in history', 'Best year in history'],
    ['Socialist', 'Capitalist'],
    ['Little known fact', 'Well known fact'],
    ['Stationary', 'Mobile'],
    ['Local issue', 'Global issue'],
    ['Talent', 'Skill'],
    ['Worst era to time travel', 'Best era to time travel'],
    ['The worst', 'The best'],
    ['Small number', 'Large number'],
    ['TRUE', 'FALSE'],
    ['Old fashioned', 'Avant garde'],
    ['Ugly word', 'Beautiful word'],
    ['Small', 'Tiny'],
    ['Unnatural', 'Natural'],
    ['Genuine person', 'Phony person'],
    ['Derivative', 'Original'],
    ['Etiquette', 'Manners'],
    ['Unsexy color', 'Sexy color'],
    ['Benefits you', 'Benefits everyone'],
    ['Powerless', 'Powerful'],
    ['Doesn’t vape', 'Vapes'],
    ['Fruit', 'Vegetable'],
    ['Science', 'Pseudoscience'],
    ['Funny topic', 'Serious topic'],
    ['Limp', 'Firm'],
    ['Guilty pleasure', 'Actually just bad'],
    ['Gossip', 'News'],
    ['Hard to sit on', 'Easy to sit on'],
    ['Not enough', 'Too much'],
    ['Horizontal', 'Vertical'],
    ['Unscented', 'Scented'],
    ['Huggable', 'Not huggable'],
    ['Heterogeneous', 'Homogenous'],
    ['Inclusive', 'Exclusive'],
    ['Bad dog breed', 'Good dog breed'],
    ['Art', 'Commerce'],
    ['One hit wonder', 'Pop icon'],
    ['Bad advice', 'Good advice'],
    ['Tick', 'Tock'],
    ['Bad candy', 'Good candy'],
    ['Traditional', 'Radical'],
    ['Bad mouthfeel', 'Good mouthfeel'],
    ['Illegal', 'Legal'],
    ['Deep thought', 'Shallow thought'],
    ['Bad school', 'Good school'],
    ['Never on time', 'Always on time'],
    ["Won't live to 100", 'Will live to 100'],
    ['Bad Disney character', 'Good Disney character'],
    ['Similar', 'Identical'],
    ['Bad president', 'Good president'],
    ['Weird', 'Strange'],
    ['Famous', 'Infamous'],
    ['Least powerful god', 'Most powerful god'],
    ['Boring person', 'Fun person'],
    ['Underrated book', 'Overrated book'],
    ['Conventional wisdom', 'Fringe belief'],
    ['Worst chore', 'Best chore'],
    ['Endangered species', 'Overpopulated species'],
    ['Blue', 'Green'],
    ['Thrilling', 'Terrifying'],
    ['Nerd', 'Jock'],
    ['Expected', 'Unexpected'],
    ['Person you could beat up', 'Person who’d beat you up'],
    ['Unreasonable phobia', 'Reasonable phobia'],
    ['Underrated game', 'Overrated game'],
  ];

  async function makeBoard(_gaugeAngle, _armAngle, _scale) {
    // Load the base image
    const base = await Jimp.read('./assets/wavelength/background.jpg');
    // TODO: Remove these magic numbers (they're the dimensions of the gauge)
    const c = 297 / 2;
    const R = 468;
    if (_gaugeAngle) {
      // Have the angle in radians to hand
      const gaugeAngleRad = (_gaugeAngle * PI) / 180;

      // Paste the gauge over that angle
      const gauge = await Jimp.read('./assets/wavelength/dial2larger.png');


      if (_gaugeAngle >= 0 && _gaugeAngle <= 80) {
        gauge.rotate(_gaugeAngle);
        const x = R * Math.sin(gaugeAngleRad) + c * Math.cos(gaugeAngleRad) - c;
        const y = R - R * Math.cos(gaugeAngleRad) - c * Math.sin(gaugeAngleRad);

        base.blit(gauge, 360 - x, y - 40);
      } else if (_gaugeAngle >= 280 && _gaugeAngle < 360) {
        // TODO: This (and the equivalent with the arm angle) is a dirty, dirty hack because I've
        // not cracked the maths yet.
        gauge.flip(true, false);
        gauge.rotate(360 - _gaugeAngle);

        const x = R * Math.sin(2 * PI - gaugeAngleRad) + c * Math.cos(2 * PI - gaugeAngleRad) - c;
        const y = R - R * Math.cos(gaugeAngleRad) + c * Math.sin(gaugeAngleRad);

        base.blit(gauge, 360 - x, y - 40);
        base.flip(true, false);
      } else {
        return;
      }
    }


    // Paste the overlay over everything
    if (_gaugeAngle) {
      const overlay = await Jimp.read('./assets/wavelength/overlay.png');
      base.blit(overlay, 0, 0);
    } else {
      const overlay = await Jimp.read('./assets/wavelength/overlay_closed.png');
      base.blit(overlay, 0, 0);
    }

    // add the nub
    const nub = await Jimp.read('./assets/wavelength/nub.png');
    base.blit(nub, 360 - nub.bitmap.width / 2 + c, R - nub.bitmap.height / 2 - 40);

    if (_armAngle) {
      // add the arm
      const arm = await Jimp.read('./assets/wavelength/arm.png');
      arm.resize(4, 420);
      _armangle = parseFloat(_armAngle);

      arm.rotate(_armAngle);
      if (_armAngle >= 0 && _armAngle <= 80) {
        base.blit(arm, 360 - arm.bitmap.width + c, R - arm.bitmap.height - 40);
      } else if (_armAngle >= 280 && _armAngle < 360) {
        base.blit(arm, 360 + c, R - arm.bitmap.height - 40);
      } else {
        return;
      }
    }

    if (_scale) {
      // Put on words
      const maxWidth = 180;
      const maxHeight = 100;
      const leftEnd = _scale[0];
      const rightEnd = _scale[1];
      const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
      base.print(font, 320, 460, {
        text: leftEnd,
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
      },
      maxWidth,
      maxHeight);

      base.print(font, 510, 460, {
        text: rightEnd,
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
      },
      maxWidth,
      maxHeight);
    }

    const boundGetBuffer = util.promisify(base.getBuffer.bind(base));
    const img = await boundGetBuffer(Jimp.MIME_JPEG);
    return img;
  }

  robot.hear(/!w <@!(.*)>/, async (res) => {
    const { room } = res.message;
    // Generate the gaugeAngle
    let gaugeAngle = Math.random() * 80 * (Math.random() < 0.5 ? 1 : -1);
    gaugeAngle = (gaugeAngle + 360) % 360;
    const armAngle = 80;
    const scale = scales[Math.floor(Math.random() * scales.length)];
    games[room] = { gaugeAngle, armAngle, scale };
    const board = await makeBoard(gaugeAngle, armAngle, scale);
    const user = robot.client.users.get(res.match[1]);
    await user.send("Here's your prompt! Good luck!", { files: [board] });
  });


  function validAngle(angle) {
    if ((angle >= 0 && angle <= 80) || (angle >= 280 && angle < 360)) {
      return true;
    }
    return false;
  }


  robot.hear(/!w ([+-][0-9]*)/, async (res) => {
    const { room } = res.message;
    let { armAngle } = games[room];
    const { scale } = games[room];

    const delta = -parseFloat(res.match[1]);
    if (armAngle <= 80 && armAngle + delta > 80) {
      armAngle = 80;
    } else if (armAngle >= 280 && armAngle + delta < 280) {
      armAngle = 280;
    } else if (!validAngle((armAngle + delta + 360) % 360)) {
      return;
    } else {
      armAngle = (armAngle + delta + 360) % 360;
    }
    games[room].armAngle = armAngle;

    const board = await makeBoard(null, armAngle, scale);
    const channel = await robot.client.channels.get(res.message.room);
    await channel.send('', { files: [board] });
  });

  robot.hear(/!w reveal/, async (res) => {
    const { room } = res.message;

    const { armAngle, scale, gaugeAngle } = games[room];

    const board = await makeBoard(gaugeAngle, armAngle, scale);
    const channel = await robot.client.channels.get(res.message.room);
    await channel.send('', { files: [board] });
    const delta = Math.abs(armAngle - gaugeAngle);
    let score = 0;
    if (delta <= 4) {
      score = 4;
    } else if (delta <= 12) {
      score = 3;
    } else if (delta <= 20) {
      score = 2;
    }
    await channel.send(`A score of ${score} points!`);
  });
};
