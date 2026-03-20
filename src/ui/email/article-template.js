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
      subject: (title) => `New article: ${title}`,
      preview: (title) => `A new article has been published: ${title}`,
      badge: 'New Article',
      by: 'By',
      button: 'Read more',
      footer:
         "You're receiving this because you subscribed to Ethos. To unsubscribe,",
      unsubscribe: 'click here',
   },
   sr: {
      subject: (title) => `Нови чланак: ${title}`,
      preview: (title) => `Објављен је нови чланак: ${title}`,
      badge: 'Нови чланак',
      by: 'Аутор',
      button: 'Прочитај чланак',
      footer: 'Добијате ово јер сте претплаћени на Ethos. За одјаву,',
      unsubscribe: 'кликните овде',
   },
};

export default function ArticleTemplate({
   article,
   locale = 'en',
   unsubscribeUrl,
}) {
   const imageUrl = `${WEBSITE_URL}/email-logo.png`;
   const prefix = locale === 'en' ? '' : `/${locale}`;
   const t = content[locale];

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
         <Preview>{t.preview(article.title)}</Preview>
         <Body style={{ ...styles.body, fontFamily }}>
            <Section className="outer" style={styles.outerSection}>
               <Container className="container" style={styles.container}>
                  {/* Logo */}
                  <Section style={styles.logoSection}>
                     <Img
                        src={imageUrl}
                        alt="Logo"
                        width={90}
                        style={styles.logo}
                     />
                  </Section>

                  {/* Badge */}
                  <Section style={styles.badgeSection}>
                     <Text style={styles.badge}>{t.badge}</Text>
                  </Section>

                  {/* <Hr style={styles.divider} /> */}

                  {/* Cover image */}
                  {article.image && (
                     <Section style={styles.coverSection}>
                        <Img
                           src={article.image}
                           alt={article.title}
                           width="100%"
                           style={styles.cover}
                        />
                     </Section>
                  )}

                  {/* Title */}
                  <Text style={styles.title}>{article.title}</Text>

                  {/* Author + date */}
                  <Text style={styles.meta}>
                     {t.by} {article.authors.full_name}
                     {article.created_at ? ` · ${article.created_at}` : ''}
                  </Text>

                  {/* Excerpt */}
                  {article.description && (
                     <Text style={styles.description}>
                        {article.description}
                     </Text>
                  )}

                  {/* CTA */}
                  <Section style={styles.buttonSection}>
                     <Button
                        href={`${WEBSITE_URL}${prefix}/${article.slug}`}
                        style={{
                           ...styles.button,
                           fontFamily: buttonFontFamily,
                        }}
                     >
                        {t.button}
                     </Button>
                  </Section>

                  <Hr style={styles.divider} />

                  {/* Footer */}
                  <Text style={styles.footer}>
                     {t.footer}{' '}
                     <a href={unsubscribeUrl} style={styles.unsubscribeLink}>
                        {t.unsubscribe}
                     </a>
                     .
                  </Text>
               </Container>
            </Section>
         </Body>
      </Html>
   );
}

export function getArticleSubject(title, locale = 'en') {
   return content[locale].subject(title);
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
   badgeSection: {
      textAlign: 'center',
      paddingBottom: '18px',
   },
   badge: {
      display: 'inline-block',
      backgroundColor: '#fdf4ec',
      color: '#b07d52',
      fontSize: '12px',
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      padding: '4px 14px',
      borderRadius: '50px',
      margin: 0,
   },
   divider: {
      border: 'none',
      borderTop: '1px solid #6b7280',
      opacity: 0.2,
      margin: '0 0 18px 0',
   },
   coverSection: {
      paddingBottom: '20px',
   },
   cover: {
      borderRadius: '20px',
      display: 'block',
      objectFit: 'cover',
   },
   title: {
      fontFamily:
         "'Cormorant SC', 'Cormorant Garamond', Helvetica, Arial, serif",
      fontWeight: 700,
      color: '#4b5563',
      fontSize: '32px',
      lineHeight: 1.1,
      textAlign: 'center',
      margin: '0 0 8px 0',
   },
   meta: {
      fontSize: '13px',
      color: '#9ca3af',
      textAlign: 'center',
      margin: '0 0 16px 0',
   },
   description: {
      fontSize: '15px',
      color: '#5d6673',
      lineHeight: 1.6,
      textAlign: 'center',
      fontWeight: 500,
      margin: '0 0 24px 0',
   },
   buttonSection: {
      textAlign: 'center',
      margin: '0 0 24px 0',
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
      margin: '18px 0 0 0',
   },
   unsubscribeLink: {
      color: '#9ca3af',
      textDecoration: 'underline',
   },
};
