
import { readable } from 'svelte/store';

interface Config {
  appName: string;
  appDescription: string;
}

const config: Config = {
  appName: 'TagTock',
  appDescription: 'a minimalistic time tracking app',
};

export default readable(config);
