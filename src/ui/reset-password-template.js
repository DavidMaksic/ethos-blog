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
import { WEBSITE_URL } from '@/src/utils/config';

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

export function ResetPasswordEmail({ url, user }) {
   const locale = url.includes('/sr/') ? 'sr' : 'en';
   const imageUrl = `${WEBSITE_URL}/email-logo.png`;

   const t = content[locale];
   const firstName = user.name.split(' ')[0].slice(0, 10) ?? user.email;

   return (
      <Html lang={locale}>
         <Head>
            <style>
               {`@media only screen and (max-width: 600px) {
               body { background-color: transparent !important; }
               table[role="presentation"] { background-color: transparent !important; padding: 0px 0px !important; }
               }`}
            </style>
         </Head>
         <Preview>{t.subject}</Preview>
         <Body style={styles.body}>
            <Container style={styles.container}>
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
                  {t.name} {firstName},
               </Text>

               <Text style={styles.text}>{t.body}</Text>

               <Text style={styles.text}>{t.expires}</Text>

               <Section style={styles.buttonSection}>
                  <Button href={url} style={styles.button}>
                     {t.button}
                  </Button>
               </Section>

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
      padding: '100px 0',
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
      fontWeight: 600,
      color: '#374151',
      fontSize: '24px',
      textAlign: 'center',
      margin: '0 0 18px 0',
   },
   divider: {
      border: 'none',
      borderTop: '1px solid #6b7280',
      opacity: 0.2,
      margin: '0 0 18px 0',
   },
   text: {
      fontSize: '16px',
      color: '#1f2937',
      lineHeight: 1.3,
      textAlign: 'center',
      margin: '0 0 6px 0',
   },
   buttonSection: {
      textAlign: 'center',
      margin: '16px 0 0 0',
   },
   button: {
      backgroundColor: '#ddc2a2',
      color: '#ffffff',
      textDecoration: 'none',
      fontWeight: 600,
      fontSize: '20px',
      padding: '12px 26px',
      borderRadius: '50px',
      display: 'inline-block',
      boxShadow: '0 1px 10px rgba(0, 0, 0, 0.1)',
      border: '2px solid transparent',
   },
   footer: {
      fontSize: '13px',
      color: '#9ca3af',
      textAlign: 'center',
      margin: '24px 0 0 0',
   },
};
