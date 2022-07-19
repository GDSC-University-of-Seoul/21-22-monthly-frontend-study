export function getRandomWelcomeText() {
    const welcomeTexts = ['Hello World', 'Welcome', 'Hi esbuild'];
  
    return welcomeTexts[Math.ceil(Math.random() * 10) % welcomeTexts.length];
  }