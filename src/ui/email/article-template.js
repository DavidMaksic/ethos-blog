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
      badge: 'New Article',
      by: 'By',
      button: 'Read more',
      footer:
         "You're receiving this because you subscribed to Ethos. To unsubscribe,",
      unsubscribe: 'click here',
   },
   sr: {
      badge: 'Нови чланак',
      by: 'Аутор:',
      button: 'Прочитај чланак',
      footer: 'Добијате ово јер сте претплаћени на Етос. За одјаву,',
      unsubscribe: 'кликните овде',
   },
};

export default function ArticleTemplate({
   article,
   locale = 'en',
   unsubscribeUrl,
}) {
   const imageUrl =
      locale === 'en'
         ? `${WEBSITE_URL}/email-logo.png`
         : `${WEBSITE_URL}/email-logo-sr.png`;

   const prefix = locale === 'en' ? '' : `/${locale}`;
   const t = content[locale];

   const fontFamily =
      locale === 'sr'
         ? "'Gentium Book Plus', 'Gentium Book Plus Fallback', Times New Roman, serif"
         : "'Crimson Text', 'EB Garamond', Times New Roman, serif";

   const buttonFontFamily =
      locale === 'sr'
         ? "'Great Vibes', 'Cormorant Garamond', Times New Roman, serif"
         : "'Parisienne', 'Cormorant Garamond', Times New Roman, serif";

   const excerptSize = locale === 'sr' ? '18px' : '19px';
   const excerptLineHeight = locale === 'sr' ? '1.45' : '1.4';

   return (
      <Html lang={locale}>
         <Head>
            {/* eslint-disable-next-line @next/next/no-page-custom-font */}
            <link
               rel="stylesheet"
               href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Parisienne&family=Cormorant+SC:wght@600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=EB+Garamond:ital,wght@0,400;0,600;1,400&family=Gentium+Book+Plus:ital,wght@0,400;0,700;1,400&display=swap"
            />
            <style>
               {`
                  @media only screen and (max-width: 600px) {
                     body { margin: 0px 0px !important; }
                     p { font-size: 13px !important; line-height: 1.5 !important; }
                     h2 { font-size: 20px !important; }
                     a { font-size: 13px !important; }
                     span { font-size: 21px !important; }

                     .outer { padding: 0px 0px !important; }
                     .container { padding: 10px 0px !important; width: 100% !important; border-color: #fff !important; border-width: 0px !important; }
                     .article-image { height: 180px !important; width: 100% !important; }
                  }
               `}
            </style>
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1.0"
            />
         </Head>
         <Preview>{article.description}</Preview>
         <Body style={{ ...styles.body, fontFamily }}>
            <Section className="outer" style={styles.outerSection}>
               <Container
                  className="container"
                  style={{ ...styles.container, maxWidth: '620px' }}
               >
                  {/* Logo */}
                  <Section style={styles.logoSection}>
                     <Img
                        src={imageUrl}
                        alt="Logo"
                        width={95}
                        style={styles.logo}
                     />
                  </Section>

                  {/* Badge */}
                  <Section style={styles.badgeSection}>
                     <Text style={styles.badge}>{t.badge}</Text>
                  </Section>

                  {/* Cover image */}
                  {article.image && (
                     <Section style={styles.coverSection}>
                        <Img
                           className="article-image"
                           src={article.image}
                           alt={article.title}
                           width="100%"
                           height={250}
                           style={styles.cover}
                        />
                     </Section>
                  )}

                  {/* Title */}
                  <h2 style={styles.title}>{article.title}</h2>

                  {/* Author + date */}
                  <Text style={styles.meta}>
                     {t.by} {article.authors.full_name}
                     {article.created_at ? ` · ${article.created_at}` : ''}
                  </Text>

                  {/* Excerpt */}
                  {article.excerpt && (
                     <Text
                        style={{
                           ...styles.excerpt,
                           fontSize: excerptSize,
                           lineHeight: excerptLineHeight,
                        }}
                     >
                        {article.excerpt}
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

const styles = {
   body: {
      margin: 0,
      fontFamily: 'Times New Roman, sans-serif',
   },
   outerSection: {
      padding: '40px 0',
   },
   container: {
      border: '1px solid #6b728033',
      borderRadius: '20px',
      width: '100%',
      boxShadow: '0 0 40px rgba(229, 231, 235, 1)',
      padding: '40px 60px',
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
      fontSize: '14px',
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
      opacity: 0.9,
      border: '1px solid #d1d5dbb3',
   },
   title: {
      fontFamily:
         "'Cormorant SC', 'Cormorant Garamond', Times New Roman, serif",
      fontWeight: 700,
      color: '#4b5563',
      fontSize: '36px',
      lineHeight: 1.1,
      textAlign: 'center',
      margin: '0 0 8px 0',
   },
   meta: {
      fontSize: '15px',
      color: '#9ca3af',
      textAlign: 'center',
      margin: '0 0 16px 0',
   },
   excerpt: {
      color: '#757d88',
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
      boxShadow: '0 0 16px #e8d6bf',
      color: '#ffffff',
      textDecoration: 'none',
      fontSize: '28px',
      padding: '10px 22px',
      borderRadius: '50px',
      textAlign: 'center',
      border: '2px solid transparent',
   },
   footer: {
      fontSize: '15px',
      color: '#9ca3af',
      textAlign: 'center',
      margin: '18px 0 0 0',
   },
   unsubscribeLink: {
      fontSize: '15px',
      color: '#9ca3af',
      textDecoration: 'underline',
   },
};
