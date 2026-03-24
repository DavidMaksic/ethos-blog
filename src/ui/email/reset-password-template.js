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
   const imageUrl =
      locale === 'en'
         ? `${WEBSITE_URL}/email-logo.png`
         : `${WEBSITE_URL}/email-logo-sr.png`;

   const t = content[locale];
   const firstName = user.name.split(' ')[0].slice(0, 10) ?? user.email;

   const fontFamily =
      locale === 'sr'
         ? "'Gentium Book Plus', 'Gentium Book Plus Fallback', Times New Roman, serif"
         : "'Crimson Text', 'EB Garamond', Times New Roman, serif";

   const buttonFontFamily =
      locale === 'sr'
         ? "'Great Vibes', 'Cormorant Garamond', Times New Roman, serif"
         : "'Parisienne', 'Cormorant Garamond', Times New Roman, serif";

   const textSize = locale === 'sr' ? '18px' : '19px';

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
                  body { min-width: 0 !important; }
                  p { font-size: 13px !important; line-height: 1.5 !important; }
                  h2 { font-size: 20px !important; }
                  a span { font-size: 18px !important; }
                  p a { font-size: 10px !important; }
                  span { font-size: 10px !important; }

                  .container { padding: 40px 30px 36px 30px !important; }
                  .cta-button { padding: 3px 26px 7px 26px !important; }
               }`}
            </style>
         </Head>
         <Preview>{t.subject}</Preview>
         <Body style={{ ...styles.body, fontFamily }}>
            <Section>
               <Container className="container" style={styles.container}>
                  <Section style={styles.logoSection}>
                     <Img
                        src={imageUrl}
                        alt="Logo"
                        width={95}
                        style={styles.logo}
                     />
                  </Section>

                  <h2 style={styles.heading}>{t.subject}</h2>

                  <Hr style={styles.divider} />

                  <Text style={{ ...styles.text, fontSize: textSize }}>
                     {t.name} {firstName}!
                  </Text>

                  <Text style={{ ...styles.text, fontSize: textSize }}>
                     {t.body}
                  </Text>

                  <Text style={{ ...styles.text, fontSize: textSize }}>
                     {t.expires}
                  </Text>

                  <Section style={styles.buttonSection}>
                     <Button
                        className="cta-button"
                        href={url}
                        style={{
                           ...styles.button,
                           fontFamily: buttonFontFamily,
                           padding: '10px 24px',
                        }}
                     >
                        {t.button}
                     </Button>
                  </Section>

                  <Hr style={styles.divider} />

                  <Text style={styles.footer}>
                     <span style={{ fontSize: '15px' }}>{t.footer}</span>
                  </Text>
               </Container>
            </Section>
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
      fontFamily: 'Times New Roman, sans-serif',
   },
   container: {
      border: '1px solid #6b728033',
      borderRadius: '20px',
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
         "'Cormorant SC', 'Cormorant Garamond', Times New Roman, serif",
      fontWeight: 700,
      color: '#52525b',
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
      color: '#737373',
      lineHeight: 1.3,
      fontWeight: 500,
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
      margin: '0 0 6px 0',
      borderRadius: '50px',
      display: 'inline-block',
      border: '2px solid transparent',
   },
   footer: {
      fontSize: '15px',
      color: '#a3a3a3',
      textAlign: 'center',
      margin: '24px 0 0 0',
   },
};
