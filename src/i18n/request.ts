import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const messages = await loadMessages(locale);

  return {
    locale,
    messages
  };
});


async function loadMessages(locale: string) {
  const messages: Record<string, object> = {};
  const messageFiles = ['common', 'home', 'about', 'projects', 'contact']; // fichiers par page

  for (const file of messageFiles) {
    try {
      const fileMessages = (await import(`../../messages/${locale}/${file}.json`)).default;
      messages[file] = fileMessages;
    } catch {
      console.warn(`Could not load ${file}.json for locale ${locale}`);
      messages[file] = {};
    }
  }
  
  return messages;
}