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
      subject: 'Reset your password',
      name: 'Hi',
      body: 'Click the button below to reset your password.',
      expires: 'This link expires in 1 hour.',
      button: 'Reset password',
      footer: "If you didn't request this, you can safely ignore this email.",
   },
   sr: {
      subject: 'Ресетујте лозинку',
      name: 'Здраво',
      body: 'Кликните дугме испод да ресетујете лозинку.',
      expires: 'Овај линк истиче за 1 сат.',
      button: 'Ресетуј лозинку',
      footer: 'Ако нисте тражили ово, можете игнорисати овај мејл.',
   },
};

export default function ResetPasswordTemplate({ url, user }) {
   const locale = url.includes('/sr/') ? 'sr' : 'en';
   const imageUrl = `${WEBSITE_URL}/email-logo.png`;

   const t = content[locale];
   const firstName = user.name.split(' ')[0].slice(0, 10) ?? user.email;

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
            <style>
               {`@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Parisienne&family=Cormorant+SC:wght@600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=EB+Garamond:ital,wght@0,400;0,600;1,400&family=Gentium+Book+Plus:ital,wght@0,400;0,700;1,400&display=swap');

               body { padding: 100px 0 }

               @media only screen and (max-width: 600px) {
                  body {  margin: 0px 8px !important; padding: 40px 0 !important }
                  .container { padding: 30px 24px !important }
               }`}
            </style>
         </Head>
         <Preview>{t.subject}</Preview>
         <Body style={{ ...styles.body, fontFamily }}>
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

               <Text style={styles.text}>
                  {t.name} {firstName}!
               </Text>

               <Text style={styles.text}>{t.body}</Text>

               <Text style={styles.text}>{t.expires}</Text>

               <Section style={styles.buttonSection}>
                  <Button
                     href={url}
                     style={{ ...styles.button, fontFamily: buttonFontFamily }}
                  >
                     {t.button}
                  </Button>
               </Section>

               <Hr style={styles.divider} />

               <Text style={styles.footer}>{t.footer}</Text>
            </Container>
         </Body>
      </Html>
   );
}

// Helper to get just the subject string (used in resend.emails.send)
export function getResetPasswordSubject(url) {
   const locale = url.includes('/sr/') ? 'sr' : 'en';
   return content[locale].subject;
}

const styles = {
   body: {
      margin: 0,
      backgroundColor: '#f4f5f6',
      fontFamily: 'Helvetica, Arial, sans-serif',
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
      lineHeight: 1.3,
      textAlign: 'center',
      margin: '0 0 6px 0',
   },
   buttonSection: {
      textAlign: 'center',
      margin: '16px 0 24px 0',
   },
   button: {
      backgroundColor: '#d7b892',
      boxShadow: '0 0 1rem #e8d6bf',
      color: '#ffffff',
      textDecoration: 'none',
      fontSize: '28px',
      padding: '10px 22px',
      margin: '0 0 6px 0',
      borderRadius: '50px',
      display: 'inline-block',
      border: '2px solid transparent',
   },
   footer: {
      fontSize: '13px',
      color: '#9ca3af',
      textAlign: 'center',
      margin: '24px 0 0 0',
   },
};
