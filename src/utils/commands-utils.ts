interface CommandOptions {
  save: boolean;
  receipt: boolean;
  random: boolean;
  revolut: boolean;
  name?: string;
}

export function parseCommands(input: string | undefined): CommandOptions {
  const options: CommandOptions = {
    save: false,
    receipt: false,
    random: false,
    revolut: false,
  };

  if (!input) return options;

  const parts = input.split(' ');

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    if (part.startsWith('-')) {
      switch (part) {
        case '-s':
          options.save = true;
          break;
        case '-r':
          options.receipt = true;
          break;
        case '-rnd':
          options.random = true;
          break;
        case '-revolut':
          options.revolut = true;
          break;
        case '-n':
          if (i + 1 < parts.length) {
            options.name = parts[i + 1];
            i++;
          }
          break;
        default:
          break;
      }
    }
  }

  return options;
}
