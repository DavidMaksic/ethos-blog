import { WEBSITE_URL } from '@/src/utils/config';
import {
   Body,
   Button,
   Container,
   Head,
   Hr,
   Html,
   Img,
   Preview,
   Section,
   Text,
} from '@react-email/components';

const content = {
   en: {
      subject: 'Welcome to Ethos',
      body: "You're now subscribed to Ethos − a publication on history, philosophy & theology.",
      body2: 'Every new essay will land directly in your inbox.',
      button: 'Read latest articles',
      unsubscribe:
         "If you didn't mean to subscribe, you can unsubscribe below.",
   },
   sr: {
      subject: 'Добродошли у Етос',
      body: 'Претплатили сте се на Етос − публикацију о историји, филозофији и теологији.',
      body2: 'Сваки нови чланак ће стићи директно у ваше пријемно сандуче.',
      button: 'Посети Етос',
      unsubscribe:
         'Ако нисте желели да се претплатите, можете се одјавити испод.',
   },
};

export default function WelcomeTemplate({ locale = 'en', unsubscribeUrl }) {
   const imageUrl = `${WEBSITE_URL}/email-logo.png`;
   const t = content[locale];
   const prefix = locale === 'en' ? '' : `/${locale}`;

   const fontFamily =
      locale === 'sr'
         ? "'Gentium Book Plus', 'Gentium Book Plus Fallback', serif"
         : "'Crimson Text', 'EB Garamond', Helvetica, Arial, serif";

   const buttonFontFamily =
      locale === 'sr'
         ? "'Great Vibes', 'Cormorant Garamond', Helvetica, Arial, serif"
         : "'Parisienne', 'Cormorant Garamond', Helvetica, Arial, serif";

   return (
      <Html lang={locale}>
         <Head>
            {/* eslint-disable-next-line @next/next/no-page-custom-font */}
            <link
               rel="stylesheet"
               href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Parisienne&family=Cormorant+SC:wght@600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=EB+Garamond:ital,wght@0,400;0,600;1,400&family=Gentium+Book+Plus:ital,wght@0,400;0,700;1,400&display=swap"
            />
            <style>
               {`@media only screen and (max-width: 600px) {
                  body { margin: 0px 8px !important }
                  .outer { padding: 40px 0 !important }
                  .container { padding: 30px 24px !important }
               }`}
            </style>
         </Head>
         <Preview>{t.subject}</Preview>
         <Body style={{ ...styles.body, fontFamily }}>
            <Section className="outer" style={styles.outerSection}>
               <Container className="container" style={styles.container}>
                  <Section style={styles.logoSection}>
                     <Img
                        src={imageUrl}
                        alt="Logo"
                        width={90}
                        style={styles.logo}
                     />
                  </Section>

                  <Text style={styles.heading}>{t.subject}</Text>

                  <Hr style={styles.divider} />

                  <Text style={styles.text}>{t.body}</Text>
                  <Text style={styles.text}>{t.body2}</Text>

                  <Section style={styles.buttonSection}>
                     <Button
                        href={`${WEBSITE_URL}${prefix}`}
                        style={{
                           ...styles.button,
                           fontFamily: buttonFontFamily,
                        }}
                     >
                        {t.button}
                     </Button>
                  </Section>

                  <Hr style={styles.divider} />

                  <Text style={styles.footer}>{t.unsubscribe}</Text>

                  {unsubscribeUrl && (
                     <Text style={styles.footer}>
                        <a href={unsubscribeUrl} style={styles.unsubscribeLink}>
                           {locale === 'sr' ? 'Одјавите се' : 'Unsubscribe'}
                        </a>
                     </Text>
                  )}
               </Container>
            </Section>
         </Body>
      </Html>
   );
}

export function getWelcomeSubject(locale = 'en') {
   return content[locale].subject;
}

const styles = {
   body: {
      margin: 0,
      backgroundColor: '#f4f5f6',
      fontFamily: 'Helvetica, Arial, sans-serif',
   },
   outerSection: {
      padding: '100px 0',
   },
   container: {
      backgroundColor: '#ffffff',
      border: '1px solid #eaebed',
      borderRadius: '16px',
      boxShadow: '0 0 40px rgba(229, 231, 235, 1)',
      padding: '40px 50px',
      maxWidth: '600px',
      margin: '0 auto',
   },
   logoSection: {
      textAlign: 'center',
      paddingBottom: '20px',
   },
   logo: {
      display: 'block',
      border: 0,
      margin: '0 auto',
   },
   heading: {
      fontFamily:
         "'Cormorant SC', 'Cormorant Garamond', Helvetica, Arial, serif",
      fontWeight: 700,
      color: '#4b5563',
      lineHeight: 1.1,
      fontSize: '32px',
      textAlign: 'center',
      margin: '0 0 26px 0',
   },
   divider: {
      border: 'none',
      borderTop: '1px solid #6b7280',
      opacity: 0.2,
      margin: '0 0 26px 0',
   },
   text: {
      fontSize: '16px',
      color: '#5d6673',
      lineHeight: 1.5,
      textAlign: 'center',
      margin: '0 0 8px 0',
   },
   buttonSection: {
      textAlign: 'center',
      margin: '24px 0 28px 0',
   },
   button: {
      backgroundColor: '#d7b892',
      boxShadow: '0 0 1rem #e8d6bf',
      color: '#ffffff',
      textDecoration: 'none',
      fontSize: '28px',
      padding: '10px 22px',
      borderRadius: '50px',
      display: 'inline-block',
      border: '2px solid transparent',
   },
   footer: {
      fontSize: '13px',
      color: '#9ca3af',
      textAlign: 'center',
      margin: '0',
   },
   unsubscribeLink: {
      color: '#9ca3af',
      textDecoration: 'underline',
   },
};
