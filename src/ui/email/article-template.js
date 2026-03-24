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
                     body { min-width: 0 !important; }
                     p { font-size: 13px !important; line-height: 1.5 !important; }
                     h2 { font-size: 20px !important; }
                     a span { font-size: 18px !important; }
                     p a { font-size: 10px !important; }
                     span { font-size: 10px !important; }

                     .outer { padding: 10px 10px !important; }
                     .container { padding: 0 0 !important; border-color: #fff !important; border-width: 0px !important; }
                     .article-image { height: 200px !important; }
                     .cta-button { padding: 6px 16px !important; }
                  }
               `}
            </style>
         </Head>
         <Preview>{article.description}</Preview>
         <Body style={{ ...styles.body, fontFamily }}>
            <Section className="outer" style={styles.outerSection}>
               <Container className="container" style={styles.container}>
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
                     <p style={styles.badge}>{t.badge}</p>
                  </Section>

                  {/* Cover image */}
                  {article.image && (
                     <Section style={{ ...styles.coverSection, width: '100%' }}>
                        <Img
                           className="article-image"
                           src={article.image}
                           alt={article.title}
                           width={600}
                           style={{
                              ...styles.cover,
                              width: '100%',
                              maxWidth: '100%',
                              height: '280px',
                              display: 'block',
                           }}
                        />
                     </Section>
                  )}

                  {/* Title */}
                  <h2 style={styles.title}>{article.title}</h2>

                  {/* Author + date */}
                  <Text style={styles.meta}>
                     <span style={{ fontSize: '15px' }}>
                        {t.by} {article.authors.full_name}
                        {article.created_at ? ` · ${article.created_at}` : ''}
                     </span>
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
                  <Section
                     className="buttonSection"
                     style={styles.buttonSection}
                  >
                     <Button
                        className="cta-button"
                        href={`${WEBSITE_URL}${prefix}/${article.slug}`}
                        style={{
                           ...styles.button,
                           fontFamily: buttonFontFamily,
                           padding: '10px 22px',
                        }}
                     >
                        {t.button}
                     </Button>
                  </Section>

                  <Hr style={styles.divider} />

                  {/* Footer */}
                  <Text style={styles.footer}>
                     <span style={{ fontSize: '15px' }}>
                        {t.footer}{' '}
                        <a href={unsubscribeUrl} style={styles.unsubscribeLink}>
                           {t.unsubscribe}
                        </a>
                        .
                     </span>
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
      maxWidth: '600px',
      boxShadow: '0 0 40px rgba(229, 231, 235, 1)',
      padding: '40px 50px',
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
      fontSize: '15px',
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
      objectFit: 'cover',
      opacity: 0.9,
      border: '1px solid #d1d5dbb3',
   },
   title: {
      fontFamily:
         "'Cormorant SC', 'Cormorant Garamond', Times New Roman, serif",
      fontWeight: 700,
      color: '#52525b',
      fontSize: '36px',
      lineHeight: 1.1,
      textAlign: 'center',
      margin: '0 0 8px 0',
   },
   meta: {
      fontSize: '15px',
      color: '#a3a3a3',
      textAlign: 'center',
      margin: '0 0 16px 0',
   },
   excerpt: {
      color: '#737373',
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
      borderRadius: '50px',
      border: '2px solid transparent',
   },
   footer: {
      fontSize: '15px',
      color: '#a3a3a3',
      textAlign: 'center',
      margin: '18px 0 0 0',
   },
   unsubscribeLink: {
      fontSize: '15px',
      color: '#a3a3a3',
      textDecoration: 'underline',
   },
};
